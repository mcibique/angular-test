(function (angular) {
  'use strict';

  angular.module('test.common.directives.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('directives/forms/validation-messages-for.tpl.html',
      '<ul class="validation-messages" ng-if="errors.length" ng-class="{ \'validation-summary\': !name }"><li class="validation-message" ng-repeat="error in errors track by $index">{{ formatErrorMessage(error) }}</li></ul>');
    $templateCache.put('directives/user-card/user-card.tpl.html',
      '<div class="user-card" bindonce><span class="user-card-icon" user-icon="user"></span> <span class="user-card-name" bo-text="user | fullName"></span> <span class="user-card-email" bo-text="user.email"></span> <span class="user-card-status-icon" bo-class="{ \'test-icon-ok\': user.status === \'active\', \'test-icon-clock\': user.status === \'registered\' }" bo-attr bo-attr-title="user.status"></span><ul class="user-social-icons"><li ng-repeat="(name, url) in user.socials track by $index"><a bo-href="url" class="user-social-icon" bo-class="getSocialIcon(name)"></a></li></ul></div>');
    $templateCache.put('directives/user-icon/user-icon.tpl.html',
      '<span class="user-icon" bindonce bo-attr bo-attr-title="user | fullName"><span class="user-icon-text" bo-text="getInitials(user)"></span></span>');
  }]);

})(window.angular);
