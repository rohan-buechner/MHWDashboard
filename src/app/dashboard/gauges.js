angular
  .module('app')
  .component('gauges', {
    templateUrl: 'app/dashboard/gauges.html',
    controller: GaugesController
  });

function GaugesController($log, WebIService, $filter, $interval) {
  var vm = this;
  var interval;
  vm.gauges = [
    {
      title: 'Diesel Tank',
      unit: 'L',
      pos: 0,
      value: 0
    },
    {
      title: 'Water Tank',
      unit: 'L',
      pos: 1,
      value: 0
    },
    {
      title: 'Battery Amps',
      unit: 'A',
      pos: 2,
      value: 0
    },
    {
      title: 'Fridge',
      unit: '°C',
      pos: 3,
      value: 0
    },
    {
      title: 'Freezer',
      unit: '°C',
      pos: 4,
      value: 0
    },
    {
      title: 'House Battery',
      unit: 'V',
      pos: 5,
      value: 0
    },
    {
      title: 'IVECO Battery',
      unit: 'V',
      pos: 6,
      value: 0
    },
    {
      title: 'Outside Temperature',
      unit: '°C',
      pos: 7,
      value: 0
    },
    {
      title: 'Inside Temperature',
      unit: '°C',
      pos: 8,
      value: 0
    },
    {
      title: 'AC Power',
      unit: 'V',
      pos: 9,
      value: 0
    }
  ];

  function _readSensors() {
    WebIService
      .readSensors()
      .then(function (sensorArray) {
        vm.gauges = vm.gauges.map(function (obj) {
          $log.debug(obj);
          return {
            title: obj.title,
            unit: obj.unit,
            value: $filter('number')(sensorArray[obj.pos], 1) || 0,
            pos: obj.pos
          };
        });

        $log.info('GaugesController.vm', vm);
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
          angular.forEach(vm.gauges, function (obj) {
            obj.value = $filter('number')(sensorArray[obj.pos], 1);
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
