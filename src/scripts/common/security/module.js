(function (angular) {
  'use strict';

  angular
    .module('test.common.security', [
      'test.environment',
      'test.common.security.jwt'
    ]);

})(window.angular);