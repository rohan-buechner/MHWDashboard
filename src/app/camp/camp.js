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
   // WebIService.buttonClick(_bank, _switch);
    $log.debug(_bank, _switch);
    // 1000 = 1 sec
    // killRunner = $interval(pollDevice(_bank, _switch-8), 4000);
  };
}
