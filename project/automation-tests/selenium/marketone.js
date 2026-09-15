import { Builder, By } from 'selenium-webdriver'

const baseUrl = process.env.WEB_URL || 'https://abhishek-academy.vercel.app'
const driver = await new Builder().forBrowser('chrome').build()
try {
  await driver.get(baseUrl)
  await driver.findElement(By.css('input[aria-label="Search products"]')).sendKeys('keyboard')
  const product = await driver.findElement(By.xpath("//*[contains(text(), 'Mechanical keyboard')]")).getText()
  if (product !== 'Mechanical keyboard') throw new Error('Product search did not return the expected product')
  await driver.findElement(By.xpath("//button[contains(., 'Add to cart')]")).click()
  console.log('Selenium smoke test passed: product search and add-to-cart')
} finally { await driver.quit() }
