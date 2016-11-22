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

  $scope.click = function (_bank, _switch) {
    WebIService.buttonClick(_bank, _switch);
    $log.debug(_bank, _switch);
    // 1000 = 1 sec
    // killRunner = $interval(pollDevice(_bank, _switch-8), 4000);
  };

  // Roof
  $scope.roofUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.roofDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.roofStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };

  // Left Steady
  $scope.leftSteadyUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.leftSteadyDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.leftSteadyStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // RHS Steady
  $scope.rightSteadyUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.rightSteadyDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.rightSteadyStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Dish
  $scope.dishUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.dishDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.dishStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // TV (Inside)
  $scope.insideTvUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.insideTvDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.insideTvStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
 // TV (Outside)
  $scope.outsideTvUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.outsideTvDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.outsideTvStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Entry
  $scope.entryStepUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.entryStepDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.entryStepStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Awning
  $scope.awningUp = function () {
    var cmd = 'cmd=254,110,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.awningDown = function () {
    var cmd = 'cmd=254,102,2r1t300:cmd=254,109,2r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.awningStop = function () {
    var cmd = 'cmd=254,101,2r1t300';
    WebIService.customCMD(cmd);
  };
  // Wutside light
  $scope.outsideLightOn = function () {
    var cmd = 'cmd=254,112,1r1t300';
    WebIService.customCMD(cmd);
  };
  $scope.outsideLightOff = function () {
    var cmd = 'cmd=254,104,1r1t300';
    WebIService.customCMD(cmd);
  };
}
