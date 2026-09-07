import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export function createTempFile(prefix = 'download'): string {
  const filePath = path.join(os.tmpdir(), `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}.xlsx`);
  return filePath;
}

export function cleanupTempFile(filePath: string): boolean {
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
