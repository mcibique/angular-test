(function (angular) {
  'use strict';

  angular
    .module('test.common.errors.stateErrorHandler', [
      'test.common.logger'
    ])
    .run(function ($rootScope, logger) {
      var log = logger.get('state');

      $rootScope.$on('$stateChangeError', function ($event, $newState, $newStateParams, $oldState, $oldStateParams) {
        log.error('Error during changing the state: ', $newState, $newStateParams, $oldState, $oldStateParams);
      });

      $rootScope.$on('$stateChangeSuccess', function ($event, $newState, $newStateParams, $oldState, $oldStateParams) {
        log.debug('State changed: ', $newState, $newStateParams, $oldState, $oldStateParams);
      });
    });

})(window.angular);