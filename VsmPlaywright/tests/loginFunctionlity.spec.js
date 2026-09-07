const { test, expect } = require ('@playwright/test');
test('has title', async ({ page }) => {
    const url = 'https://rahulshettyacademy.com/client/';
    await page.goto(url);
    await expect((page).locator('//a[text()="Register"]')).toBeVisible();
    await page.getByPlaceholder('email@example.com').type('abcd@abhi.com');
    await page.locator('//input[@id="userPassword"]').fill('Abc@987654321');
    await page.locator('#login').click();
    const productText = await page.locator('//b[text()="ADIDAS ORIGINAL"]').textContent();
    console.log(productText);
    await page.locator('(//button[@class="btn btn-custom"])[4]').click();
    await expect((page).locator('//a[text()="Register"]')).toBeVisible();
});
