angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

function TopViewController($log, WebIService) {
  var vm = this;
  vm.compressorStatus = false;

  vm.$onInit = function () {
    WebIService.readRelays(1)
      .then(function (data) {
        vm.compressorStatus = data.relays[1];
      });
  };

// LHS front air suspension Pump
  vm.lhsFrontP = function () {
    var cmd = 'cmd=254,103,1r1t300:cmd=254,110,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.lhsFrontR = function () {
    var cmd = 'cmd=254,102,1r1t300:cmd=254,111,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.lhsFrontStop = function () {
    var cmd = 'cmd=254,102,1r1t300:cmd=254,103,1r1t300';
    WebIService.customCMD(cmd);
  };
// RHS front air suspension Release
  vm.rhsFrontP = function () {
    var cmd = 'cmd=254,105,1r1t300:cmd=254,112,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rhsFrontR = function () {
    var cmd = 'cmd=254,104,1r1t300:cmd=254,113,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rhsFrontStop = function () {
    var cmd = 'cmd=254,104,1r1t300:cmd=254,105,1r1t300';
    WebIService.customCMD(cmd);
  };
  // LHS rear air suspension Pump
  vm.lhsRearP = function () {
    var cmd = 'cmd=254,114,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.lhsRearR = function () {
    var cmd = 'cmd=254,115,1r1t300';
    WebIService.customCMD(cmd);
  };
  vm.lhsRearStop = function () {
    var cmd = 'cmd=254,106,1r1t300:cmd=254,107,1r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS front air suspension Release
  vm.rhsRearP = function () {
    var cmd = 'cmd=254,108,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rhsRearR = function () {
    var cmd = 'cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  vm.rhsRearStop = function () {
    var cmd = 'cmd=254,100,2r1t300:cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
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
