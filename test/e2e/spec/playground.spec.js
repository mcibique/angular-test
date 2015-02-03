'use strict';

var PlaygroundPage = require('../page-objects/playground.po');
var Modals = require('../page-objects/modals.po');

describe('Playground', function () {

  var playground;

  beforeEach(function () {
    playground = new PlaygroundPage();
  });

  it('should display playground index', function () {
    playground.get();
    expect(playground.getTitleText()).toBe('Playground');
  });

  it('should display dialogs playground', function () {
    playground.dialogs.get();
    expect(playground.getTitleText()).toBe('Dialogs');
  });

  it('should display info dialog', function () {
    playground.dialogs.get();
    playground.dialogs.setCustomMessage('Test message');
    playground.dialogs.setSeverity('info');
    playground.dialogs.openDialog();

    var dialog = new Modals.MessageDialog();
    expect(dialog.isOpen()).toBeTruthy();
    expect(dialog.getHeaderText()).toBe('Note');
    expect(dialog.getMessageText()).toBe('Test message');
    dialog.confirm();
    expect(dialog.isOpen()).toBeFalsy();
  });

  it('should display error dialog', function () {
    playground.dialogs.get();
    playground.dialogs.setCustomMessage('Test error message');
    playground.dialogs.setSeverity('error');
    playground.dialogs.openDialog();

    var dialog = new Modals.AlertDialog();
    expect(dialog.isOpen()).toBeTruthy();
    expect(dialog.getHeaderText()).toBe('Unexpected error');
    expect(dialog.getMessageText()).toBe('Test error message');
    dialog.confirm();
    expect(dialog.isOpen()).toBeFalsy();
  });

  it('should display confirmation dialog', function () {
    playground.dialogs.get();
    playground.dialogs.setCustomMessage('Test confirmation message');
    playground.dialogs.openConfirmDialog();

    var dialog = new Modals.ConfirmDialog();
    expect(dialog.isOpen()).toBeTruthy();
    expect(dialog.getHeaderText()).toBe('Question');
    expect(dialog.getMessageText()).toBe('Test confirmation message');
    dialog.confirm();
    expect(dialog.isOpen()).toBeFalsy();
  });
});