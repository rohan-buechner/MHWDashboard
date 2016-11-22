angular
  .module('app')
  .component('gauges', {
    templateUrl: 'app/dashboard/gauges.html',
    controller: GaugesController
  });

function GaugesController($http, $log, WebIService) {
  var vm = this;

  $http
    .get('/ProXR/halsema/gauges.json')
    .then(function (response) {
      WebIService
        .readSensors()
        .then(function (sensorArray) {
          vm.gauges = response.data.map(function (obj, index) {
            return {
              key: obj.key,
              range: obj.range,
              title: obj.title,
              unit: obj.unit,
              value: sensorArray[index]
            };
          });

          $log.info(vm);
        });
    });

  return vm;
}
