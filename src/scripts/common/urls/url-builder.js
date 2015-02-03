(function (angular) {
  'use strict';

  var UrlBuilder = function (urls) {
    if (!urls) {
      throw 'Invalid configuration for urlBuilder.';
    }

    var root = urls.root || '/',
      apiUrl = urls.api || 'api/',
      directivesUrl = urls.directives || 'directives/',
      dialogsUrl = urls.dialogs || 'dialogs/',
      resourceUrl = urls.resource || 'api/',
      viewsUrl = urls.views || 'views/';

    var splice = Array.prototype.splice,
      join = Array.prototype.join;

    var sanitize = function (url) {
      return (url || '').replace(/\/+/gi, '/');
    };

    var concat = function () {
      return sanitize(root + '/' + join.call(arguments, '/'));
    };

    var concatWithoutRoot = function () {
      return sanitize(join.call(arguments, '/'));
    };

    this.api = function () {
      splice.call(arguments, 0, 0, apiUrl);
      return concat.apply(this, arguments);
    };

    this.dialog = function () {
      splice.call(arguments, 0, 0, dialogsUrl);
      return concatWithoutRoot.apply(this, arguments);
    };

    this.directive = function () {
      splice.call(arguments, 0, 0, directivesUrl);
      return concatWithoutRoot.apply(this, arguments);
    };

    this.resource = function () {
      splice.call(arguments, 0, 0, resourceUrl);
      return concat.apply(this, arguments);
    };

    this.url = function () {
      return concat.apply(this, arguments);
    };

    this.view = function () {
      splice.call(arguments, 0, 0, viewsUrl);
      return concat.apply(this, arguments);
    };
  };

  angular
    .module('test.common.urls.urlBuilder', [
      'test.environment'
    ])
    .provider('urls', function (config) {
      var builder = new UrlBuilder(config.urls);

      this.api = function () {
        return builder.api.apply(builder, arguments);
      };

      this.dialog = function () {
        return builder.dialog.apply(builder, arguments);
      };

      this.directive = function () {
        return builder.directive.apply(builder, arguments);
      };

      this.$get = function () {
        return builder;
      };

      this.resource = function () {
        return builder.resource.apply(builder, arguments);
      };

      this.url = function () {
        return builder.url.apply(builder, arguments);
      };

      this.view = function () {
        return builder.view.apply(builder, arguments);
      };
    });

})(window.angular);