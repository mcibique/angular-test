(function (angular) {
  'use strict';

  angular
    .module('test.common.errors.errorHandler', [
      'test.common.logger',
      'test.common.errors.serverErrorLogger'
    ])
    .factory('$exceptionHandler', function (logger, serverErrorLogger) {
      return function (exception, cause) {
        if (exception && cause) {
          exception.message += ' (caused by: ' + cause + ')';
        }

        logger.get('window').error(exception, cause);
        serverErrorLogger.log(exception);
      };
    })
    .run(function ($window, serverErrorLogger) {
      if ($window.onerror) {
        return;
      }

      $window.onerror = function (message, url, lineNumber) {
        serverErrorLogger.log({
          message: message,
          url: url,
          stack: lineNumber
        });
      };
    });

})(window.angular);