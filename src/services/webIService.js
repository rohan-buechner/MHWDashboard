angular
  .module('app')
  .service('WebIService', WebIService);

function WebIService($log, $http) {
  $log.info('in WebI service');

  var _base = 'http://192.168.1.12/cgi-bin/';

  function _webIClick(_bank, _switch) {
    $log.info('in webi click');

    return $http({
      method: 'GET',
      url: '../shell_scripts/hello.sh'
      // _base+ 'runcommand.sh?cmd=254,' + _switch + ',' + _bank

    }).then(function (response) {
      // this callback will be called asynchronously
      // when the response is available

      $log.info(response);
      $log.info(_base);
      $log.info(_bank);
      $log.info(_switch);
    }, function (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

      $log.error(response);
    });
  }

  function _getCurrentState(elem) {
    $log.info(elem + ' is currently on!');
    return true;
  }

  return {
    buttonClick: _webIClick,
    getState: _getCurrentState
  };
}
