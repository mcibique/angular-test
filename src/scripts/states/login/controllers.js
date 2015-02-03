(function (angular) {
  'use strict';

  angular
    .module('test.states.login.controllers', [])
    .controller('LoginController', function ($scope, $state, $stateParams, loginService, jwt) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      $scope.onLogin = function (userName, password) {
        loginService
          .login(userName, password)
          .success(function (response) {
            if (response.token) {
              $scope.loginForm.$clearErrors();
              jwt.setToken(response.token);
              $state.go('profile');
            }
          })
          .error(function (response) {
            $scope.loginForm.$setErrors(response.errors);
          });
      };
    });

})(window.angular);