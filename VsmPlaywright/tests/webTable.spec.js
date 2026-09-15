   const {test,expect} = require('@playwright/test');
   test(" More validations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  const table = page.locator('//table[@name="courses"]');
  const rows = page.locator('//table[@name="courses"]//tr');
  const data = page.locator('//table[@name="courses"]//tr/td');
  //console.log(await rows.count());
const rowCount = await rows.count();
for( let i= 0;i<rowCount ; i++){
const cells = rows.nth(i).locator('td');
console.log(await cells.allTextContents());
}

});