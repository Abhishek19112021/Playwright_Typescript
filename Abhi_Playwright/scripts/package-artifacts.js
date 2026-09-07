const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const folders = ['playwright-report', 'test-results', 'test-logs'];
const outDir = path.join(process.cwd(), 'artifacts');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `artifacts-${Date.now()}.zip`);

const output = fs.createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => console.log('Artifacts packaged to', outPath, archive.pointer(), 'bytes'));
archive.on('warning', err => console.warn('Archive warning', err));
archive.on('error', err => { throw err; });

archive.pipe(output);
folders.forEach(folder => {
  const p = path.join(process.cwd(), folder);
  if (fs.existsSync(p)) archive.directory(p, folder);
});

archive.finalize();
