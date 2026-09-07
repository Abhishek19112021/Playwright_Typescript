import { test, expect } from '@playwright/test';
test('element screenShot', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.locator('#dropdown-class-example').screenshot({
    path:"screenshots/test.png"
  });
  await page.pause();
});
