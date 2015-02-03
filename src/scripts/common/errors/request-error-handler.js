(function (angular) {
  'use strict';

  angular
    .module('test.common.errors.requestErrorHandler', [
      'test.common.logger'
    ])
    .factory('requestErrorHandler', function ($q, $injector, logger) {
      var log = logger.get('http');

      return {
        request: function (config) {
          log.debug(config.method + ' ' + config.url);
          return config;
        },
        requestError: function (rejection) {
          log.error('Request error:', rejection);
          return $q.reject(rejection);
        },
        response: function (response) {
          var config = response.config;

          log.debug(config.method, config.url, response.status, response.statusText, response);
          return response;
        },
        responseError: function (rejection) {
          log.error('Response error:', rejection);
          return $q.reject(rejection);
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('requestErrorHandler');
    });

})(window.angular);