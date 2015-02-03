(function (angular) {
  'use strict';

  angular.module('test.common.errors', [
    'test.common.errors.errorHandler',
    'test.common.errors.requestErrorHandler',
    'test.common.errors.stateErrorHandler'
  ]);

})(window.angular);