const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(process.cwd(), 'ki-blog-bilder', 'originale', 'lego-classic-box.png');
const output = path.join(process.cwd(), 'public', 'images', 'lego-classic-box.webp');
const logFile = path.join(process.cwd(), 'convert-log.txt');

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, msg + '\n');
}

log('=== Starting conversion ===');
log('Input: ' + input);
log('Output: ' + output);
log('Input exists: ' + fs.existsSync(input));

if (!fs.existsSync(input)) {
  log('ERROR: Input file not found!');
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  log('Created output directory: ' + outputDir);
}

sharp(input)
  .resize({ width: 300, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(output)
  .then(() => {
    if (fs.existsSync(output)) {
      const stats = fs.statSync(output);
      log('SUCCESS! File created: ' + output);
      log('File size: ' + (stats.size / 1024).toFixed(2) + ' KB');
    } else {
      log('ERROR: File was not created!');
    }
  })
  .catch((error) => {
    log('ERROR: ' + error.message);
    process.exit(1);
  });

