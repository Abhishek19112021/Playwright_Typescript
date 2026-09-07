const fs = require('fs');
const os = require('os');
const path = require('path');

const logDir = path.join(process.cwd(), 'test-logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
const logFile = path.join(logDir, `test-${Date.now()}.log`);

function _write(level, ...args) {
  const msg = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${args.map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ')}\n`;
  try { fs.appendFileSync(logFile, msg); } catch (e) { /* ignore */ }
  // also print to stdout for CI
  console.log(msg.trim());
}

module.exports = {
  info: (...args) => _write('info', ...args),
  warn: (...args) => _write('warn', ...args),
  error: (...args) => _write('error', ...args),
  path: () => logFile,
};
