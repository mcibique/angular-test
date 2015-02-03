(function (angular) {
  'use strict';

  angular
    .module('test.common', [
      'test.environment',
      'test.common.dialogs',
      'test.common.directives',
      'test.common.errors',
      'test.common.filters',
      'test.common.logger',
      'test.common.security',
      'test.common.urls'
    ])
    .run(function (logger) {
      var log = logger.get('module');
      log.debug('Module test.common is running.');
    });

})(window.angular);