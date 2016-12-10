angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

function TopViewController($log, WebIService, $interval, $filter) {
  var vm = this;
  var interval;
  vm.compressorStatus = false;
  vm.gauges = [
    {
      title: 'L Front Pressure',
      unit: 'bar',
      pos: 10,
      value: 0
    },
    {
      title: 'R Front Pressure',
      unit: 'bar',
      pos: 11,
      value: 0
    },
    {
      title: 'L Rear Pressure',
      unit: 'bar',
      pos: 12,
      value: 0
    },
    {
      title: 'R Rear Pressure',
      unit: 'bar',
      pos: 13,
      value: 0
    }
  ];

  var checkLoop = function () {
    if (angular.isDefined(interval)) {
      return;
    }

    interval = $interval(function () {
      WebIService
        .readSensors()
        .then(function (sensorArray) {
          angular.forEach(vm.gauges, function (obj) {
            obj.value = $filter('number')(sensorArray[obj.pos], 1);
          });

          $log.debug('vm.gauges', vm.gauges);
        });
    }, 3000);
  };

  this.$onInit = function () {
    _readSensors()
      .then(function () {
        WebIService.readRelays(1)
          .then(function (data) {
            vm.compressorStatus = data.relays[1];
          });
      });
    checkLoop();
  };

  this.$onDestroy = function () {
    if (angular.isDefined(interval)) {
      $interval.cancel(interval);
      interval = undefined;
    }
  };

  function _readSensors() {
    return WebIService
      .readSensors()
      .then(function (sensorArray) {
        vm.gauges = vm.gauges.map(function (obj) {
          $log.debug(obj);
          return {
            title: obj.title,
            unit: obj.unit,
            value: $filter('number')(sensorArray[obj.pos], 1) || 0,
            pos: obj.pos
          };
        });
      });
  }

// LHS front air suspension Pump
  vm.lhsFrontP = function () {
    var cmd = 'cmd=254,103,1r1t300:cmd=254,110,1r1t300';
    checkAndExecute(cmd);
  };
  vm.lhsFrontR = function () {
    var cmd = 'cmd=254,102,1r1t300:cmd=254,111,1r1t300';
    checkAndExecute(cmd);
  };
  vm.lhsFrontStop = function () {
    var cmd = 'cmd=254,102,1r1t300:cmd=254,103,1r1t300';
    checkAndExecute(cmd);
  };
// RHS front air suspension Release
  vm.rhsFrontP = function () {
    var cmd = 'cmd=254,105,1r1t300:cmd=254,112,1r1t300';
    checkAndExecute(cmd);
  };
  vm.rhsFrontR = function () {
    var cmd = 'cmd=254,104,1r1t300:cmd=254,113,1r1t300';
    checkAndExecute(cmd);
  };
  vm.rhsFrontStop = function () {
    var cmd = 'cmd=254,104,1r1t300:cmd=254,105,1r1t300';
    checkAndExecute(cmd);
  };
  // LHS rear air suspension Pump
  vm.lhsRearP = function () {
    var cmd = 'cmd=254,107,1r1t300:cmd=254,114,1r1t300';
    checkAndExecute(cmd);
  };
  vm.lhsRearR = function () {
    var cmd = 'cmd=254,106,1r1t300:cmd=254,115,1r1t300';
    checkAndExecute(cmd);
  };
  vm.lhsRearStop = function () {
    var cmd = 'cmd=254,106,1r1t300:cmd=254,107,1r1t300';
    checkAndExecute(cmd);
  };
  // RHS front air suspension Release
  vm.rhsRearP = function () {
    var cmd = 'cmd=254,101,2r1t300:cmd=254,108,2r1t300';
    checkAndExecute(cmd);
  };
  vm.rhsRearR = function () {
    var cmd = 'cmd=254,100,2r1t300:cmd=254,109,2r1t300';
    checkAndExecute(cmd);
  };
  vm.rhsRearStop = function () {
    var cmd = 'cmd=254,100,2r1t300:cmd=254,101,2r1t300';
    checkAndExecute(cmd);
  };

  function checkAndExecute(cmd) {
    if (!vm.compressorStatus) {
      return;
    }
    WebIService.customCMD(cmd);
  }

  // Compressor for air suspension
  vm.compressorOn = function () {
    var cmd = 'cmd=254,109,1r1t300';
    vm.compressorStatus = true;
    toggleCompressor(cmd);
  };
  vm.compressorOff = function () {
    var cmd = 'cmd=254,101,1r1t300';
    vm.compressorStatus = false;
    toggleCompressor(cmd);
  };
  function toggleCompressor(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(1).then(function (data) {
        // position is the position of the item in the bank
        vm.compressorStatus = data.relays[1];
      });
    });
  }
}
