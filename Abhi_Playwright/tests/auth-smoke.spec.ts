import { test, expect } from '@playwright/test';
import cfg from './config';

test.describe('Auth smoke', () => {
  test('uses saved storageState to access protected page', async ({ page }) => {
    if (!cfg.login.url) {
      test.skip(true, 'No login URL configured');
    }

    // Navigate to the app (will use storageState from playwright.config if present)
    await page.goto(cfg.login.url, { timeout: 30000 });

    if (cfg.login.postLoginSelector) {
      await expect(page.locator(cfg.login.postLoginSelector)).toBeVisible({ timeout: 10000 });
    } else {
      // fallback: expect the page to have loaded
      await expect(page).toHaveURL(/.+/);
    }
  });
});
