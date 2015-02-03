'use strict';

var Header = function () {
  this.root = element(by.tagName('header'));
  this.title = this.root.element(by.tagName('h1'));

  this.getTitleText = function () {
    return this.title.getText();
  };
};

module.exports = Header;