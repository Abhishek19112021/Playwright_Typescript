import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('abcd@abhi.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Abc@987654321');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button', { name: 'Buy Now❯' }).click();
  await page.getByRole('textbox', { name: 'Select Country' }).click();
  await page.getByRole('textbox', { name: 'Select Country' }).fill('ind');
  await page.getByRole('button', { name: ' India' }).click();
  await page.getByText('Place Order').click();
  await page.getByRole('button', { name: 'Sign Out' }).click(); 
});