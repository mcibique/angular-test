(function (angular) {
  'use strict';

  angular
    .module('test.resources', [
      'test.resources.profile',
      'test.resources.users'
    ])
    .run(function (logger) {
      var log = logger.get('module');
      log.debug('Module test.resources is running.');
    });

})(window.angular);