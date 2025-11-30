const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../ki-blog-bilder/originale/lego-classic-box.png');
const outputPath = path.resolve(__dirname, '../public/images/lego-classic-box.webp');

console.log('Converting lego-classic-box.png to WebP...');
console.log('Input:', inputPath);
console.log('Output:', outputPath);

if (!fs.existsSync(inputPath)) {
  console.error('ERROR: Input file not found:', inputPath);
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sharp(inputPath)
  .resize({ width: 300, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(outputPath)
  .then(() => {
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log('SUCCESS! File created:', outputPath);
      console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');
      process.exit(0);
    } else {
      console.error('ERROR: File was not created!');
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('ERROR:', error.message);
    process.exit(1);
  });

