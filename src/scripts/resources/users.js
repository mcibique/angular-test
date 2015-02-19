(function (angular) {
  'use strict';

  angular
    .module('test.resources.users', [
      'ngResource'
    ])
    .factory('Users', function ($resource, urls) {
      return $resource(urls.resource('/users/:id'), null, {
        update: {
          method: 'PUT'
        },
        block: {
          url: urls.resource('/users/:id/block'),
          method: 'PATCH'
        },
        unblock: {
          url: urls.resource('/users/:id/unblock'),
          method: 'PATCH'
        }
      });
    });

})(window.angular);