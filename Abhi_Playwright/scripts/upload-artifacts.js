/* Optional S3 uploader for artifacts.zip - requires AWS credentials in env
   Usage: set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION and S3_BUCKET, then run:
     node scripts/upload-artifacts.js path/to/artifacts.zip
*/
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

async function upload(filePath) {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error('S3_BUCKET not set');
  const region = process.env.AWS_REGION || 'us-east-1';
  const client = new S3Client({ region });
  const body = fs.createReadStream(filePath);
  const key = path.basename(filePath);
  const cmd = new PutObjectCommand({ Bucket: bucket, Key: key, Body: body });
  await client.send(cmd);
  console.log('Uploaded', key, 'to', bucket);
}

function findLatestZip(dir) {
  if (!fs.existsSync(dir)) return null;
  const items = fs.readdirSync(dir).filter(f => f.endsWith('.zip')).map(f => ({ f, t: fs.statSync(path.join(dir, f)).mtime.getTime() }));
  if (!items.length) return null;
  items.sort((a,b)=>b.t-a.t);
  return path.join(dir, items[0].f);
}

if (require.main === module) {
  const p = process.argv[2] || 'artifacts';
  let filePath = p;
  try {
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
      filePath = findLatestZip(p);
      if (!filePath) {
        console.error('No zip artifacts found in', p);
        process.exit(1);
      }
    }
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      process.exit(1);
    }
    upload(filePath).catch(err => { console.error('Upload failed', err); process.exit(2); });
  } catch (err) {
    console.error('Upload error', err);
    process.exit(3);
  }
}
