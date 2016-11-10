angular
  .module('app')
  .component('gaugeWidget', {
    templateUrl: 'app/dashboard/gauge.html',
    bindings: {
      gauge: '<'
    },
    controller: gaugeController
  });

function gaugeController($log) {
  $log.info(this);
  this.value = this.gauge.value || 0;
}
