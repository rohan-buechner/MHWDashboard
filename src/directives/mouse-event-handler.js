angular
  .module('app')
  .directive('holdClick', function ($parse, $interval, $log) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var action = $parse(attrs.whilePressed);
        var intervalPromise = null;

        function bindWhilePressed() {
          $log.info('bindWhilePressed');
          elem.on('mousedown', beginAction);
        }

        function bindEndAction() {
          $log.info('bindEndAction');
          elem.on('mouseup', endAction);
          elem.on('mouseleave', endAction);
        }

        function unbindEndAction() {
          $log.info('unbindEndAction');
          elem.off('mouseup', endAction);
          elem.off('mouseleave', endAction);
        }

        function beginAction(e) {
          $log.info('beginAction');
          e.preventDefault();
          tickAction();
          if (intervalPromise !== null) {
            return;
          }

          intervalPromise = $interval(tickAction, 1000);
          bindEndAction();
        }

        function endAction() {
          $log.info('endAction');
          unbindEndAction();
          $interval.cancel(intervalPromise);
          intervalPromise = null;
        }

        function tickAction() {
          $log.info('ticking');
          action(scope);
        }

        elem.on('$destroy', function () {
          $interval.cancel(intervalPromise);
        });

        bindWhilePressed();
      }
    };
  });
