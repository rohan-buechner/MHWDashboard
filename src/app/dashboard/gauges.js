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
      title: 'SUB Tank',
      unit: 'ℓ',
      pos: 0,
      value: 10 // TODO reset to 0
    },
    {
      title: 'Water Tank',
      unit: 'ℓ',
      pos: 1,
      value: 85 // TODO reset to 0
    },
    {
      title: 'Battery Amps',
      unit: 'Amps',
      pos: 2,
      value: 0
    },
    {
      title: 'Fridge',
      unit: '°',
      pos: 3,
      value: 0
    },
    {
      title: 'Freezer',
      unit: '°',
      pos: 4,
      value: 18,
      negateValue: true
    },
    {
      title: 'House Battery',
      unit: '%',
      pos: 5,
      value: 0
    },
    {
      title: 'IVECO Battery',
      unit: '%',
      pos: 6,
      value: 80
    },
    {
      title: 'Outside Temperature',
      unit: '°',
      pos: 7,
      value: 20
    },
    {
      title: 'Inside Temperature',
      unit: '°',
      pos: 8,
      value: 20
    },
    {
      title: 'AC Power',
      unit: 'V',
      pos: 9,
      value: 220
    }
  ];

  function _readSensors() {
    WebIService
      .readSensors()
      .then(function (sensorArray) { // eslint-disable-line no-unused-vars
        vm.gauges = vm.gauges.map(function (obj) {
          $log.debug(obj);
          return {
            title: obj.title,
            unit: obj.unit,
            value: obj.value, // TODO: obj.value must be replaced with => $filter('number')(sensorArray[obj.pos], 1) || 0,
            pos: obj.pos,
            negateValue: obj.negateValue
          };
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
        .then(function (sensorArray) { // eslint-disable-line no-unused-vars
          angular.forEach(vm.gauges, function (obj) { // eslint-disable-line no-unused-vars
          // TODO: uncomment this line obj.value = $filter('number')(sensorArray[obj.pos], 1);
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
