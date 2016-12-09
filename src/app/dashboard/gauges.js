angular
  .module('app')
  .component('gauges', {
    templateUrl: 'app/dashboard/gauges.html',
    controller: GaugesController
  });

function GaugesController($http, $log, WebIService, $filter, $interval) {
  var vm = this;
  var interval;
  vm.gauges = [];

  function _readSensors() {
    $http
      .get('/ProXR/halsema/gauges.json')
      .then(function (response) {
        WebIService
          .readSensors()
          .then(function (sensorArray) {
            vm.gauges = response.data.map(function (obj, index) {
              return {
                title: obj.title,
                unit: obj.unit,
                value: $filter('number')(sensorArray[index], 1),
                pos: obj.pos
              };
            });

            $log.info('GaugesController.vm', vm);
          });
      });
  }

  var checkLoop = function () {
    if (angular.isDefined(interval)) {
      return;
    }

    interval = $interval(function () {

      WebIService
        .readSensors()
        .then(function (sensorArray) {
          angular.forEach(vm.gauges, function (value, key) {
            value.value = $filter('number')(sensorArray[key], 1);
          });
        });

    }, 3000);
  };

  this.$onInit = function () {
    _readSensors();
    checkLoop();
  };

  this.$onDestroy = function () {
    if (angular.isDefined(interval)) {
      $interval.cancel(interval);
      interval = undefined;
    }
  };

  return vm;
}
