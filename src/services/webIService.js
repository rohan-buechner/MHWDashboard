angular
  .module('app')
  .service('WebIService', WebIService);

function WebIService($log, $http) {
  $log.info('in WebI service');

  var _base = 'http://10.0.0.17/cgi-bin/';

  function _customCommand(_cmd) {
    $log.info('in _customCommand');

    var _url = _base + 'runcommand.sh?' + Math.floor(Math.random() * 1000) + ':' + _cmd;
    $log.info(_url);

    return $http({
      method: 'GET',
      url: _url
    }).then(function (response) {
      // this callback will be called asynchronously
      // when the response is available
      $log.info(response);
    }, function (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

      $log.error(response);
    });
  }

  function _readSensors() {
    $log.info('in _readSensors');

    var _url = _base + 'runcommand.sh?' + Math.floor(Math.random() * 1000) + ':cmd=254,196r32t1000';
    $log.info(_url);

    return $http({
      method: 'GET',
      url: _url
    }).then(function (transport) {
      var response = transport.data || 'error';
      var vr = response.split('\n');  // first line is OK message
      var adValues = vr[1].split(','); // actual sensor data
      var returnCollection = [];

      for (var i = 0; i < 16; i++) {
        var pos = (i * 2);
        var lsb = adValues[pos];
        var msb = adValues[pos + 1];
        var adValue = (parseInt(msb, 10) * 256) + parseInt(lsb, 10);
        if (adValue > 0) {
          returnCollection.push((adValue / 4096) * 100);
        } else {
          returnCollection.push(0);
        }
      }

      $log.debug(returnCollection);

      // this callback will be called asynchronously
      // when the response is available

      return returnCollection;
    }, function (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.

      $log.error(response);
      return [];
    });
  }

  return {
    readSensors: _readSensors,
    customCMD: _customCommand
  };
}
