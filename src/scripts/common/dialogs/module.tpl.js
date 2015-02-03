(function (angular) {
  'use strict';

  angular.module('test.common.dialogs.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('dialogs/confirm.tpl.html',
      '<div class="modal-header"><h3 class="modal-title" bindonce bo-text="title"></h3></div><div class="modal-body"><p bindonce bo-text="message"></p></div><div class="modal-footer" bindonce><button class="btn btn-primary" ng-click="confirm()" bo-text="confirmButtonText"></button> <button class="btn btn-default" ng-click="reject()" bo-text="rejectButtonText"></button></div>');
    $templateCache.put('dialogs/message.tpl.html',
      '<div class="modal-header"><h3 class="modal-title" bindonce bo-text="title"></h3></div><div class="modal-body"><p bindonce bo-text="message"></p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="close()" bindonce bo-text="buttonText"></button></div>');
  }]);

})(window.angular);
