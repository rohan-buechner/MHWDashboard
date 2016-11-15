angular
  .module('app')
  .directive('holdClick', function ($parse, $interval) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var action = $parse(attrs.whilePressed);
        var intervalPromise = null;

        function bindWhilePressed() {
          elem.on('mousedown', beginAction);
        }

        function bindEndAction() {
          elem.on('mouseup', endAction);
          elem.on('mouseleave', endAction);
        }

        function unbindEndAction() {
          elem.off('mouseup', endAction);
          elem.off('mouseleave', endAction);
        }

        function beginAction(e) {
          e.preventDefault();
          tickAction();
          if (intervalPromise !== null) {
            return;
          }

          intervalPromise = $interval(tickAction, 1000);
          bindEndAction();
        }

        function endAction() {
          unbindEndAction();
          $interval.cancel(intervalPromise);
          intervalPromise = null;
        }

        function tickAction() {
          action(scope);
        }

        elem.on('$destroy', function () {
          $interval.cancel(intervalPromise);
        });

        bindWhilePressed();
      }
    };
  });
