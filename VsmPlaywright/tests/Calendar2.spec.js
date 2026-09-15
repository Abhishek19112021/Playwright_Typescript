const { test, expect } = require("@playwright/test");

test("Calendar validations", async ({ page }) => {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  console.log(formattedDate);

  const year = formattedDate.split("-")[0];
  const unsplittedMonthNumber = formattedDate.split("-")[1]; // e.g. "09", "10", "11"

  let monthNumber;
  if (Number(unsplittedMonthNumber) < 10) {
    // strip leading zero for months Jan–Sep
    monthNumber = unsplittedMonthNumber.replace(/^0/, "");
  } else {
    // keep "10", "11", "12" as-is
    monthNumber = unsplittedMonthNumber;
  }

  const date = formattedDate.split("-")[2];
  const expectedList = [unsplittedMonthNumber, date, year]; // keep padded "09","10","11"

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
  await page.locator(`//abbr[text()='${Number(date)}']`).click();

  const inputs = page.locator(".react-date-picker__inputGroup__input");
  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue().padStart(2, "0");
    expect(value).toEqual(expectedList[i]);
  }
});
