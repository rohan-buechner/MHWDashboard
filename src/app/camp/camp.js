angular
  .module('app')
  .component('camp', {
    templateUrl: 'app/camp/camp.html',
    controller: CampController
  });

/** @ngInject */
function CampController($log) {
  $log.info('in camp controller');
}
