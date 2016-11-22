angular
  .module('app')
  .component('gauges', {
    templateUrl: 'app/dashboard/gauges.html',
    controller: GaugesController
  });

function GaugesController($http, $log, WebIService, $filter, $interval) {
  var vm = this;

  function readSensors(multiplier) {
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
                value: $filter('number')( (sensorArray[index] + (multiplier || 1)), 1)
              };
            });

            $log.info('GaugesController.vm', vm);
          });
      });
  }

  var checkIsRunning;
  var counter = 5;
  var checkLoop = function() {
    // Don't start a new fight if we are already fighting
    if ( angular.isDefined(checkIsRunning) ) return;

    checkIsRunning = $interval(function() {

      if (counter > 7) {
        counter--
      } else {
        counter += 5;
      }
      readSensors(counter);
    }, 3000);
  };

  readSensors();
  checkLoop();

  return vm;
}
