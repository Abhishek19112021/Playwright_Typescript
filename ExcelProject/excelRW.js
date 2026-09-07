const ExcelJS = require('exceljs');
// Create a new workbook
async function excelTest() {
let output = {row:-1, column:-1};
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.readFile("C:/Users/HP/Downloads/download.xlsx");
const worksheet = workbook.getWorksheet('Sheet1'); // Get the first worksheet
readExcel(worksheet);
worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === "Bpple") {
                output.row = rowNumber;
                output.column = colNumber;   
            }
        });
    });

        const cell = await worksheet.getCell(output.row,output.column); // Get the cell at row 3, column 2
        cell.value = "apple"; // Set the value of the cell
        await workbook.xlsx.writeFile("C:/Users/HP/Downloads/download.xlsx"); // Save the changes to the file
        console.log(`Cell value updated to: ${cell.value}`); // Print the updated value of the cell
}
excelTest();