angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: '<img src="http://41.160.227.145:8083/mjpg/video.mjpg?COUNTER">'
  })
  .component('roof', {
    template: '<img src="http://41.160.227.145:8083/mjpg/video.mjpg?COUNTER">'
  })
  .component('bottom', {
    template: '<img src="http://41.160.227.145:8083/mjpg/video.mjpg?COUNTER">'
  });

function DrivingController($log) {
  $log.info('in driving controller');
}
