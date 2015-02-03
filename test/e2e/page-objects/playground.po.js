'use strict';

var PlaygroundDialogs = function (root) {
  var self = this;
  self.root = root;
  self.form = self.root.element(by.tagName('form'));
  self.customMessage = self.form.element(by.model('customMessage'));
  self.severity = self.form.element(by.model('severity'));
  self.buttonOpenDialog = self.root.element(by.buttonText('Open dialog'));
  self.buttonConfirmDialog = self.root.element(by.buttonText('Open confirm dialog'));

  self.get = function () {
    return browser.get('#/playground/dialogs/');
  };

  self.setCustomMessage = function (customMessage) {
    return self.customMessage.clear().then(function () {
      return self.customMessage.sendKeys(customMessage);
    });
  };

  self.setSeverity = function (severity) {
    return self.severity.element(by.css('option[value="' + severity + '"]')).click();
  };

  self.openDialog = function () {
    return self.buttonOpenDialog.click();
  };

  self.openConfirmDialog = function () {
    return self.buttonConfirmDialog.click();
  };
};

var PlaygroundPage = function () {
  var self = this;
  self.root = element(by.css('.playground'));
  self.title = self.root.element(by.tagName('h2'));

  self.get = function () {
    return browser.get('#/playground/');
  };

  self.getTitleText = function () {
    return self.title.getText();
  };

  self.dialogs = new PlaygroundDialogs(self.root);
};

module.exports = PlaygroundPage;