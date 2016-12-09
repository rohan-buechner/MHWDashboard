angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

function CampController($log, WebIService, $q) {
  $log.info('in camp controller');

  var relays = { };

  $q.all([
    WebIService.readRelays(0),
    WebIService.readRelays(1),
    WebIService.readRelays(2),
    WebIService.readRelays(3)
  ]).then(function (data) {
    relays.bank0 = data[0];
    relays.bank1 = data[1];
    relays.bank2 = data[2];
    relays.bank3 = data[3];
    return relays;
  }).then(function (data) {
    $log.debug(data);
  });

  this.click = function (_bank, _switch) {
    WebIService.buttonClick(_bank, _switch);
    $log.debug(_bank, _switch);
    // 1000 = 1 sec
    // killRunner = $interval(pollDevice(_bank, _switch-8), 4000);
  };

  // Roof
  this.roofUp = function () {
    var cmd = 'cmd=254,111,2r1t300:cmd=254,110,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.roofDown = function () {
    var cmd = 'cmd=254,111,2r1t300:cmd=254,102,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.roofStop = function () {
    var cmd = 'cmd=254,103,2r1t300';
    WebIService.customCMD(cmd);
  };

  // Left Steady
  this.leftSteadyUp = function () {
    var cmd = 'cmd=254,115,2r1t300:cmd=254,114,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.leftSteadyDown = function () {
    var cmd = 'cmd=254,115,2r1t300:cmd=254,106,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.leftSteadyStop = function () {
    var cmd = 'cmd=254,107,2r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS Steady
  this.rightSteadyUp = function () {
    var cmd = 'cmd=254,109,3r1t300:cmd=254,108,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.rightSteadyDown = function () {
    var cmd = 'cmd=254,109,3r1t300:cmd=254,100,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.rightSteadyStop = function () {
    var cmd = 'cmd=254,101,3r1t300';
    WebIService.customCMD(cmd);
  };
  // Dish
  this.dishUp = function () {
    var cmd = 'cmd=254,112,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.dishDown = function () {
    var cmd = 'cmd=254,103,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.dishStop = function () {
    var cmd = 'cmd=254,103,2r1t300';
    WebIService.customCMD(cmd);
  };
  // TV (Inside)
  this.insideTvUp = function () {
    var cmd = 'cmd=254,113,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.insideTvDown = function () {
    var cmd = 'cmd=254,114,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.insideTvStop = function () {
    var cmd = 'cmd=254,114,3r1t300';
    WebIService.customCMD(cmd);
  };
  // TV (Outside)
  this.outsideTvUp = function () {
    var cmd = 'cmd=254,110,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideTvDown = function () {
    var cmd = 'cmd=254,102,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideTvStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Entry
  this.entryStepUp = function () {
    var cmd = 'cmd=254,110,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.entryStepDown = function () {
    var cmd = 'cmd=254,102,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.entryStepStop = function () {
    var cmd = 'cmd=254,102,3r1t300';
    WebIService.customCMD(cmd);
  };
  // Awning
  this.awningUp = function () {
    var cmd = 'cmd=254,112,3r1t300:cmd=254,111,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.awningDown = function () {
    var cmd = 'cmd=254,112,3r1t300:cmd=254,103,3r1t300';
    WebIService.customCMD(cmd);
  };
  this.awningStop = function () {
    var cmd = 'cmd=254,104,3r1t300';
    WebIService.customCMD(cmd);
  };
  // Wutside light
  this.outsideLightOn = function () {
    var cmd = 'cmd=254,109,4r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideLightOff = function () {
    var cmd = 'cmd=254,101,4r1t300';
    WebIService.customCMD(cmd);
  };
}
