const ExcelJS = require('exceljs');
const fs = require('fs');

async function writeExcelFile(sheetName, searchValue, replacedValue, change = {}, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const output = findCell(worksheet, searchValue);
  if (output.row === -1 || output.column === -1) {
    throw new Error(`Value "${searchValue}" not found in sheet`);
  }
  const rowIndex = output.row + (change && change.rowchange ? change.rowchange : 0);
  const colIndex = output.column + (change && change.columnchange ? change.columnchange : 0);
  const cell = worksheet.getRow(rowIndex).getCell(colIndex);
  cell.value = replacedValue;
  await workbook.xlsx.writeFile(filePath);
  return { rowIndex, colIndex, value: cell.value };
}

function findCell(worksheet, searchValue) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      let val = null;
      if (cell && cell.value !== undefined && cell.value !== null) {
        if (typeof cell.value === 'object' && cell.value.richText) {
          val = cell.value.richText.map(r => r.text).join('');
        } else if (typeof cell.value === 'object' && cell.value.text) {
          val = cell.value.text;
        } else {
          val = String(cell.value);
        }
        val = val.trim();
      }
      if (val === String(searchValue)) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

async function readCellFromFile(filePath, sheetName, rowIndex, colIndex) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const cell = worksheet.getRow(rowIndex).getCell(colIndex);
  if (!cell) return null;
  if (typeof cell.value === 'object' && cell.value.richText) return cell.value.richText.map(r => r.text).join('');
  if (typeof cell.value === 'object' && cell.value.text) return cell.value.text;
  return String(cell.value);
}
// prefer compiled TypeScript when available
try {
  module.exports = require('../../dist/tests/utils/excelUtils');
} catch (e) {
  module.exports = { writeExcelFile, findCell, readCellFromFile };
}
