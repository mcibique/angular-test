(function (angular) {
  'use strict';

  angular
    .module('test.common.errors.requestErrorHandler', [
      'test.common.logger',
      'test.common.security.jwt'
    ])
    .factory('requestErrorHandler', function ($q, $injector, logger, jwt) {
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

          if (rejection.status === 401) {
            jwt.clear();
            $injector.get('dialogs').error('Unauthorized access.');
            $injector.get('$state').go('login');
          } else if (rejection.status === 500) {
            $injector.get('errorContext').set(rejection);
            $injector.get('$state').go('error.generic');
          } else if (rejection.status === 404) {
            $injector.get('errorContext').set(rejection);
            $injector.get('$state').go('error.not-found');
          }

          return $q.reject(rejection);
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('requestErrorHandler');
    });

})(window.angular);