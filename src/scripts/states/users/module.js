(function (angular) {
  'use strict';

  angular
    .module('test.states.users', [
      'ui.router',
      'test.common.urls',
      'test.states.users.controllers'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('users', {
          parent: 'main',
          url: '/users/',
          templateUrl: urlsProvider.view('users/users.html'),
          controller: 'UsersController',
          resolve: {
            users: function (Users) {
              return Users.query().$promise;
            }
          }
        })
        .state('users.create', {
          url: 'create/',
          templateUrl: urlsProvider.view('users/form.html'),
          controller: 'UserCreateController',
          resolve: {
            mode: function () {
              return 'create';
            }
          }
        })
        .state('users.detail', {
          url: 'detail/:id/',
          templateUrl: urlsProvider.view('users/detail.html'),
          controller: 'UserDetailController',
          resolve: {
            user: function ($stateParams, Users) {
              return Users.get({ id: $stateParams.id }).$promise;
            }
          }
        })
        .state('users.edit', {
          url: 'edit/:id/',
          templateUrl: urlsProvider.view('users/form.html'),
          controller: 'UserEditController',
          resolve: {
            mode: function () {
              return 'edit';
            },
            user: function ($stateParams, Users) {
              return Users.get({ id: $stateParams.id }).$promise;
            }
          }
        });
    });

})(window.angular);