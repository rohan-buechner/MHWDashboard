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

  // LHS Steady
  // RHS Steady

  // Dish
  // TV (Inside)
  // TV (Outside)
  // Entry
  // Awning

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
