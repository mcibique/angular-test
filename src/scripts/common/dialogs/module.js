(function (angular) {
  'use strict';

  angular
    .module('test.common.dialogs', [
      'pasvaz.bindonce',
      'test.common.dialogs.controllers',
      'test.common.dialogs.services'
    ]);

})(window.angular);