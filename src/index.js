angular
  .module('app', ['ui.router', 'angularjs-gauge'])
  .config(function ($logProvider, $sceDelegateProvider) {
    $logProvider.debugEnabled(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self']);
  })

  // var _base = 'http://124.12.100.20/cgi-bin/';
  // var _base = 'http://10.0.0.17/cgi-bin/';
  // var _base = '/cgi-bin/';
  .constant('_base', 'http://10.0.0.17/cgi-bin/');
