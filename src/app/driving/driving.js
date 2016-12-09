var height = 100;
var width = 100;

angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: '<img src="" height="' + height + '%" width="' + width + '%" >'
  })
  .component('roof', {
    template: '<img src="" height="' + height + '%" width="' + width + '%" >'
  })
  .component('bottom', {
    template: '<img src="" height="' + height + '%" width="' + width + '%" >'
  });

function DrivingController($log, WebIService, $interval, $filter) {
  $log.info('in driving controller');
  var vm = this;

  var chargingVoltage = 56.6;

  vm.dieselTank = {
    key: 'dieseltank',
    title: 'Diesel Tank',
    value: 0,
    unit: 'L'
  };

  var interval;

  function _readSensors() {
    WebIService
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
    _readSensors();
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
    WebIService.customCMD(cmd);
  };
  vm.fuelPumpOff = function () {
    var cmd = 'cmd=254,100,1r1t300';
    WebIService.customCMD(cmd);
  };

  return vm;
}
