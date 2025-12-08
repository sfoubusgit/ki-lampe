const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, '../ki-blog-bilder/originale/lego-classic-box.png');
const outputPath = path.resolve(__dirname, '../public/images/lego-classic-box.webp');

console.log('=== Creating lego-classic-box.webp ===');
console.log('Input:', inputPath);
console.log('Output:', outputPath);
console.log('Input exists:', fs.existsSync(inputPath));

if (!fs.existsSync(inputPath)) {
  console.error('ERROR: Input file not found!');
  process.exit(1);
}

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output directory:', outputDir);
}

// Use synchronous approach with a promise that we wait for
(async () => {
  try {
    console.log('Starting conversion...');
    await sharp(inputPath)
      .resize({ width: 300, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    // Wait a bit to ensure file is written
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      console.log('SUCCESS! File created:', outputPath);
      console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');
      console.log('File exists verification:', fs.existsSync(outputPath));
    } else {
      console.error('ERROR: File was not created!');
      process.exit(1);
    }
  } catch (error) {
    console.error('ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
})();

