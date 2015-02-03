(function (angular) {
  'use strict';

  angular
    .module('test.common.errors.serverErrorLogger', [])
    .factory('serverErrorLogger', function () {
      return {
        log: function (error) {
          if (error) {
            // TODO: send the exception to the server.
            console.trace();
          }
        }
      };
    });

})(window.angular);