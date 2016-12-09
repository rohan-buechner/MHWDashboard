angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

function TopViewController($log, WebIService) {
  $log.info('in top view controller');

  this.compressorStatus = false;

  WebIService.readRelays(1)
    .then(function (data) {
      this.compressorStatus = data[1];
    });

// LHS front air suspension Pump
  this.lhsFrontP = function () {
    var cmd = 'cmd=254,110,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.lhsFrontR = function () {
    var cmd = 'cmd=254,111,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.lhsFrontStop = function () {
    var cmd = 'cmd=254,102,1r1t300:cmd=254,103,1r1t300';
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
  this.rhsFrontStop = function () {
    var cmd = 'cmd=254,104,1r1t300:cmd=254,105,1r1t300';
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
  this.lhsRearStop = function () {
    var cmd = 'cmd=254,106,1r1t300:cmd=254,107,1r1t300';
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
  this.rhsRearStop = function () {
    var cmd = 'cmd=254,100,2r1t300:cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Compressor for air suspension
  this.compressorOn = function () {
    var cmd = 'cmd=254,109,1r1t300';
    this.compressorStatus = true;
    toggleCompressor(cmd);
  };
  this.compressorOff = function () {
    var cmd = 'cmd=254,101,1r1t300';
    this.compressorStatus = false;
    toggleCompressor(cmd);
  };
  function toggleCompressor(cmd) {
    WebIService.customCMD(cmd).then(function () {
      $log.debug('in success');
      WebIService.readRelays(1).then(function (data) {
        // position is the position of the item in the bank
        this.compressorStatus = data[1];
      });
    });
  }
}
