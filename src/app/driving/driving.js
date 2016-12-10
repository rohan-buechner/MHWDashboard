var height = 100;
var width = 100;

angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: '<iframe src="http://admin:admin123@124.12.100.11/streaming/channels/101/httppreview" height="' + height + '%" width="' + width + '%"></iframe>'
  })
  .component('roof', {
    template: '<iframe src="http://admin:admin123@124.12.100.12/streaming/channels/101/httppreview" height="' + height + '%" width="' + width + '%"></iframe>'
  })
  .component('bottom', {
    template: '<iframe src="http://admin:admin123@124.12.100.13/streaming/channels/101/httppreview" height="' + height + '%" width="' + width + '%"></iframe>'
  });

function DrivingController($log, WebIService, $interval, $filter) {
  $log.info('in driving controller');
  var vm = this;

  var chargingVoltage = 56.6;
  vm.fuelPumpStatus = false;

  vm.dieselTank = {
    key: 'dieseltank',
    title: 'Diesel Tank',
    value: 0,
    unit: 'L'
  };

  var interval;

  function _readSensors() {
    return WebIService
      .readSensors()
      .then(function (sensorArray) {
        vm.dieselTank.value = $filter('number')(sensorArray[0], 1);
        vm.isHouseCharging = $filter('number')(sensorArray[5], 1) > chargingVoltage;
        vm.isIVECOCharging = $filter('number')(sensorArray[6], 1) > chargingVoltage;
      });
  }

  var checkLoop = function () {
    if (angular.isDefined(interval)) {
      return;
    }

    interval = $interval(function () {
      _readSensors();
    }, 3000);
  };

  vm.$onInit = function () {
    _readSensors()
      .then(function () {
        WebIService.readRelays(4)
          .then(function (data) {
            vm.fuelPumpStatus = data[0];
          });
      });
    checkLoop();
  };

  vm.$onDestroy = function () {
    if (angular.isDefined(interval)) {
      $interval.cancel(interval);
      interval = undefined;
    }
  };

  // Fuel Pump
  vm.fuelPumpOn = function () {
    var cmd = 'cmd=254,108,1r1t300';
    this.fuelPumpStatus = true;
    toggleFuelPump(cmd);
  };
  vm.fuelPumpOff = function () {
    var cmd = 'cmd=254,100,1r1t300';
    this.fuelPumpStatus = false;
    toggleFuelPump(cmd);
  };
  function toggleFuelPump(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(1).then(function (data) {
        // position is the position of the item in the bank
        this.fuelPumpStatus = data[0];
      });
    });
  }

  return vm;
}
