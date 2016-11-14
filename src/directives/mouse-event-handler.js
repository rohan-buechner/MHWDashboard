angular
  .module('app')
  .directive('holdClick', function ($parse, $interval, $log) {
    var TICK_LENGTH = 15;
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
          elem.off('mouseup', endAction);
          elem.off('mouseleave', endAction);
        }

        function unbindEndAction() {
          $log.info('unbindEndAction');
          elem.on('mouseup', endAction);
          elem.on('mouseleave', endAction);
        }

        function beginAction(e) {
          $log.info('beginAction');
          e.preventDefault();
          tickAction();
        }

        intervalPromise = $interval(tickAction, TICK_LENGTH);

        function endAction() {
          $log.info('endAction');
          $interval.cancel(intervalPromise);
          unbindEndAction();
        }

        function tickAction() {
          $log.info('tickAction');
          action(scope);
        }

        bindWhilePressed();
        bindEndAction();
      }
    };
  });
