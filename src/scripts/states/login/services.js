(function (angular) {
  'use strict';

  angular
    .module('test.states.login.services', [])
    .service('loginService', function ($http, urls) {
      this.login = function (userName, password) {
        return $http.post(urls.api('login/'), {
          userName: userName,
          password: password
        });
      };
    });

})(window.angular);