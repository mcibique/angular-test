(function (angular) {
  'use strict';

  angular
    .module('test.states.login', [
      'ui.router',
      'test.common.urls',
      'test.states.login.controllers',
      'test.states.login.services'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('login', {
          parent: 'main',
          url: '/login/',
          templateUrl: urlsProvider.view('login/login.html'),
          controller: 'LoginController'
        });
    });

})(window.angular);