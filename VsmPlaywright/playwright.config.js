// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries :1,
  workers: process.env.CI ? 1 : undefined,
    /* Maximum time one test can run for. */
  timeout: 60*1000,
  expect: {
    timeout: 3 * 1000
  },
  fullyParallel : true,
  forbidOnly : !!process.env.CI,
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace : 'on',
    browserName : 'chromium',
    headless : false,
    video: 'retain-on-failure',
    screenshot : 'on',
    actionTimeout: 5000,
    navigationTimeout: 10000,
    viewport: {width: 1920 , height:1080}
  },
};

module.exports = config;
