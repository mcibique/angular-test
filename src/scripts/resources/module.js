(function (angular) {
  'use strict';

  angular
    .module('test.resources', [
      'ngResource',
      'test.resources.profile'
    ])
    .run(function (logger) {
      var log = logger.get('module');
      log.debug('Module test.resources is running.');
    });

})(window.angular);