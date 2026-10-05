import { test, expect } from '@playwright/test';

test('First Test Case', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.locator('input[value="radio1"]').click();
  await page.pause();
});