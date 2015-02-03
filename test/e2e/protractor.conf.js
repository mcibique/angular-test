'use strict';

module.exports.config = {
  baseUrl: 'http://localhost:9002/',
  framework: 'jasmine',
  maxSessions: 1,
  multiCapabilities: [{
    browserName: 'chrome'
  }, {
    browserName: 'firefox'
  }],
  onPrepare: function () {
    require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('../../.tmp/e2e/', true, true));
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
    full: [
      'page-objects/**/*.js',
      'spec/**/*.js'
    ]
  }
};