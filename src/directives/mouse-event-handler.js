angular
  .module('app')
  .directive('clickHandler', function ($interval) {
    return {
      templateUrl: 'time.html',
      restrict: 'E',
      scope: {
        Time: '=value'
      },
      link: function (scope, element) {
        element.addClass('time');

        var promise;
        scope.clicked = function () {
          promise = $interval(function () {
            scope.Time++;
          }, 100);
        };

        scope.onRelease = function () {
          $interval.cancel(promise);
        };
      }
    };
  });
