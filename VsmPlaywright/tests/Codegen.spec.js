const { test, expect } = require('@playwright/test');

test('code', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('abcd@abhi.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Abc@987654321');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: ' Add To Cart' }).nth(1).click();
  await page.getByRole('button', { name: '   Cart' }).click();
  await page.getByRole('button', { name: 'Buy Now❯' }).click();
  const countryInput = page.getByRole('textbox', { name: 'Select Country' });
  await countryInput.click();
  await countryInput.pressSequentially('ind');
  const countryResults = page.locator('section.ta-results');
  await countryResults.waitFor();
  await countryResults.getByRole('button', { name: /India$/ }).click();
  await page.getByText('CVV Code ?').locator('..').getByRole('textbox').fill('123');
  await page.getByText('Name on Card').locator('..').getByRole('textbox').fill('Abhi Tester');
  await page.getByText('Place Order', { exact: true }).click();
  await expect(page.getByText('Order Placed Successfully')).toBeVisible();
  await page.getByText('Orders History Page').click();
  await expect(page.getByText('Your Orders')).toBeVisible();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});