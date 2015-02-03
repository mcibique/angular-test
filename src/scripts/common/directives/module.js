(function (angular) {
  'use strict';

  angular.module('test.common.directives', [
    'pasvaz.bindonce',
    'test.common.directives.forms',
    'test.common.directives.user-card',
    'test.common.directives.user-icon',
    'test.common.directives.templates'
  ]);

})(window.angular);