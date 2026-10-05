const {test, expect} = require('@playwright/test')
test('First Test Case', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('input[value="radio1"]').click();
    await page.locator('#checkBoxOption2').check();
    await page.locator('#checkBoxOption2').uncheck();
    await page.pause();



});