import { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
  testDir: path.join(__dirname, 'tests'),
  globalSetup: require.resolve('./tests/global-setup'),
  globalTeardown: require.resolve('./tests/global-teardown'),
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    // collect traces on first retry to help debugging
    trace: 'on-first-retry',
    // allow using a pre-saved storage state (set by global-setup)
    storageState: process.env.TEST_STORAGE_STATE || undefined,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [ ['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }], ['json', { outputFile: 'test-results/results.json' }] ],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  outputDir: 'test-results/',
};

export default config;
