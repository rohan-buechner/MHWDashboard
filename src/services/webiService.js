angular
  .module('app')
  .service('WebIService', WebIService);

/** @ngInject */
function WebIService($log) {
  $log.info('in WebI service');

  function _webIClick(elem) {
    $log.info('clicking on ' + elem);
    return true;
  }

  function _getCurrentState(elem) {
    $log.info(elem + ' is currently on!');
    return true;
  }

  return {
    buttonClick: _webIClick,
    getState: _getCurrentState,
  }
}
