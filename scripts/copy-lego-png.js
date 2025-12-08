const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../ki-blog-bilder/originale/lego-classic-box.png');
const output = path.join(__dirname, '../public/images/lego-classic-box.png');

console.log('Copying lego-classic-box.png...');
console.log('From:', input);
console.log('To:', output);
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

try {
  fs.copyFileSync(input, output);
  console.log('SUCCESS! File copied:', output);
  console.log('Output exists:', fs.existsSync(output));
  const stats = fs.statSync(output);
  console.log('File size:', (stats.size / 1024).toFixed(2), 'KB');
} catch (error) {
  console.error('ERROR:', error.message);
  process.exit(1);
}

