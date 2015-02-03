'use strict';

var Header = require('../page-objects/header.po');
var Footer = require('../page-objects/footer.po');

describe('Index.html', function () {
  it('should display header title', function () {
    browser.get('');
    var header = new Header();
    expect(header.getTitleText()).toBe('Test web');
  });

  it('should display footer information', function () {
    browser.get('');
    var footer = new Footer();
    expect(footer.getVersionText()).toBe('Version: 0.0.0');
  });
});