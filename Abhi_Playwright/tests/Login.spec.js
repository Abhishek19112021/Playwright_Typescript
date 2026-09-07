const { test, expect } = require('./fixtures');
test('Login', async({page})=>{
 //const context =  await browser.newContext();
// const page= await context.newPage();
 await page.goto('https://rahulshettyacademy.com/client/');
 await page.locator('//input[@id="userEmail"]').type('abcd@abhi.com');
 await page.locator('//input[@id="userPassword"]').type('Abc@987654321');
 await page.locator('//input[@id="login"]').click();
 const Title =await page.locator('//h3[text()="Automation"]').textContent();
 console.log(Title);
 expect(Title).toContain('Automation');
await page.locator('(//button[@class="btn btn-custom"])[4]').click();
});