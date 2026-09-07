const ExcelJS = require('exceljs');
// Create a new workbook
let output;
async function writeExcel(sheetno, searchValue, replacedValue,change, filePath) {
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile(filePath);
const worksheet = workbook.getWorksheet(sheetno); // Get the first worksheet
readExcel(worksheet, searchValue);
const output = await readExcel(worksheet, searchValue, change);
        const cell = await worksheet.getCell(output.row,output.column+change.columnchange); // Get the cell at row 3, column 2
        cell.value = replacedValue; // Set the value of the cell
        await workbook.xlsx.writeFile(filePath); // Save the changes to the file
        console.log(`Cell value updated to: ${cell.value}`); // Print the updated value of the cell
}
async function readExcel(worksheet,searchValue) {
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
writeExcel('Sheet1','Banana',500,{rowchange:0,columnchange:2} , "C:/Users/HP/Downloads/download.xlsx");