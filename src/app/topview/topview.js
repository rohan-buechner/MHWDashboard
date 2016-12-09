angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

function TopViewController($log, WebIService) {
  $log.info('in top view controller');
// LHS front air suspension Pump
  this.lhsFrontP = function () {
    var cmd = 'cmd=254,110,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.lhsFrontR = function () {
    var cmd = 'cmd=254,111,1r1t300';
    WebIService.customCMD(cmd);
  };
// RHS front air suspension Release
  this.rhsFrontP = function () {
    var cmd = 'cmd=254,112,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.rhsFrontR = function () {
    var cmd = 'cmd=254,113,1r1t300';
    WebIService.customCMD(cmd);
  };
  // LHS rear air suspension Pump
  this.lhsRearP = function () {
    var cmd = 'cmd=254,114,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.lhsRearR = function () {
    var cmd = 'cmd=254,115,1r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS front air suspension Release
  this.rhsRearP = function () {
    var cmd = 'cmd=254,108,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.rhsRearR = function () {
    var cmd = 'cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Compressor for air suspension
  this.compressorOn = function () {
    var cmd = 'cmd=254,109,4r1t300';
    this.outsideLightStatus = true;
    toggleCompressor(cmd, 4, 0);
  };
  this.compressorOff = function () {
    var cmd = 'cmd=254,101,4r1t300';
    this.outsideLightStatus = false;
    toggleCompressor(cmd, 4, 0);
  };
  function toggleCompressor(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(4).then(function (data) {
        // position is the position of the item in the bank
        this.compressorStatus = data[1];
      });
    });
  }
}
