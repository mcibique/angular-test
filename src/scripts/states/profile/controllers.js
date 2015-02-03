(function (angular) {
  'use strict';

  angular
    .module('test.states.profile.controllers', [])
    .controller('ProfileController', function ($scope, $state, $stateParams, profile) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.profile = profile;
    });

})(window.angular);