angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  });

function DrivingController($log) {
  $log.info('in driving controller');
}
