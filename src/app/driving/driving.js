var height = 500;
var width = 500;

angular
  .module('app')
  .component('driving', {
    templateUrl: 'app/driving/driving.html',
    controller: DrivingController
  })
  .component('rear', {
    template: '<img src="http://41.160.227.145:8083/mjpg/video.mjpg?COUNTER" height="' + height + 'px" width="' + width + 'px" >'
  })
  .component('roof', {
    template: '<img src="http://85.93.105.195:8084/mjpg/video.mjpg?COUNTER" height="' + height + 'px" width="' + width + 'px" >'
  })
  .component('bottom', {
    template: '<img src="http://50.253.141.34:80/mjpg/video.mjpg?COUNTER" height="' + height + 'px" width="' + width + 'px" >'
  });

function DrivingController($log) {
  $log.info('in driving controller');
}
