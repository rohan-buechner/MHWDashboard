angular
  .module('app')
  .component('gauges', {
    templateUrl: 'app/dashboard/gauges.html',
    controller: GaugesController
  });

function GaugesController($http, $log) {
  var vm = this;

  $http
    .get('app/conf/gauges.json')
    .then(function (response) {
      $log.info(response);
      vm.gauges = response.data;
    });
}
