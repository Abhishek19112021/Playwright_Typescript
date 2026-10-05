const{test , expect} = require("@playwright/test");
    const Url = "https://rahulshettyacademy.com/client/#/auth/login";
    const userName = "email@example.com";
    const password = "enter your passsword";
    const loginButton = "#login"; 
    const userNameValue = "abcd@abhi.com";
    const passwordValue = "Abc@987654321";

test("E2Etest", async({page})=>{
    await page.goto(Url);
    await page.getByPlaceholder(userName).fill(userNameValue);
    await page.getByPlaceholder(password).fill(passwordValue);
    await page.locator(loginButton).click();
    await expect(page.locator("//label[@class='logo']")).toBeVisible();
    const text = await page.locator("//label[@class='logo']").innerText();
    console.log(text);
    await page.locator("(//button[@class='btn w-10 rounded'])[2]").click();
    await expect(page.locator('//div[@aria-label="Product Added To Cart"]')).toBeVisible();   
    const text2 = await page.locator('//div[@aria-label="Product Added To Cart"]').innerText();
    console.log(text2);
});

test.only("E2Etest1", async({page})=>{
    await page.goto(Url);
    await page.getByPlaceholder(userName).fill(userNameValue);
    await page.getByPlaceholder(password).fill(passwordValue);
    await page.locator(loginButton).click();
    await expect(page.locator("//label[@class='logo']")).toBeVisible();
    const text = await page.locator("//label[@class='logo']").innerText();
    console.log(text);
    await page.locator("(//button[@class='btn w-10 rounded'])[2]").click();
    await expect(page.locator('//div[@aria-label="Product Added To Cart"]')).toBeVisible();   
    const text2 = await page.locator('//div[@aria-label="Product Added To Cart"]').innerText();
    console.log(text2);
});