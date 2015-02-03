(function (angular) {
  'use strict';

  angular
    .module('test.common.dialogs.controllers', [])
    .controller('MessageDialogController', function ($scope, $modalInstance, options, message) {
      $scope.title = options.title;
      $scope.buttonText = options.confirmButtonText;
      $scope.message = message;

      $scope.close = function () {
        $modalInstance.close();
      };
    })
    .controller('ConfirmDialogController', function ($scope, $modalInstance, options, message) {
      $scope.title = options.title;
      $scope.confirmButtonText = options.confirmButtonText;
      $scope.rejectButtonText = options.rejectButtonText;
      $scope.message = message;

      $scope.confirm = function () {
        $modalInstance.close();
      };

      $scope.reject = function () {
        $modalInstance.dismiss();
      };
    });

})(window.angular);