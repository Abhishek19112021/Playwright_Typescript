const { test, expect } = require ('@playwright/test');
test('Login', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const scrollPosition = await page.evaluate(()=> window.scrollY);
    expect(scrollPosition).toBe(0);
    await page.evaluate(()=> window.scrollTo(0,700));
    await page.locator('//div[@class="tableFixHead"]').hover();
    await page.mouse.wheel(0,500);
    page.pause();
});
