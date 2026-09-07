const { test, expect } = require ('@playwright/test');
test('SwitchTabs', async ({context, page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('//button[text()="Open Window"]')
    ]);
    await newPage.waitForLoadState();
   const text =  await newPage.locator("//span[text()='You']").textContent();
   console.log(text);
   await page.bringToFront();
   await page.locator('//input[@value="radio1"]').click();
   const text2 =await newPage.locator("//span[text()='Singapore']").textContent();
   console.log(text2);
   await page.bringToFront();
   await page.locator('//input[@value="radio2"]').click();
   await page.pause();
});
