const base = require('@playwright/test');
const tempFile = require('./utils/tempFile');
const logger = require('./utils/logger');

const test = base.test.extend({
  logger: async ({}, use) => { await use(logger); },
  tempFile: async ({}, use) => { await use(tempFile); }
});

module.exports = { test, expect: base.expect };
