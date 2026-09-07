const { test, expect } = require ('@playwright/test');
test('Login', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    let text = await page.locator("(//p)[1]").textContent();
    await page.locator("//input[@id='username']").fill(text.split(" ")[2]);
    await page.locator("//input[@id='password']").fill(text.split(" ")[5].slice(0,-1));
    await expect(page.locator("//input[@value='admin']")).toBeChecked();
    await page.locator("//input[@type='checkbox']").click({timeout:10000});
    await page.locator("//input[@type='submit']").click();
    await expect(page.locator("//h1[text()='Shop Name']")).toBeVisible();
    await page.pause();
});
