(function (angular) {
  'use strict';

  angular
    .module('test.common.directives.user-icon', [])
    .directive('userIcon', function (urls) {
      return {
        restrict: 'EA',
        templateUrl: urls.directive('user-icon/user-icon.tpl.html'),
        scope: {
          user: '=userIcon'
        },
        replace: true,
        controller: 'UserIconController'
      };
    })
    .controller('UserIconController', function ($scope) {
      $scope.getInitials = function (user) {
        if (!user) {
          return '';
        }
        return (user.firstName.charAt(0) || '') + (user.lastName.charAt(0) || '');
      };
    });

})(window.angular);