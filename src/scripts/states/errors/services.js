(function (angular) {
  'use strict';

  angular
    .module('test.states.errors.services', [])
    .factory('errorContext', function () {
      var lastError;

      return {
        set: function (context) {
          lastError = context;
        },
        clear: function () {
          lastError = null;
        },
        get: function () {
          return lastError;
        }
      };
    });

})(window.angular);