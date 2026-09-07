// tests/order.spec.js
const base = require('@playwright/test');
const { test, expect } = require('./fixtures');
const { request } = base;
const loginPayload = { userEmail: 'abcd@abhi.com',  userPassword: 'Abc@987654321' };
const orderPayload = { orders: [{ country: 'cuba', productOrderedId: '6960eae1c941646b7a8b3ed3' }] 
};

let token;
let orderId;
// --- Fixture Setup ---
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  // Login
  const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    { data: loginPayload }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);

  // Create Order
  const orderResponse = await apiContext.post( 'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: orderPayload,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }
  );
  const orderResponseJson = await orderResponse.json();
  console.log(orderResponseJson);
  orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {
}
  )
// --- Test Case ---
test('Place the order', async ({ page }) => {
  // Inject token into localStorage
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  // Navigate to client app
  await page.goto('https://rahulshettyacademy.com/client/');
  await page.pause();
  await page.locator("[routerlink*='myorders']").click();

  // Ensure table rows are present
  await page.locator("tbody").waitFor();
  const rows = page.locator('tbody tr');

for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if(orderId.includes(rowOrderId)) 
{
  await rows.nth(i).locator("button").first().click();
    break;
}
  }

  // Find the row with matching orderId
  const orderIdDetails= await page.locator(".col-text").textContent();
  await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
