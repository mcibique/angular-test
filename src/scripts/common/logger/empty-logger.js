(function (angular) {
  'use strict';

  angular
    .module('test.common.logger.emptyLogger', [])
    .factory('EmptyLogger', function () {
      return function EmptyLogger (name) {
        this.name = name;
        this.debug = this.log = this.info = this.warning = this.error = angular.noop;
        this.get = function () {
          return this;
        };
      };
    });

})(window.angular);