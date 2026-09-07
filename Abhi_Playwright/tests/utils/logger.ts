import * as fs from 'fs';
import * as path from 'path';

// Structured JSON logger with simple rotation by size
const LOG_DIR = path.join(process.cwd(), 'test-logs');
const MAX_BYTES = 5 * 1024 * 1024; // 5MB
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

function currentLogFile() {
  const file = path.join(LOG_DIR, 'test-latest.log');
  try {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      if (stats.size >= MAX_BYTES) {
        const rotated = path.join(LOG_DIR, `test-${Date.now()}.log`);
        fs.renameSync(file, rotated);
      }
    }
  } catch (e) {
    // ignore rotation errors
  }
  return file;
}

function writeJson(level: string, payload: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    ...payload,
  };
  const file = currentLogFile();
  try {
    fs.appendFileSync(file, JSON.stringify(logEntry) + '\n');
  } catch (e) {
    // best effort
  }
  // also log to console for visibility in CI
  console.log(JSON.stringify(logEntry));
}

export const info = (msg: string, meta?: any) => writeJson('info', { msg, meta });
export const warn = (msg: string, meta?: any) => writeJson('warn', { msg, meta });
export const error = (msg: string, meta?: any) => writeJson('error', { msg, meta });
export const pathLog = () => currentLogFile();
