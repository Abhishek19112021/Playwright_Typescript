const { test, expect } = require('./fixtures');
test('security test request intercept', async ({page})=>{
await page.goto("https://rahulshettyacademy.com/client");
const email = "abcd@abhi.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Abc@987654321");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await page.locator("button[routerlink*='myorders']").click();
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
   async(route) => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=648f3c7e0b1d2a001f5e5rt5'}));
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});