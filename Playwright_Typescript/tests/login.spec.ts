import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  const text :string = await page.locator('(//p)[1]').innerText();
  const userName : string = text.split(" ")[2]
  const password : string = text.split(" ")[6]
  const enhancedPassword = password.slice(0,-1);
  const userNameTextbox = page.locator('//input[@id="username"]');
  await userNameTextbox.fill(userName);

});