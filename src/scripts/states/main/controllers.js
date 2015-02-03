(function (angular) {
  'use strict';

  angular
    .module('test.states.main.controllers', [])
    .controller('HeaderController', function ($scope, $state, $stateParams, jwt) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      $scope.isAuthenticated = function () {
        return jwt.isAuthenticated();
      };

      $scope.isNotLoginState = function () {
        return $state.current.name !== 'login';
      };

      $scope.logout = function () {
        jwt.clear();
        $state.go('login');
      };
    })
    .controller('MainController', function ($scope, $state, $stateParams) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
    })
    .controller('FooterController', function ($scope, $state, $stateParams, config) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.config = config;
    });

})(window.angular);