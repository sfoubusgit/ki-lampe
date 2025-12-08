const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'ki-blog-bilder', 'originale', 'lego-classic-box.png');
const output = path.join(__dirname, '..', 'public', 'images', 'lego-classic-box.webp');

console.log('Input:', input);
console.log('Output:', output);
console.log('Input exists:', fs.existsSync(input));

if (!fs.existsSync(input)) {
  console.error('ERROR: Input file not found!');
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(output);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  try {
    await sharp(input)
      .resize({ width: 300, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output);
    
    const stats = fs.statSync(output);
    console.log('SUCCESS! File created:', output);
    console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');
    console.log('File exists check:', fs.existsSync(output));
  } catch (error) {
    console.error('ERROR:', error.message);
    process.exit(1);
  }
})();

