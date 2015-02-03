'use strict';

var Footer = function () {
  var self = this;

  self.root = element(by.tagName('footer'));
  self.version = self.root.element(by.css('span[bindonce]'));

  self.getVersionText = function () {
    return self.version.getText();
  };
};

module.exports = Footer;