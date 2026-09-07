const { test, expect } = require ('@playwright/test');
test('Login', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('//input[@value="Show"]').click();
    await expect(page.locator('//input[@id="displayed-text"]')).toBeVisible();
});
