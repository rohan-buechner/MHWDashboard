angular
  .module('app')
  .component('media', {
    templateUrl: 'app/media/media.html',
    controller: MediaController
  });

/** @ngInject */
function MediaController($log) {
  $log.info('in media controller');
}
