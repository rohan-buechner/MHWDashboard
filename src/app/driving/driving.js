var height = 100;
var width = 100;

angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: '<img src="http://41.160.227.145:8083/mjpg/video.mjpg?COUNTER" height="' + height + '%" width="' + width + '%" >'
  })
  .component('roof', {
    template: '<img src="http://85.93.105.195:8084/mjpg/video.mjpg?COUNTER" height="' + height + '%" width="' + width + '%" >'
  })
  .component('bottom', {
    template: '<img src="http://50.253.141.34:80/mjpg/video.mjpg?COUNTER" height="' + height + '%" width="' + width + '%" >'
  });

function DrivingController($log, WebIService, $interval) {
  $log.info('in driving controller');

  var vm = this;

  vm.dieselTank = {
    key: 'dieseltank',
    title: 'Diesel Tank',
    range: {
      min: 0,
      max: 100
    },
    value: 75,
    unit: 'L'
  };

  // todo check actual data
  vm.isIVECOCharging = false;
  vm.isHouseCharging = true;

  var interval;

  function _readSensors() {
    WebIService
      .readSensors()
      .then(function () {
        vm.isIVECOCharging = !vm.isIVECOCharging;
        vm.isHouseCharging = !vm.isHouseCharging;
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
