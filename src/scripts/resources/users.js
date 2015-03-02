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
          method: 'POST'
        },
        unblock: {
          url: urls.resource('/users/:id/unblock'),
          method: 'POST'
        }
      });
    });

})(window.angular);