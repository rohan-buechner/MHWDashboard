angular
  .module('app')
  .service('WebIService', WebIService);

/** @ngInject */
function WebIService($log) {
  $log.info('in WebI service');
}
