angular
  .module('app', ['ui.router', 'angularjs-gauge'])
  .config(function ($logProvider, $sceDelegateProvider) {
    $logProvider.debugEnabled(true);

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://srv*.assets.example.com/**']);
  })
  .filter('trustUrl', function ($sce) {
    return function (url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
