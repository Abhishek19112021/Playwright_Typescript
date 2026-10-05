const {test, expect, request}  = require('@playwright/test');

const loginPayload = { "userEmail": "abcd@abhi.com","userPassword": "Abc@987654321"};

test('API login', async () =>
{
  const apiContext = await request.newContext();
  const loginresponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayload
  });
  expect(loginresponse.ok()).toBeTruthy();
  const loginResponseJson = await loginresponse.json();
  const token = loginResponseJson.token;
  console.log(token);

});
