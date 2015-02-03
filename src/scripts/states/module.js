(function (angular) {
  'use strict';

  angular
    .module('test.states', [
      'pasvaz.bindonce',
      'test.states.login',
      'test.states.main',
      'test.states.playground',
      'test.states.profile'
    ])
    .config(function ($urlRouterProvider, config) {
      $urlRouterProvider.otherwise(config.urls.defaultUrl || '/');
    })
    .run(function (logger) {
      var log = logger.get('module');
      log.debug('Module test.states is running.');
    });

})(window.angular);