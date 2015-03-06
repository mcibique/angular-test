(function (angular) {
  'use strict';

  angular
    .module('test.states.errors.controllers', [])
    .controller('GenericErrorController', function ($scope, $state, $stateParams, errorContext, config) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      var context = errorContext.get();
      if (context) {
        var error = context.data;
        $scope.message = error.message;
        $scope.exceptionType = error.exceptionType;
        $scope.stackTrace = error.stackTrace;

        var request = context.config;
        $scope.url = request.url;
        $scope.method = request.method;
        $scope.status = context.status;
        $scope.statusText = context.statusText;
      }

      $scope.showDebug = config.debug;
    })
    .controller('NotFoundController', function ($scope, $state, $stateParams, errorContext, config) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      var context = errorContext.get();
      if (context) {
        var request = context.config;
        $scope.url = request.url;
        $scope.method = request.method;
      }

      $scope.showDebug = config.debug;
    });

})(window.angular);