import { test, expect } from '@playwright/test'

test.describe('MarketOne commerce journey', () => {
  test('searches and adds a product to cart', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Search products, brands and more').fill('keyboard')
    await expect(page.getByRole('heading', { name: 'Mechanical keyboard' })).toBeVisible()
    await page.getByRole('button', { name: /Add to cart/ }).click()
    await expect(page.getByRole('button', { name: /1 Cart/ })).toBeVisible()
    await page.getByRole('button', { name: /1 Cart/ }).click()
    await expect(page.getByRole('heading', { name: /Your cart/ })).toBeVisible()
  })

  test('switches to the banking application', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Cedar Bank' }).click()
    await expect(page.getByRole('heading', { name: 'Good morning, Jay.' })).toBeVisible()
    await page.getByRole('button', { name: /Send money/ }).click()
    await expect(page.getByRole('status')).toContainText('Send money')
  })
})
