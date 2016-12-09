angular
  .module('app')
  .service('WebIService', WebIService);

function WebIService($log, $http) {
  var _base = 'http://124.12.100.20/cgi-bin/';

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
    // var _url = './gauge_feed.sh';
    $log.info(_url);

    return $http({
      method: 'GET',
      url: _url
    }).then(function (transport) {
      var response = transport.data || 'empty';
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

      $log.debug('return collection', returnCollection);

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

  function _readRelaysForBank(_bankId) {
    var _url = _base + 'runcommand.sh?' + Math.floor(Math.random() * 1000) + ':cmd=254,124,' + (_bankId + 1);

    return $http({
      method: 'GET',
      url: _url
    }).then(function (transport) {
      var response = transport.data || 'empty';

      // splits the OK from the 85,
      var bankStatus = response.split('\n')[1];

      $log.debug(transport);
      $log.debug(_bankId);
      $log.debug(bankStatus);

      return updateBankStatus(_bankId, bankStatus);
    }).catch(function () {
      return updateBankStatus(_bankId, 7);
    });
  }

  function updateBankStatus(_bankId, val) {
    var result = {bank: _bankId, relays: ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']};

    if (val > 127) {
      result.relays[7] = 'true';
      val -= 128;
    }

    if (val > 63) {
      result.relays[6] = 'true';
      val -= 64;
    }

    if (val > 31) {
      result.relays[5] = 'true';
      val -= 32;
    }

    if (val > 15) {
      result.relays[4] = 'true';
      val -= 16;
    }

    if (val > 7) {
      result.relays[3] = 'true';
      val -= 8;
    }

    if (val > 3) {
      result.relays[2] = 'true';
      val -= 4;
    }

    if (val > 1) {
      result.relays[1] = 'true';
      val -= 2;
    }

    if (val > 0) {
      result.relays[0] = 'true';
    }

    $log.debug(result);
    return result;
  }

  return {
    readSensors: _readSensors,
    customCMD: _customCommand,
    readRelays: _readRelaysForBank
  };
}
