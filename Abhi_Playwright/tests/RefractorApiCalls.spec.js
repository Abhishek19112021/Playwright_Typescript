const base = require('@playwright/test');
const { test, expect } = require('./fixtures');
const { request } = base;
const {APiUtils} = require('./utils/APiUtils')
const loginPayload = { userEmail: 'abcd@abhi.com',  userPassword: 'Abc@987654321' };
const orderPayload = { orders: [{ country: 'India', productOrderedId: '6960eae1c941646b7a8b3ed3' }] };
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayload);
   response =  await apiUtils.createOrder(orderPayload);
})
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
        globalThis.localStorage.setItem('token', value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});
