const { test, expect } = require('@playwright/test');

async function findProduct(page, productName, totalPages = 5) {
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const rows = table.locator('tbody tr');

    for (let index = 0; index < await rows.count(); index++) {
      const row = rows.nth(index);
      if (await row.filter({ hasText: productName }).count() > 0) {
        return row;
      }
    }

    if (pageNumber === totalPages) {
      throw new Error(`Product not found: ${productName}`);
    }

    await page.locator("(//button[@aria-label='Next page'])[1]").click();
  }
}

async function findProductWithLoop(page, productName, totalPages = 5) {
  return findProduct(page, productName, totalPages);
}

test('pagination', async ({ page }) => {
  await page.goto('https://qaplayground.com/ui-practice/tables');

  const section = page.locator("//section[@data-testid='section-shopping-products']");
  await section.getByRole('button', { name: '3' }).click();

  const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
  const row = table
    .locator('tbody tr')
    .filter({ hasText: 'Samsung Galaxy Tab S9' })
    .filter({ hasText: 'Tablets' });

  await expect(row).toHaveCount(1);
});

test('find product and verify price', async ({ page }) => {
  await page.goto('https://qaplayground.com/ui-practice/tables');

  const row = await findProduct(page, 'LG UltraFine Monitor');
  await expect(row).toContainText('$699');
});

test('find product with for-loop pagination', async ({ page }) => {
  await page.goto('https://qaplayground.com/ui-practice/tables');

  const row = await findProductWithLoop(page, 'LG UltraFine Monitor');
  await expect(row).toContainText('$699');
});
