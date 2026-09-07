const { exec } = require("child_process")

const { defineParameterType, When, Given,Then } = require("@cucumber/cucumber")
const path = require("path")
let poManager: any
const playwright = require('@playwright/test');
import { test, Locator,Page,expect } from '@playwright/test';
 const {POManager} = require('../../pageobjects/POManager');
const assert = require("assert")
const binDir = path.resolve(__dirname, "../../bin")
console.log(binDir)

type CucumberWorld = {
  stdout?: string;
  orderId?: string;
  page?: Page;
  dashboardPage?: any;
  cartPage?: any;
  [key: string]: any;
};

defineParameterType({
  name: "command", 
  regexp: /`(.+)`/,
  transformer: (cmd: string) => cmd,
})

When("I run {string}", function (this: CucumberWorld, string: string) {
  console.log(string)
  this.stdout = string;
  
  })

  Then('Verify order is present in the OrderHistory', async function (this: CucumberWorld) {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   const orderId = this.orderId;
   if (!orderId) {
     throw new Error("Order ID is not available");
   }
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });

  When('Enter valid details and Place the Order', async function (this: CucumberWorld) {
    // Write code here that turns the phrase above into concrete actions
    await this.cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(this.orderId);
  });

  Then('Verify {string} is displayed in the Cart', async function (this: CucumberWorld, productName: string) {
    // Write code here that turns the phrase above into concrete actions
    this.cartPage = poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
  });

  When('Add {string} to Cart', async function (this: CucumberWorld, productName: string) {
    // Write code here that turns the phrase above into concrete actions
     this.dashboardPage = poManager.getDashboardPage();
     await this.dashboardPage.searchProductAddCart(productName);
     await this.dashboardPage.navigateToCart();
  });

  Given('a login to Ecommerce application with {string} and {string}', {timeout: 100 * 1000}, async function (this: CucumberWorld, username: string, password: string) {

       poManager = new POManager(this.page);
    //js file- Login js, DashboardPage
     const products = this.page?.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
   
    });



Then("the stdout should contain {string}", function (this: CucumberWorld, string: string) {
  assert.equal(this.stdout, string)
})
      Given(/^a table step$/, function (this: CucumberWorld, table: any) {
        const expected = [
          ['Apricot', '5'],
          ['Brocolli', '2'],
          ['Cucumber', '10']
        ]
        assert.deepEqual(table.rows(), expected)
      })


      Given('a login to Ecommerce2 application with {string} and {string}', {timeout: 100 * 1000}, async function (this: CucumberWorld, username: string, password: string) {
        
        // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
          const page = this.page;
          if (!page) {
            throw new Error("Playwright page is not available");
          }
          const userName = page.locator('#username');
          const signIn = page.locator("#signInBtn");
          const cardTitles = page.locator(".card-body a");
          await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
          console.log(await page.title());
          //css 
         await userName.fill("rahulshetty");
         await page.locator("[type='password']").fill("learning");
         await signIn.click();   
        });


        Then('Verify Error message is displayed', async function (this: CucumberWorld) {
          const page = this.page;
          if (!page) {
            throw new Error("Playwright page is not available");
          }
          await expect(page.locator("[style*='block']")).toContainText('Incorrect');

        })
