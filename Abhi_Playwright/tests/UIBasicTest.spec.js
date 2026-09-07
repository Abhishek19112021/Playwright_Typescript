const { test, expect } = require('./fixtures');
test(' App login', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('request',request => console.log(request.url()));
   page.on('response',response => console.log(response.url(), response.status()));
   //page.route('**/*.js', route => route.abort());
    const UserName= page.locator('#username');
    const signIn =page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await UserName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    const errorLocator = page.locator('text=Incorrect');
    console.log(await errorLocator.textContent());
    await expect(errorLocator).toContainText("Incorrect");
});