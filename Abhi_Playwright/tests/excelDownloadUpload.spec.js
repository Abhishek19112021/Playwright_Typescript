const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');
// Create a new workbook
let output;
async function writeExcel(sheetno, searchValue, replacedValue,change, filePath) {
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet(sheetno); // Get the first worksheet
readExcel(worksheet, searchValue);
const output = readExcel(worksheet, searchValue, change);
        const cell =  worksheet.getCell(output.row,output.column+change.columnchange); // Get the cell at row 3, column 2
        cell.value = replacedValue; // Set the value of the cell
        await workbook.xlsx.writeFile(filePath); // Save the changes to the file
        console.log(`Cell value updated to: ${cell.value}`); // Print the updated value of the cell
}
 function readExcel(worksheet,searchValue, change) {
      output = {row:-1, column:-1};
worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if(cell.value === searchValue) {
                output.row = rowNumber;
                output.column = colNumber;  
            }
        });
    });
    return output;
    // change the price of banana to 500
}
 test('Upload', async({page}) => {
    const searchKey = 'Banana';
    const searchValue = '500';
 
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#downloadButton').click();
    await downloadPromise;
    await writeExcel('Sheet1',searchKey,searchValue,{rowchange:0,columnchange:2},"C:/Users/HP/Downloads/download.xlsx");
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:/Users/HP/Downloads/download.xlsx');
    const textLocator = page.getByText(searchKey);
    const desiredValue = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredValue.locator('#cell-4-undefined')).toContainText(searchValue);
 
 
 });
