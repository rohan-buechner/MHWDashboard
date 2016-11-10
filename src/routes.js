angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {url: '/', component: 'app'})
    .state('info', {url: '/info', component: 'gauges'})
    .state('camp', {url: '/camp', component: 'camp'})
    .state('driving', {url: '/driving', component: 'driving'})
    .state('media', {url: '/media', component: 'media'})
    .state('topview', {url: '/topview', component: 'topview'});
}
