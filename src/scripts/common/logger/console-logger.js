(function (angular) {
  'use strict';

  angular
    .module('test.common.logger.consoleLogger', [
      'test.environment',
      'test.common.logger.loggerNameFormatter'
    ])
    .factory('ConsoleLogger', function ($log, config, loggerNameFormatter) {
      var enabledNames = config.logger.enabledNames || [];

      var splice = Array.prototype.splice,
        angularLog = $log;

      var isLoggerNameEnabled = enabledNames === '*' ?
        function () {
          return true;
        } :
        function (name) {
          if (!name) {
            return true;
          }
          return enabledNames.some(function (enabledName) {
            return enabledName === name;
          });
        };

      var writeLog = function (name, severity, args) {
        var method = angularLog[severity];

        if (!method || !angular.isFunction(method) || !isLoggerNameEnabled(name)) {
          return;
        }

        if (name) {
          splice.call(args, 0, 0, loggerNameFormatter.format(name));
        }

        method.apply(angularLog, args);
      };

      var ConsoleLogger = function (name) {
        this.name = name;
      };

      angular.extend(ConsoleLogger.prototype, {
        debug: function () {
          writeLog(this.name, 'debug', arguments);
        },
        log: function () {
          writeLog(this.name, 'log', arguments);
        },
        info: function () {
          writeLog(this.name, 'info', arguments);
        },
        warning: function () {
          writeLog(this.name, 'warn', arguments);
        },
        error: function () {
          writeLog(this.name, 'error', arguments);
        },
        get: function (name) {
          return new ConsoleLogger(name);
        }
      });

      return ConsoleLogger;
    })
    .config(function ($logProvider, config) {
      if (!config || !config.logger) {
        throw 'Invalid configuration.';
      }

      $logProvider.debugEnabled = config.debug && !!config.logger.enabled;
    });

})(window.angular);