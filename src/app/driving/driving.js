angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  });

/** @ngInject */
function DrivingController($log) {
  $log.info('in driving controller');
}
