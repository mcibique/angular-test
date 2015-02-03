(function (angular) {
  'use strict';

  angular
    .module('test.common.logger.loggerNameFormatter', [
      'test.environment'
    ])
    .factory('loggerNameFormatter', function (config) {
      var maxLength = config.logger.maximumNameLength || 10,
        spaces = (new Array(maxLength)).join(' ');

      return {
        format: function (name) {
          return '[ ' + (name + spaces).substr(0, maxLength) + ' ]';
        }
      };
    });

})(window.angular);