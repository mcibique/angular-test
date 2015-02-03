(function (angular) {
  'use strict';

  angular
    .module('test.states.main', [
      'ui.router',
      'test.common.urls',
      'test.states.main.controllers'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('main', {
          'abstract': true,
          url: '',
          views: {
            header: {
              templateUrl: urlsProvider.view('main/header.html'),
              controller: 'HeaderController'
            },
            main: {
              template: '<div ui-view=""></div>',
              controller: 'MainController'
            },
            footer: {
              templateUrl: urlsProvider.view('main/footer.html'),
              controller: 'FooterController'
            }
          }
        });
    });

})(window.angular);