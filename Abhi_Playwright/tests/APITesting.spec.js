const base = require('@playwright/test');
const { test, expect } = require('./fixtures');
const { request } = base;
let token;
const email = "abcd@abhi.com";
const productName = 'ZARA COAT 3';
test.beforeAll(async ({ request }) => {
  // Perform API login once before all tests
  const loginResponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: { userEmail: email,userPassword: "Abc@987654321" }
  });
  const loginData = await loginResponse.json();
  token = loginData.token;
});
test(' UI order flow', async ({ page }) => {
  // Inject token before page loads
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if (await products.nth(i).locator("b").textContent() === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }}
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.locator('.ta-backdrop').waitFor({ state: 'hidden', timeout: 10000 });
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbodytr");
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
}
});