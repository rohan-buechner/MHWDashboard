angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

/** @ngInject */
function TopViewController($log) {
  $log.info('in top view controller');
}
