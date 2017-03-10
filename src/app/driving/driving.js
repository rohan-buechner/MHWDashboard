angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: getTemplate(),
    controller: CameraController11,
    controllerAs: 'vm'
  })
  .component('roof', {
    template: getTemplate(),
    controller: CameraController12,
    controllerAs: 'vm'
  })
  .component('bottom', {
    template: getTemplate(),
    controller: CameraController13,
    controllerAs: 'vm'
  });

function getTemplate() {
  return '<div id="wrap" class="row">' +
          '<div class="col-sm-1"></div>' +
          '<div class="col-sm-10">' +
            '<iframe id="frame" ' +
            'align="middle"' +
            'style="-webkit-transform:scale(0.9);-moz-transform-scale(0.9);" ' +
            'ng-src="{{vm.cameraSourceUrl}}"' +
            'height="100%">' +
            '</iframe>' +
          '</div>' +
          '<div class="col-sm-1"></div>' +
        '</div>';
}

function CameraController11($sce) {
  var vm = this;
  var _url = 'http://admin:admin123@124.12.100.11/streaming/channels/101/httppreview';
  vm.cameraSourceUrl = $sce.trustAsResourceUrl(_url);
  return vm;
}

function CameraController12($sce) {
  var vm = this;
  var _url = 'http://admin:admin123@124.12.100.12/streaming/channels/101/httppreview';
  vm.cameraSourceUrl = $sce.trustAsResourceUrl(_url);
  return vm;
}

function CameraController13($sce) {
  var vm = this;
  var _url = 'http://admin:admin123@124.12.100.13/streaming/channels/101/httppreview';
  vm.cameraSourceUrl = $sce.trustAsResourceUrl(_url);
  return vm;
}

function DrivingController($log, WebIService, $interval, $filter) {
  $log.info('in driving controller');
  var vm = this;

  var chargingVoltage = 56.6;
  vm.fuelPumpStatus = false;

  vm.dieselTank = {
    title: 'Diesel Tank',
    unit: 'ℓ',
    value: 20, // TODO reset to 0
    displayValue: 10
  };

  var interval;

  function _readSensors() {
    return WebIService
      .readSensors()
      .then(function (sensorArray) {
        // vm.dieselTank.value = $filter('number')(sensorArray[0], 1);
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
        WebIService.readRelays(1)
          .then(function (data) {
            $log.debug('vm.fuelPumpStatus', data.relays[0]);
            vm.fuelPumpStatus = data.relays[0];
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
        this.fuelPumpStatus = data.relays[0];
      });
    });
  }

  return vm;
}
