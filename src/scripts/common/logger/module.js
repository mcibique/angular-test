(function (angular) {
  'use strict';

  angular
    .module('test.common.logger', [
      'test.environment',
      'test.common.logger.consoleLogger',
      'test.common.logger.emptyLogger'
    ])
    .factory('logger', function ($log, config, ConsoleLogger, EmptyLogger) {
      var enabled = !!config.logger.enabled;

      if (enabled) {
        return new ConsoleLogger('');
      } else {
        return new EmptyLogger('');
      }
    });

})(window.angular);