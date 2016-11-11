angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

/** @ngInject */
function CampController($log, WebIService, $interval, $scope) {
  $log.info('in camp controller');

  var killRunner;

  // used to update the UI
  function pollDevice() {
    WebIService.buttonClick('camp');
  }

  killRunner = $interval(pollDevice, 1000);

  $scope.$on('$destroy', function() {
    $interval.cancel(killRunner);
  });
}
