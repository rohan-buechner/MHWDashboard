angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

function CampController($log, WebIService, $interval, $scope) {
  $log.info('in camp controller');

  var killRunner;

  // used to update the UI
  function pollDevice() {
    WebIService.buttonClick('camp');
  }

  // 1000 = 1 sec
  killRunner = $interval(pollDevice, 2000);

  $scope.$on('$destroy', function () {
    $interval.cancel(killRunner);
  });
}
