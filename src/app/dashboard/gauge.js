angular
  .module('app')
  .component('gaugeWidget', {
    templateUrl: 'app/dashboard/gauge.html',
    bindings: {
      gauge: '<'
    },
    controller: gaugeController
  });

function gaugeController($log, $stateParams) {
  this.value = this.gauge.value || 0;
}
