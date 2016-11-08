angular
  .module('app')
  .component('fountainTech', {
    templateUrl: 'app/techs/tech.html',
    bindings: {
      tech: '<'
    },
    controller: function($scope) {
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data = [300, 500, 100];
    }
  });
