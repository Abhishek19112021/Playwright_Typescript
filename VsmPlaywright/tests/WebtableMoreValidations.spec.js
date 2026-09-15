   const {test,expect} = require('@playwright/test');
   test(" More validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const table = page.locator('(//table[@id="product"])[2]');
    const headers = table.locator('//thead//th');
    console.log(await headers.allTextContents());
});

   test("findapersonsdata",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const table = page.locator('(//table[@id="product"])[2]');
    const row = table.locator('tr',{hasText:'Alex'});
    console.log(await row.innerText());
});

   test("findcity",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const table = page.locator('(//table[@id="product"])[2]');
    const row = table.locator('tr',{hasText:'Raymond'});
    const city = await row.locator('td').nth(2).innerText();
    console.log(city);
});

  test.only("total",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const table = page.locator('(//table[@id="product"])[2]');
    const amounts = table.locator('tbody tr td:nth-child(4)');
    let amount = 0 ;
    const count = await amounts.count();

    for(let i=0; i<count; i++){
        const value = await amounts.nth(i).innerText();
        amount = amount+Number(value);
    }
    console.log("Amount", amount);
});