(function (angular) {
  'use strict';

  angular
    .module('test.states.errors', [
      'ui.router',
      'test.common.urls',
      'test.states.errors.controllers',
      'test.states.errors.services'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('error', {
          parent: 'main',
          'abstract': true,
          url: '',
          template: '<div ui-view=""></div>'
        })
        .state('error.generic', {
          parent: 'error',
          url: '/error/',
          templateUrl: urlsProvider.view('errors/error.html'),
          controller: 'GenericErrorController'
        })
        .state('error.not-found', {
          parent: 'error',
          urr: '/not-found/',
          templateUrl: urlsProvider.view('errors/not-found.html'),
          controller: 'NotFoundController'
        });
    });

})(window.angular);