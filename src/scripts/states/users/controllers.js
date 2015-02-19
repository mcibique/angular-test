(function (angular) {
  'use strict';

  angular
    .module('test.states.users.controllers', [])
    .controller('UsersController', function ($scope, $state, $stateParams, users) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.users = users;

      $scope.isDetailVisible = function () {
        return $state.is('users.create') || $state.is('users.detail') || $state.is('users.edit');
      };
    })
    .controller('UserCreateController', function ($scope, $state, $stateParams, Users, mode) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.mode = mode;
      $scope.user = {
        userName: '',
        profile: {
          firstName: '',
          lastName: '',
          email: ''
        }
      };

      var onCreated = function (user) {
        $state.go('users.detail', { id: user.id }, { reload: true });
      };

      $scope.onFormSubmit = function () {
        Users.save(null, $scope.user, onCreated);
      };

      $scope.cancel = function () {
        $state.go('users', null, { reload: true });
      };
    })
    .controller('UserDetailController', function ($scope, $state, $stateParams, Users, user) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.user = user;

      var onDeleted = function () {
        $state.go('users', null, { reload: true });
      };

      $scope.onDelete = function () {
        Users.remove({ id: user.id }, null, onDeleted);
      };

      var onBlockStatusChanged = function () {
        $state.go('users.detail', { id: user.id }, { reload: true });
      };

      $scope.onBlock = function () {
        Users.block({ id: user.id }, null, onBlockStatusChanged);
      };

      $scope.onUnblock = function () {
        Users.unblock({ id: user.id }, null, onBlockStatusChanged);
      };
    })
    .controller('UserEditController', function ($scope, $state, $stateParams, Users, mode, user) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
      $scope.mode = mode;
      $scope.user = user;

      var onUpdated = function (user) {
        // we have to reload also parent state, because the user has been updated
        // that can be done in two ways:
        // 1. $emit an event 'user-updated' to the parent scope and parent will update itself using
        //    $scope.users = Users.query().
        // 2. or we can just use 'reload' option offered by ui-router. this solution might have bad performance in lots
        //    of cases because parent state can load more stuff than users and that can cause
        //    unnecessary ajax calls.
        $state.go('users.detail', { id: user.id }, { reload: true });
      };

      $scope.onFormSubmit = function () {
        Users.update({ id: user.id }, user, onUpdated);
      };

      $scope.cancel = function () {
        $state.go('users.detail', { id: user.id });
      };
    });

})(window.angular);