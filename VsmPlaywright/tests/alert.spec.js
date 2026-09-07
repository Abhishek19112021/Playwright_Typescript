import { test, expect } from '@playwright/test';
test('handle alert', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  // Register listener BEFORE triggering the alert
  page.once('dialog', async dialog => {
    console.log(dialog.message()); // Logs alert text
    await dialog.accept(); // Accepts the alert
  });
  await page.locator('//input[@id="confirmbtn"]').click();
  // Trigger alert
  await page.evaluate(() => alert('rahulshettyacademy.com says'));
 await page.locator("//input[@value='radio1']").click();
});
