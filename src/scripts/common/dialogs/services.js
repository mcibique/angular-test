(function (angular) {
  'use strict';

  angular
    .module('test.common.dialogs.services', [
      'ui.bootstrap',
      'test.common.urls',
      'test.common.dialogs.templates'
    ])
    .provider('dialogs', function () {

      var confirmDefaults = {
        title: 'Question',
        confirmButtonText: 'OK',
        rejectButtonText: 'Cancel'
      };

      var errorDefaults = {
        title: 'Unexpected error',
        confirmButtonText: 'Close'
      };

      var infoDefaults = {
        title: 'Note',
        confirmButtonText: 'OK'
      };

      //noinspection JSUnusedGlobalSymbols
      this.errorDefaults = errorDefaults;
      //noinspection JSUnusedGlobalSymbols
      this.confirmDefaults = confirmDefaults;
      //noinspection JSUnusedGlobalSymbols
      this.infoDefaults = infoDefaults;

      this.$get = function ($modal, urls) {
        var error = function (message, options) {
          if (!message) {
            return;
          }
          var opt = angular.extend({}, errorDefaults, options);

          var instance = $modal.open({
            templateUrl: urls.dialog('message.tpl.html'),
            controller: 'MessageDialogController',
            resolve: {
              message: function () {
                return message;
              },
              options: function () {
                return opt;
              }
            }
          });

          return instance.result;
        };

        var info = function (message, options) {
          if (!message) {
            return;
          }
          var opt = angular.extend({}, infoDefaults, options);

          var instance = $modal.open({
            templateUrl: urls.dialog('message.tpl.html'),
            controller: 'MessageDialogController',
            resolve: {
              message: function () {
                return message;
              },
              options: function () {
                return opt;
              }
            }
          });

          return instance.result;
        };

        var confirm = function (message, options) {
          if (!message) {
            return;
          }
          var opt = angular.extend({}, confirmDefaults, options);

          var instance = $modal.open({
            templateUrl: urls.dialog('confirm.tpl.html'),
            controller: 'ConfirmDialogController',
            resolve: {
              message: function () {
                return message;
              },
              options: function () {
                return opt;
              }
            }
          });

          return instance.result;
        };

        return {
          error: error,
          info: info,
          confirm: confirm
        };
      };
    });

})(window.angular);