const { test, expect } = require ('@playwright/test');
test('Login', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('//button[@id="mousehover"]').hover();
    await page.locator('//a[tet()="Top"]').click();
    const scrollPosition = await page.evaluate(()=> window.scrollY);
    expect(scrollPosition).toBe(0);
    await page.evaluate(()=> window.scrollTo(0,1000));
    const scrollPosition1 = await page.evaluate(()=> window.scrollY);
    expect(scrollPosition1).toBe(1000);
});
