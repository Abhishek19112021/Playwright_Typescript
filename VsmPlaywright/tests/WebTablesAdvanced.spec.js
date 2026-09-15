   const {test,expect} = require('@playwright/test');
   test(" findingrow",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr').filter({hasText:'Samsung Galaxy Tab S9'});
    const column = table.locator('tbody tr td:nth-child(2)').filter({hasText: 'Accessories'});
    await expect(row).toHaveCount(1);
    await expect(column).toHaveCount(1);
});

test(" filteringwithmultiplevalues",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
       const {test,expect} = require('@playwright/test');
   test(" findingrow",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr').filter({hasText:'Samsung Galaxy Tab S9'});
    const column = table.locator('tbody tr td:nth-child(2)').filter({hasText: 'Accessories'});
    await expect(row).toHaveCount(1);
    await expect(column).toHaveCount(1);
});veCount(1);
});
test(" specificCell",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr').filter({
        has: table.locator('tbody tr td').filter({hasText: 'AirPods Pro'})
    });
});
test("cellValues",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr');
    //const cell= table.locator('td');
    console.log(await row.nth(0).textContent());

});
test("editCell",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr').filter({hasText:'AirPods Pro'});
    await row.getByRole('button',{name:'Edit'}).click();
    await page.pause()
});
test("DelteCell",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const row = table.locator('tbody tr').filter({hasText:'AirPods Pro'});
    await row.getByRole('button',{name:'Delete'}).click();
    await expect(table.locator('tbody tr').filter({hasText:'AirPods Pro'})).toHaveCount(0);
});

test("Sorting",async({page})=>
{
    await page.goto("https://qaplayground.com/ui-practice/tables");
    const table = page.locator('//table[@aria-label="Shopping products — all-in-one"]');
    const values = await table.locator('tbody tr td:nth-child(3)').allTextContents();
     console.log(values);
    await page.getByRole('columnheader',{name: /Price/}).click(); 
    await page.getByRole('columnheader',{name: /Price/}).click();  
    const values1 = await table.locator('tbody tr td:nth-child(3)').allTextContents();
    console.log(values1);
  //  const row = table.locator('tbody tr').filter({hasText:'AirPods Pro'});
   // await row.getByRole('button',{name:'Delete'}).click();
   // await expect(table.locator('tbody tr').filter({hasText:'AirPods Pro'})).toHaveCount(0);
});



