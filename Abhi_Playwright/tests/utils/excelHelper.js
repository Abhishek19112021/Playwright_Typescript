// wrapper to re-export the canonical excel utilities
const excelUtils = require('./excelUtils');
module.exports = { writeExcel: excelUtils.writeExcelFile, findCell: excelUtils.findCell, readCellFromFile: excelUtils.readCellFromFile };
