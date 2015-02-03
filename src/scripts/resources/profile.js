(function (angular) {
  'use strict';

  angular
    .module('test.resources.profile', [
      'ngResource'
    ])
    .factory('Profile', function ($resource, urls) {
      return $resource(urls.resource('/profile'));
    });

})(window.angular);