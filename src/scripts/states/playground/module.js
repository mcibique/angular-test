(function (angular) {
  'use strict';

  angular
    .module('test.states.playground', [
      'ui.router',
      'test.common.urls',
      'test.states.playground.controllers'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('playground', {
          parent: 'main',
          'abstract': true,
          url: '/playground/',
          template: '<div ui-view="" class="playground"></div>'
        })
        .state('playground.index', {
          url: '',
          templateUrl: urlsProvider.view('playground/playground.html'),
          controller: 'PlaygroundController'
        })
        .state('playground.directives', {
          url: 'directives/',
          templateUrl: urlsProvider.view('playground/directives.html'),
          controller: 'DirectivesController'
        })
        .state('playground.dialogs', {
          url: 'dialogs/',
          templateUrl: urlsProvider.view('playground/dialogs.html'),
          controller: 'DialogsController'
        })
        .state('playground.images', {
          url: 'images/',
          templateUrl: urlsProvider.view('playground/images.html'),
          controller: 'ImagesController'
        });
    });

})(window.angular);