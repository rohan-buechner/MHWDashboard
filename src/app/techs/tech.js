angular
  .module('app')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    },
    controller: techController
  });

function techController($scope) {
  $scope.labels = ["", ""];
  $scope.data = [300, 500];
  $scope.options = {
    rotation: 1 * Number(Math.PI),
    circumference: 1 * Number(Math.PI)
  };
}
