angular
  .module('app')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    },
    controller: function($scope) {
      $scope.labels = ["Download Sales", "In-Store Sales"];
      $scope.data = [300, 500];
      $scope.options = {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    }
  });
