(function (angular) {
  'use strict';

  angular
    .module('test.common.filters.fullName', [])
    .filter('fullName', function () {
      return function (user) {
        if (!user) {
          return '';
        }

        if (user.firstName && user.lastName) {
          return user.firstName + ' ' + user.lastName;
        }

        return user.lastName || user.firstName || '';
      };
    });

})(window.angular);