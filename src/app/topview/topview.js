angular
  .module('app')
  .component('topview', {
    templateUrl: 'app/topview/topview.html',
    controller: TopViewController
  });

function TopViewController($log) {
  $log.info('in top view controller');
}
