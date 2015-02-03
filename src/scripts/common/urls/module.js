(function (angular) {
  'use strict';

  angular
    .module('test.common.urls', [
      'test.common.urls.urlBuilder'
    ])
    .config(function ($locationProvider) {
      $locationProvider.html5Mode(true);
    });

})(window.angular);