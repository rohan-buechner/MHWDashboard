angular
  .module('app', ['ui.router', 'angularjs-gauge'])
  .config(function ($logProvider) {
    $logProvider.debugEnabled(true);
  });
