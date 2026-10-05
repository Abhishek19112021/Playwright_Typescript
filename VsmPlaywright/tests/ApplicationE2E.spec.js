const{test , expect} = require("@playwright/test");

test("E2Etest", async({page})=>{

    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    const email = "abcd@abhi.com";
    const password = "Abc@987654321"
    const productName = "iphone 13 pro";
    const products = await page.locator(".card-body");
    const country = "Bul";
    const selectCountry = ' Bulgaria';
    await page.goto(url);
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("[value='Login']").click();
    //await page.waitForLoadState('networkidle');
    await page.locator("//div[@class='card-body']//b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const iterations = await page.locator(".card-body b").count();
    console.log(iterations);
    for(let i = 0; i<iterations; i++ ){
    if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
       break;
      }
    }
    await expect(page.locator("//div[@aria-label='Product Added To Cart']")).toBeVisible();
    await page.locator("//button[@routerlink='/dashboard/cart']").click();   
    const orderId = await page.locator('//p[@class="itemNumber"]').innerText();
    console.log(orderId);
    await page.locator('//button[text()="Checkout"]').click();
    await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially(country)
    await page.getByRole('button', { name:selectCountry  }).click();
    await page.getByText('Place Order').click();
});