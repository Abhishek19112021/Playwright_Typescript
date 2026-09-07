import * as fs from 'fs';
import * as path from 'path';

export default async function globalTeardown() {
  // Example teardown: remove storage files created in globalSetup
  const storageDir = path.join(process.cwd(), 'test-storage');
  try {
    if (fs.existsSync(storageDir)) {
      const files = fs.readdirSync(storageDir);
      for (const f of files) fs.unlinkSync(path.join(storageDir, f));
      fs.rmdirSync(storageDir);
    }
  } catch (e) {
    // ignore
  }
  // package artifacts if running in CI
  try {
    if (process.env.CI) {
      const pack = path.join(process.cwd(), 'scripts', 'package-artifacts.js');
      if (fs.existsSync(pack)) {
        // run synchronously
        const { execSync } = require('child_process');
        execSync('node scripts/package-artifacts.js', { stdio: 'inherit' });
      }
    }
  } catch (e) {
    // ignore
  }
}
