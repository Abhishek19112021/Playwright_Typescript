import ExcelJS, { Worksheet } from 'exceljs';

export async function writeExcelFile(
  sheetName: string,
  searchValue: any,
  replacedValue: any,
  change: { rowchange?: number; columnchange?: number } = {},
  filePath: string,
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  if (!worksheet) {
    throw new Error(`Worksheet "${sheetName}" not found in file: ${filePath}`);
  }
  const output = findCell(worksheet, searchValue);
  if (output.row === -1 || output.column === -1) {
    throw new Error(`Value "${searchValue}" not found in sheet`);
  }
  const rowIndex = output.row + (change.rowchange ?? 0);
  const colIndex = output.column + (change.columnchange ?? 0);
  const cell = worksheet.getRow(rowIndex).getCell(colIndex);
  cell.value = replacedValue;
  await workbook.xlsx.writeFile(filePath);
  return { rowIndex, colIndex, value: cell.value };
}

export function findCell(worksheet: Worksheet, searchValue: any) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      let val: string | null = null;
      if (cell && cell.value !== undefined && cell.value !== null) {
        if (typeof cell.value === 'object' && (cell.value as any).richText) {
          val = (cell.value as any).richText.map((r: any) => r.text).join('');
        } else if (typeof cell.value === 'object' && (cell.value as any).text) {
          val = (cell.value as any).text;
        } else {
          val = String(cell.value);
        }
        if (val !== null) {
          val = val.trim();
        }
      }
      if (val === String(searchValue)) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

export async function readCellFromFile(filePath: string, sheetName: string, rowIndex: number, colIndex: number) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  if (!worksheet) {
    throw new Error(`Worksheet "${sheetName}" not found in file: ${filePath}`);
  }
  const cell = worksheet.getRow(rowIndex).getCell(colIndex);
  if (!cell) return null;
  if (typeof cell.value === 'object' && (cell.value as any).richText) return (cell.value as any).richText.map((r: any) => r.text).join('');
  if (typeof cell.value === 'object' && (cell.value as any).text) return (cell.value as any).text;
  return String(cell.value);
}
