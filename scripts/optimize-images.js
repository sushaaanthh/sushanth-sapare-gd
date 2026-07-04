import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');

// Rule definitions for longest side
function getMaxLongestSide(filePath) {
  const normalized = filePath.replace(/\\/g, '/').toLowerCase();
  if (normalized.includes('/hero/') || normalized.includes('/hero')) return 1400;
  if (normalized.includes('/publicity/') || normalized.includes('/publicity')) return 1400;
  if (normalized.includes('/fan-arts/') || normalized.includes('/fan-arts')) return 1400;
  if (normalized.includes('/social-campaigns/') || normalized.includes('/social-campaigns')) return 1200;
  if (normalized.includes('/about/') || normalized.includes('/about')) return 1000;
  if (normalized.includes('/icons/') || normalized.includes('/icons')) return 256;
  return null;
}

function formatBytes(bytes) {
  if (bytes < 0) return '-' + formatBytes(-bytes);
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function traverseDir(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await traverseDir(fullPath)));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImages() {
  console.log(`Scanning ${publicDir} for images...\n`);
  
  if (!fs.existsSync(publicDir)) {
    console.error(`Error: Directory ${publicDir} does not exist.`);
    process.exit(1);
  }

  const imageFiles = await traverseDir(publicDir);

  let processedCount = 0;
  let skippedCount = 0;
  let spaceSaved = 0;

  for (const filePath of imageFiles) {
    const ext = path.extname(filePath);
    const webpPath = filePath.slice(0, -ext.length) + '.webp';
    const fileNameWebp = path.basename(webpPath);

    if (fs.existsSync(webpPath)) {
      skippedCount++;
      continue;
    }

    try {
      const origStat = await fs.promises.stat(filePath);
      const origSize = origStat.size;

      const maxSide = getMaxLongestSide(filePath);
      let pipeline = sharp(filePath);

      if (maxSide) {
        pipeline = pipeline.resize({
          width: maxSide,
          height: maxSide,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      await pipeline
        .webp({ quality: 82 })
        .toFile(webpPath);

      const newStat = await fs.promises.stat(webpPath);
      const newSize = newStat.size;

      processedCount++;
      spaceSaved += (origSize - newSize);

      console.log(`✔ ${fileNameWebp}`);
    } catch (err) {
      console.error(`✖ Failed to process ${path.basename(filePath)}: ${err.message}`);
    }
  }

  console.log('\n-----------------------------');
  console.log(`Total images processed: ${processedCount}`);
  console.log(`Total images skipped: ${skippedCount}`);
  console.log(`Approximate space saved: ${formatBytes(spaceSaved)}`);
  console.log('-----------------------------');
}

optimizeImages().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
