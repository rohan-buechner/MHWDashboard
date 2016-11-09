angular
  .module('app')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    },
    controller: techController
  });

function techController($log) {
  this.labels = ["Download Sales", "In-Store Sales"];
  this.data = [300, 500];
  this.options = {
    rotation: 1 * Number(Math.PI),
    circumference: 1 * Number(Math.PI)
  };
  $log.debug(this);
  this.value = this.tech.value || 0;
}
