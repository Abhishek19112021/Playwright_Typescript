// config.js
// Language: JavaScript
// This is an enterprise-ready Playwright configuration

const { devices } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
// Ensure test storage directory and storageState file exist to avoid ENOENT
try {
  const storageDir = path.join(process.cwd(), 'test-storage');
  const storageFile = path.join(storageDir, 'storageState.json');
  if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });
  if (!fs.existsSync(storageFile)) fs.writeFileSync(storageFile, JSON.stringify({}));
} catch (e) {
  // best-effort; Playwright will surface errors if critical
  // eslint-disable-next-line no-console
  console.warn('Could not ensure test-storage/storageState.json exists:', e && e.message);
}
/**
 * Playwright Test Configuration for Enterprise Level Projects
 */
module.exports = {
  testDir: './tests', // Directory containing test files
  timeout: 60000, // Maximum expectation timeout in ms
  retries: 2, // Retry failed tests to improve CI stability
  workers: process.env.CI ? 4 : undefined, // Parallel workers; optimize based on CI environment
  reporter: [
    ['list'], // Console reporter for local debugging
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
    ['json', { outputFile: 'test-results/results.json' }], // JSON report for dashboard integration
  ],
  use: {
    // run headless in CI, headed locally for debugging
    headless: !!process.env.CI,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // Ignore certificate errors
    video: 'retain-on-failure', // Record videos for failed tests
    screenshot: 'on failure', // Capture screenshots only on failure
    // collect traces on first retry to help debugging
    trace: 'on-first-retry',
    actionTimeout: 30000, // Individual action timeout
   //baseURL: process.env.BASE_URL || 'https://rahulshettyacademy.com', // Set base URL dynamically
   storageState: process.env.TEST_STORAGE_STATE || 'test-storage/storageState.json',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Example for mobile emulation
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },*/
  ],
  // Enterprise defaults
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // Prevent commits with `.only` in CI
  maxFailures: 10, // Stop after 10 failures in CI to save resources,
  
};