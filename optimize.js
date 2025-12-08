import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const originalsDir = path.join(root, "ki-blog-bilder/originale");
const optimizedDir = path.join(root, "ki-blog-bilder/web-angepasst");
const publicImagesDir = path.join(root, "public/images");
const articlesDir = path.join(root, "content/articles");

if (!fs.existsSync(optimizedDir)) fs.mkdirSync(optimizedDir);
if (!fs.existsSync(publicImagesDir)) fs.mkdirSync(publicImagesDir);

// Alle Originalbilder durchgehen
fs.readdirSync(originalsDir).forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  const allowed = [".png", ".jpg", ".jpeg"];

  if (!allowed.includes(ext)) return;

  const slug = path.basename(file, ext);
  const articlePath = path.join(articlesDir, `${slug}.md`);

  // Prüfen, ob Artikel existiert
  if (!fs.existsSync(articlePath)) {
    console.log(`⚠️  Kein Artikel für Bild gefunden: ${file}`);
    return;
  }

  console.log(`✨ Verarbeite Hero-Bild für Artikel: ${slug}`);

  const inputPath = path.join(originalsDir, file);
  const outputFilename = `${slug}.webp`;
  const outputPath = path.join(optimizedDir, outputFilename);
  const publicPath = path.join(publicImagesDir, outputFilename);

  // Bild optimieren
  await sharp(inputPath)
    .resize({ width: 1920 })
    .webp({ quality: 80 })
    .toFile(outputPath);

  // Bild nach public/images kopieren
  fs.copyFileSync(outputPath, publicPath);

  console.log(`✅ Hero erzeugt: /public/images/${outputFilename}`);
});

console.log("🎉 Fertig! Alle passenden Hero-Bilder wurden optimiert und kopiert.");