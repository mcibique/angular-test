(function (angular) {
  'use strict';

  angular
    .module('test.common.directives.user-card', [])
    .directive('userCard', function (urls) {
      return {
        restrict: 'EA',
        templateUrl: urls.directive('user-card/user-card.tpl.html'),
        replace: true,
        scope: {
          user: '=userCard'
        },
        controller: 'UserCardController'
      };
    })
    .controller('UserCardController', function ($scope) {
      $scope.getSocialIcon = function (name) {
        switch (name) {
          case 'linkedin':
            return 'test-icon-linkedin-squared';
          case 'facebook':
            return 'test-icon-facebook-squared';
          case 'skype':
            return 'test-icon-skype';
          case 'twitter':
            return 'test-icon-twitter';
          case 'youtube':
            return 'test-icon-youtube';
          default:
            throw 'unknown social icon: ' + name;
        }
      };
    });

})(window.angular);