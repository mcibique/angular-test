(function (angular) {
  'use strict';

  angular
    .module('test.common.directives.forms', [])
    .directive('form', function () {
      return {
        restrict: 'E',
        require: '?form',
        compile: function () {
          return {
            pre: function (scope, element, attrs, form) {
              var validationMessages = {};

              form.$registerValidationMessagesFor = function (name, scope) {
                validationMessages[name] = scope;
              };

              form.$unregisterValidationMessagesFor = function (name) {
                delete validationMessages[name];
              };

              form.$setErrors = function (errors) {
                errors = errors || [];
                for (var name in validationMessages) {
                  if (validationMessages.hasOwnProperty(name)) {
                    var scope = validationMessages[name];
                    if (scope) {
                      var temp = errors[name] || [];
                      var control = form[name];
                      var label = control && control.$label || '';
                      scope.setErrors(temp, label);
                      if (control) {
                        control.$toggleErrorClass(!temp.length);
                      }
                    }
                  }
                }
              };

              form.$clearErrors = function () {
                for (var name in validationMessages) {
                  if (validationMessages.hasOwnProperty(name)) {
                    var scope = validationMessages[name];
                    if (scope) {
                      scope.clearErrors();
                      var control = form[name];
                      if (control) {
                        control.$toggleErrorClass(false);
                      }
                    }
                  }
                }
              };

              var labels = {};
              var controls = {};

              form.$registerLabelFor = function (id, label, scope) {
                labels[id] = {
                  text: label,
                  scope: scope
                };

                // If the form already has the control registered, assign the label to the $label of the control.
                // This would happen in cases when <label> occurs in DOM after the <input> with ng-model
                var control = controls[id];
                if (control) {
                  control.$label = label;
                }
              };

              form.$unregisterLabelFor = function (id) {
                delete labels[id];
              };

              var prevAddControl = form.$addControl;
              form.$addControl = function (control) {
                prevAddControl(control);
                if (control.$id) {
                  controls[control.$id] = control;
                  // If the form already has the label registered, assign it to the $label of the control.
                  // This would happen in cases when <label> occurs in DOM before the <input> with ng-model
                  var label = labels[control.$id];
                  if (label) {
                    control.$label = label.text;
                  }
                }
              };

              var prevRemoveControl = form.$removeControl;
              form.$removeControl = function (control) {
                prevRemoveControl(control);
                if (control.$id) {
                  delete controls[control.$id];
                }
              };
            }
          };
        }
      };
    })
    .directive('validationMessagesFor', function (urls) {
      return {
        restrict: 'A',
        require: '^?form',
        scope: {
          name: '@validationMessagesFor',
          format: '@'
        },
        templateUrl: urls.directive('forms/validation-messages-for.tpl.html'),
        replace: true,
        controller: function ($scope) {
          $scope.formatErrorMessage = function (error) {
            if ($scope.format) {
              return $scope.format.replace('<%= label %>', $scope.label).replace('<%= message %>', error);
            }
            if ($scope.label) {
              return $scope.label + ': ' + error;
            }
            return error || '';
          };

          $scope.setErrors = function (errors, label) {
            $scope.errors = errors;
            $scope.label = label;
          };

          $scope.clearErrors = function () {
            $scope.errors = [];
          };
        },
        link: function (scope, element, attrs, form) {
          if (form) {
            form.$registerValidationMessagesFor(scope.name || '', scope);

            scope.$on('$destroy', function () {
              form.$unregisterValidationMessagesFor(scope.name);
            });
          }
        }
      };
    })
    .directive('ngModel', function () {
      return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
          if (ngModel && attrs.id) {
            ngModel.$id = attrs.id;
          }
          if (ngModel) {
            ngModel.$toggleErrorClass = function (valid) {
              element.toggleClass('invalid', !valid);
            };
          }
        }
      };
    })
    .directive('label', function () {
      return {
        restrict: 'E',
        require: '^?form',
        compile: function () {
          return {
            post: function (scope, element, attrs, form) {
              var target = attrs['for'];
              if (form && target) {
                form.$registerLabelFor(target, element.text(), scope);

                scope.$on('$destroy', function () {
                  form.$unregisterLabelFor(target);
                });
              }
            }
          };
        }
      };
    });

})(window.angular);