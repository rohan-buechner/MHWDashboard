angular
  .module('app')
  .component('fountainGauge', {
    templateUrl: 'app/techs/gauge.html',
    bindings: {
      gauge: '<'
    },
    controller: gaugeController
  });

function gaugeController() {
  this.value = this.gauge.value || 0;
}
