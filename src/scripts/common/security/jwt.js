(function (angular) {
  'use strict';

  angular
    .module('test.common.security.jwt', [])
    .factory('jwt', function (jwtStorage) {
      return {
        isAuthenticated: function () {
          return !!this.getToken();
        },
        clear: function () {
          jwtStorage.clearToken();
        },
        setToken: function (token) {
          jwtStorage.setToken(token);
        },
        getToken: function () {
          return jwtStorage.getToken();
        }
      };
    })
    .factory('jwtHttpInterceptor', function (jwt) {
      return {
        request: function (config) {
          var token = jwt.getToken();
          if (token) {
            config.headers.Authorization = 'Bearer ' + token;
          }

          return config;
        }
      };
    })
    .factory('jwtStorage', function ($window) {
      var localStorage = $window.localStorage;
      var tokenKey = 'jwt';

      return {
        setToken: function (token) {
          if (localStorage) {
            localStorage.setItem(tokenKey, token);
            return true;
          }
          return false;
        },
        getToken: function () {
          if (localStorage) {
            return localStorage.getItem(tokenKey) || '';
          }
          return '';
        },
        clearToken: function () {
          if (localStorage) {
            localStorage.removeItem(tokenKey);
            return true;
          }
          return false;
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('jwtHttpInterceptor');
    });

})(window.angular);