'use strict';

var ModalDialog = function () {
  var self = this;
  self.root = element(by.css('.modal'));
  self.header = self.root.element(by.css('.modal-header'));
  self.content = self.root.element(by.css('.modal-body'));
  self.footer = self.root.element(by.css('.modal-footer'));

  self.title = self.header.element(by.tagName('h3'));

  self.isOpen = function () {
    return self.root.isPresent();
  };

  self.getHeaderText = function () {
    return self.title.getText();
  };
};

var MessageDialog = function () {
  var self = this;
  ModalDialog.call(self);

  self.message = self.content.element(by.tagName('p'));
  self.okButton = self.footer.element(by.buttonText('OK'));

  self.getMessageText = function () {
    return self.message.getText();
  };

  self.confirm = function () {
    return self.okButton.click();
  };
};

MessageDialog.prototype = new ModalDialog();
MessageDialog.prototype.constructor = MessageDialog;

var AlertDialog = function () {
  var self = this;
  MessageDialog.call(self);

  self.okButton = self.footer.element(by.buttonText('Close'));
};

AlertDialog.prototype = new MessageDialog();
AlertDialog.prototype.constructor = AlertDialog;

var ConfirmDialog = function () {
  var self = this;
  MessageDialog.call(self);

  self.cancelButton = self.footer.element(by.buttonText('Cancel'));

  self.reject = function () {
    return self.cancelButton.click();
  };
};

ConfirmDialog.prototype = new MessageDialog();
ConfirmDialog.prototype.constructor = ConfirmDialog;

module.exports = {
  ModalDialog: ModalDialog,
  MessageDialog: MessageDialog,
  ConfirmDialog: ConfirmDialog,
  AlertDialog: AlertDialog
};