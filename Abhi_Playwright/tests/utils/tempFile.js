const fs = require('fs');
const os = require('os');
const path = require('path');

function createTempFile(prefix = 'download') {
  const filePath = path.join(os.tmpdir(), `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}.xlsx`);
  return filePath;
}

function cleanupTempFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (err) {
    // swallow - caller may log
  }
  return false;
}

module.exports = { createTempFile, cleanupTempFile };
