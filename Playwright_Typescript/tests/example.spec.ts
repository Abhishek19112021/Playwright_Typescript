import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  //const text:string = await page.locator('//h3[text()="Playwright Test"]').textContent()
  const text2: string | null = await page.locator('//h3[text()="Playwright Test"]').textContent();
  console.log(text2);
  await expect(page).toHaveTitle(/Playwright/);
});