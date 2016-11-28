angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

function CampController($log, WebIService, $interval, $scope) {
  $log.info('in camp controller');

   // var killRunner;
   //
   // // used to update the UI
   // function pollDevice(_bank, killCommand) {
   //  // WebIService.buttonClick(_bank, killCommand);
   //   $log.debug(_bank, killCommand);
   //   $interval.cancel(killRunner);
   // }

   // 1000 = 1 sec
   // killRunner = $interval(pollDevice, 3000);

  $scope.$on('$destroy', function () {
    // $interval.cancel(killRunner);
  });

  this.click = function (_bank, _switch) {
    WebIService.buttonClick(_bank, _switch);
    $log.debug(_bank, _switch);
    // 1000 = 1 sec
    // killRunner = $interval(pollDevice(_bank, _switch-8), 4000);
  };

  // Roof
  this.roofUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.roofDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.roofStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };

  // Left Steady
  this.leftSteadyUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.leftSteadyDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.leftSteadyStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS Steady
  this.rightSteadyUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.rightSteadyDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.rightSteadyStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Dish
  this.dishUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.dishDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.dishStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // TV (Inside)
  this.insideTvUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.insideTvDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.insideTvStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
 // TV (Outside)
  this.outsideTvUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideTvDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideTvStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Entry
  this.entryStepUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.entryStepDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.entryStepStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Awning
  this.awningUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.awningDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  this.awningStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Wutside light
  this.outsideLightOn = function () {
    var cmd = 'cmd=254,112,1r1t300';
    WebIService.customCMD(cmd);
  };
  this.outsideLightOff = function () {
    var cmd = 'cmd=254,104,1r1t300';
    WebIService.customCMD(cmd);
  };
}
