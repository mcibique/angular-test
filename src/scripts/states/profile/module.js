(function (angular) {
  'use strict';

  angular
    .module('test.states.profile', [
      'ui.router',
      'test.common.urls',
      'test.states.profile.controllers'
    ])
    .config(function ($stateProvider, urlsProvider) {
      $stateProvider
        .state('profile', {
          parent: 'main',
          url: '/profile/',
          templateUrl: urlsProvider.view('profile/profile.html'),
          controller: 'ProfileController',
          resolve: {
            profile: function (Profile) {
              return Profile.get().$promise;
            }
          }
        });
    });

})(window.angular);