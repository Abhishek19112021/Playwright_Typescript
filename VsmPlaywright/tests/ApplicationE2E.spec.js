const{test , expect} = require("@playwright/test");

test("E2Etest", async({page})=>{

    const url = "https://rahulshettyacademy.com/client";
    const email = "abcd@abhi.com";
    const password = "Abc@987654321"
    const productName = "ZARA COAT 3";
    const products = await page.locator(".card-body");
    await page.goto(url);
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("//div[@class='card-body']//b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const iterations = await page.locator(".card-body").count();
    console.log(iterations);
    for(let i = 0; i<iterations; ++i){
    if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }
    await expect(page.locator("//div[@aria-label='Product Added To Cart']")).toBeVisible();
    await page.locator("//button[@routerlink='/dashboard/cart']").click();


    
});