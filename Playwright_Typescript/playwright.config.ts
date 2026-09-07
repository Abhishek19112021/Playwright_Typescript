import { defineConfig, devices } from '@playwright/test';

declare const process: {
  env: Record<string, string | undefined>;
};
export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    fullyParallel: true,
    retries:  2,
    workers: 2,
    reporter: 'html',
    use: {
        trace: 'on',
        screenshot: 'on',
        video: 'on',
        headless: false,
        actionTimeout: 5 *1000,
        navigationTimeout: 10000,
        viewport: {width: 500 , height:500 }
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        }
    ]
    });