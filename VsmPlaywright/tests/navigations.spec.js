const { test, expect } = require('@playwright/test');

test('navigation example', async ({ page }) => {
  // Go to initial page
  await page.goto('https://example.com');
  await page.goto('https://playwright.dev');
  await page.pause();
  await page.goBack();
  await page.pause();
  await page.goForward();
  await page.pause();
  await page.reload();
  await page.pause();
  await expect(page).toHaveTitle(/Playwright/);
});