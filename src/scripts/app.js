(function (angular) {
  'use strict';

  angular
    .module('test', [
      'test.common',
      'test.resources',
      'test.states'
    ])
    .run(function (logger) {
      var log = logger.get('module');
      log.debug('Module test is running.');
    });

})(window.angular);