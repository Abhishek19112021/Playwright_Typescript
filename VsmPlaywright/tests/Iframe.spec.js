import { test, expect } from '@playwright/test';
test('handle alert', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const frame = page.frameLocator('#courses-iframe');
  await frame.locator('//a[@href="https://courses.rahulshettyacademy.com/sign_in"]').click();
  await page.locator('//input[@id="checkBoxOption1"]').click();
  await page.pause();
});
