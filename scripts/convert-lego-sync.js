const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const inputPath = path.join(root, 'ki-blog-bilder', 'originale', 'lego-classic-box.png');
const outputPath = path.join(root, 'public', 'images', 'lego-classic-box.webp');

async function convert() {
  try {
    console.log('🔄 Converting lego-classic-box.png to WebP...');
    console.log('Input:', inputPath);
    console.log('Output:', outputPath);
    console.log('Input exists:', fs.existsSync(inputPath));

    if (!fs.existsSync(inputPath)) {
      console.error('❌ Error: Input file not found:', inputPath);
      process.exit(1);
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath)
      .resize({ width: 300, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log('✅ Success! WebP file created:', outputPath);
    console.log('📦 File size:', (stats.size / 1024).toFixed(2), 'KB');
    console.log('✨ Ready to use in AffiliateProductBox component!');
    console.log('Output exists:', fs.existsSync(outputPath));
  } catch (error) {
    console.error('❌ Error converting image:', error.message);
    process.exit(1);
  }
}

convert();

