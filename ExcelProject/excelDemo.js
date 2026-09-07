    const ExcelJS = require('exceljs');

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    async function readExcelFile() {
    await workbook.xlsx.readFile("C:/Users/HP/Downloads/download.xlsx");


    const worksheet = workbook.getWorksheet('Sheet1'); // Get the first worksheet
    worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                console.log(cell.value); // Print the value of each cell
            });
        });
    }

    readExcelFile()