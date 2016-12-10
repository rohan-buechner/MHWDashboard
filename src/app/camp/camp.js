angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

function CampController($log, WebIService, $q) {
  $log.info('in camp controller');

  var vm = this;
  vm.outsideLightStatus = false;

  vm.$onInit = function () {
    $q.all([
      WebIService.readRelays(2),
      WebIService.readRelays(3)
    ]).then(function (data) {
      $log.debug(data);
      vm.outsideLightStatus = data[0].relays[5];
      vm.entryStepStatus = data[1].relays[2];
    })
  };

  // Roof
  vm.roofUp = function () {
    var cmd = 'cmd=254,111,2r1t300:cmd=254,110,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.roofDown = function () {
    var cmd = 'cmd=254,111,2r1t300:cmd=254,102,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.roofStop = function () {
    var cmd = 'cmd=254,103,2r1t300';
    WebIService.customCMD(cmd);
  };

  // Left Steady
  vm.leftSteadyUp = function () {
    var cmd = 'cmd=254,115,2r1t300:cmd=254,114,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.leftSteadyDown = function () {
    var cmd = 'cmd=254,115,2r1t300:cmd=254,106,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.leftSteadyStop = function () {
    var cmd = 'cmd=254,107,2r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS Steady
  vm.rightSteadyUp = function () {
    var cmd = 'cmd=254,109,3r1t300:cmd=254,108,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rightSteadyDown = function () {
    var cmd = 'cmd=254,109,3r1t300:cmd=254,100,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rightSteadyStop = function () {
    var cmd = 'cmd=254,101,3r1t300';
    WebIService.customCMD(cmd);
  };
  // Dish
  vm.dishUp = function () {
    var cmd = 'cmd=254,112,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.dishDown = function () {
    var cmd = 'cmd=254,104,2r1t300';
    WebIService.customCMD(cmd);
  };

  // TV (Inside)
  vm.insideTvUp = function () {
    var cmd = 'cmd=254,106,3r1t300:cmd=254,113,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.insideTvDown = function () {
    var cmd = 'cmd=254,105,3r1t300:cmd=254,114,3r1t300';
    WebIService.customCMD(cmd);
  };
  // TV (Outside)
  vm.outsideTvUp = function () {
    var cmd = 'cmd=254,100,4r1t300:cmd=254,115,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.outsideTvDown = function () {
    var cmd = 'cmd=254,107,3r1t300:cmd=254,108,4r1t300';
    WebIService.customCMD(cmd);
  };

  // Outside light
  vm.outsideLightOn = function () {
    var cmd = 'cmd=254,113,2r1t300';
    vm.outsideLightStatus = true;
    toggleLight(cmd);
  };
  vm.outsideLightOff = function () {
    var cmd = 'cmd=254,105,2r1t300';
    vm.outsideLightStatus = false;
    toggleLight(cmd);
  };
  function toggleLight(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(2).then(function (data) {
        // position is the position of the item in the bank
        $log.debug('this.outsideLightStatus', data.relays[5]);
        vm.outsideLightStatus = data.relays[5];
      });
    });
  }

  // Entry
  vm.entryStepOut = function () {
    var cmd = 'cmd=254,110,3r1t300';
    vm.entryStepStatus = true;
    toggleEntryStep(cmd);
  };
  vm.entryStepIn = function () {
    var cmd = 'cmd=254,102,3r1t300';
    vm.entryStepStatus = false;
    toggleEntryStep(cmd);
  };
  function toggleEntryStep(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(3).then(function (data) {
        // position is the position of the item in the bank
        $log.debug('this.toggleEntryStep', data.relays[2]);
        vm.entryStepStatus = data.relays[2];
      });
    });
  }

  // Awning
  vm.awningUp = function () {
    var cmd = 'cmd=254,112,3r1t300:cmd=254,111,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.awningDown = function () {
    var cmd = 'cmd=254,112,3r1t300:cmd=254,103,3r1t300';
    WebIService.customCMD(cmd);
  };
  vm.awningStop = function () {
    var cmd = 'cmd=254,104,3r1t300';
    WebIService.customCMD(cmd);
  };

}
