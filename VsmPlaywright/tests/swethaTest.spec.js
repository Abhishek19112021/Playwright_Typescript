const{test , expect} = require("@playwright/test");
    const Url = "https://rahulshettyacademy.com/client/#/auth/login";
    const userName = "email@example.com";
    const password = "enter your passsword";
    const loginButton = "#login"; 
    const userNameValue = "abcd@abhi.com";
    const passwordValue = "Abc@987654321";
    const country = "Bul";
    const selectCountry = ' Bulgaria';

test("E2Etest", async({page})=>{
    await page.goto(Url);
    await page.getByPlaceholder(userName).fill(userNameValue);
    await page.getByPlaceholder(password).fill(passwordValue);
    await page.locator(loginButton).click();
    await expect(page.locator("//label[@class='logo']")).toBeVisible();
    const text = await page.locator("//label[@class='logo']").innerText();
    console.log(text);
    await page.locator("(//button[@class='btn w-10 rounded'])[3]").click();
    await expect(page.locator('//div[@aria-label="Product Added To Cart"]')).toBeVisible();   
    const text2 = await page.locator('//div[@aria-label="Product Added To Cart"]').innerText();
    console.log(text2);
    const cartButton = await page.getByRole('button', { name: '   Cart' }).click();
    await expect (page.getByRole('heading', { name: 'ZARA COAT' })).toBeVisible();
    const orderId = await page.locator('//p[@class="itemNumber"]').innerText();
    console.log(orderId);
    await page.locator('(//button[@class="btn btn-primary"])[2]').click();
    //await page.getByRole('textbox', { name: 'Select Country' }).click();
    await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially(country)
    await page.getByRole('button', { name:selectCountry  }).click();
    await page.getByText('Place Order').click();
});