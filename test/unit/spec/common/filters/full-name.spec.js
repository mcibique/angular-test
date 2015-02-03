'use strict';

describe('Full name filter', function () {
  var fullNameFilter;

  beforeEach(module('test'));
  beforeEach(inject(function ($filter) {
    fullNameFilter = $filter('fullName');
  }));

  it ('should be defined', function () {
    expect(fullNameFilter).toBeDefined();
  });

  it ('should format user with fistName and lastName', function () {
    var formatted = fullNameFilter({
      firstName: 'Test',
      lastName: 'User'
    });
    expect(formatted).toBe('Test User');
  });

  it ('should format user without lastName', function () {
    var formatted = fullNameFilter({
      firstName: 'Test'
    });
    expect(formatted).toBe('Test');
  });

  it ('should format user without firstName', function () {
    var formatted = fullNameFilter({
      lastName: 'User'
    });
    expect(formatted).toBe('User');
  });

  it ('should format empty user', function () {
    var formatted = fullNameFilter({});
    expect(formatted).toBe('');
  });

  it ('should format null', function () {
    var formatted = fullNameFilter(null);
    expect(formatted).toBe('');
  });
});