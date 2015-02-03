(function (angular) {
  'use strict';

  angular
    .module('test.states.playground.controllers', [
      'test.common.dialogs',
      'test.common.logger'
    ])
    .controller('PlaygroundController', function ($scope, $state, $stateParams) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;
    })
    .controller('DirectivesController', function ($scope, $state, $stateParams) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      $scope.users = [
        {
          firstName: 'Test',
          lastName: 'User',
          email: 'test.user@email.com',
          status: 'registered',
          socials: {
            linkedin: 'https://www.linkedin.com/',
            youtube: 'https://www.youtube.com/'
          }
        },
        {
          firstName: 'Test',
          lastName: 'User 2',
          email: 'test.user2@email.com',
          status: 'active'
        },
        {
          firstName: 'Test',
          lastName: 'User 3',
          email: 'test.user3@email.com',
          status: 'active'
        },
        {
          firstName: 'Test',
          lastName: 'User 4',
          email: 'test.user4@email.com',
          status: 'registered',
          socials: {
            linkedin: 'https://www.linkedin.com/',
            skype: 'http://www.skype.com',
            twitter: 'https://twitter.com/'
          }
        }
      ];
    })
    .controller('DialogsController', function ($scope, $state, $stateParams, logger, dialogs) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      $scope.customMessage = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci consectetur et ex ' +
      'hic id ipsa, maiores mollitia natus numquam obcaecati, officiis perferendis, praesentium quasi quisquam quo ' +
      'repellat rerum temporibus vitae!';
      $scope.severity = 'info';

      var log = logger.get('dialogs');

      $scope.showCustomMessage = function () {
        dialogs
          [$scope.severity]($scope.customMessage)
          .then(function (result) {
            log.debug('Confirmed', result);
          }, function (result) {
            log.debug('Rejected', result);
          });
      };

      $scope.showConfirmDialog = function () {
        dialogs
          .confirm($scope.customMessage)
          .then(function (result) {
            log.debug('Confirmed', result);
          }, function (result) {
            log.debug('Rejected', result);
          });
      };
    })
    .controller('ImagesController', function ($scope, $state, $stateParams) {
      $scope.$state = $state;
      $scope.$stateParams = $stateParams;

      var current = 0;
      var statuses = ['success', 'info', 'error'];

      $scope.currentStatus = statuses[current];

      $scope.changeStatus = function () {
        current = (current + 1) % 3;
        $scope.currentStatus = statuses[current];
      };
    });

})(window.angular);