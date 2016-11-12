angular
  .module('app')
  .component('media', {
    templateUrl: 'app/media/media.html',
    controller: MediaController
  });

function MediaController($log) {
  $log.info('in media controller');
}
