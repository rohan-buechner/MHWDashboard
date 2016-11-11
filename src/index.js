angular
  .module('app', ['ui.router', 'chart.js', 'mgcrea.ngStrap', 'angularjs-gauge'])
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }]);
