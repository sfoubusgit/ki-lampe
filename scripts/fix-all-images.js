import fs from "fs";
import path from "path";

const articlesDir = path.join(process.cwd(), "content/articles");
const imagesDir = path.join(process.cwd(), "public/images");

const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".svg"];

// Special mappings for articles where slug doesn't match image name
const SPECIAL_MAPPINGS = {
  "a1111_tutorial_article": "stable_diffusion_a1111_tutorial_hero", // Prefer .jpg over .svg
  "star-wars-und-ki": "star-wars-ki-artikel-foto.webp",
  "psychologie_obi_wan_kenobi": null, // No image exists for this
};

// Preferred image format order (higher priority first)
const PREFERRED_FORMATS = [".jpg", ".jpeg", ".webp", ".png", ".svg"];

// Get all available images
function getAllImages() {
  const images = {};
  if (!fs.existsSync(imagesDir)) {
    return images;
  }
  
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (IMAGE_EXTENSIONS.includes(ext)) {
      const baseName = path.basename(file, ext);
      const imagePath = `/images/${file}`;
      
      // If multiple formats exist for same base name, prefer higher priority format
      if (!images[baseName] || shouldPreferFormat(ext, path.extname(images[baseName]).toLowerCase())) {
        images[baseName] = imagePath;
      }
    }
  }
  return images;
}

// Check if format1 should be preferred over format2
function shouldPreferFormat(format1, format2) {
  const idx1 = PREFERRED_FORMATS.indexOf(format1);
  const idx2 = PREFERRED_FORMATS.indexOf(format2);
  if (idx1 === -1) return false;
  if (idx2 === -1) return true;
  return idx1 < idx2; // Lower index = higher priority
}

// Find best matching image for a slug
function findImageForSlug(slug, availableImages) {
  // Check special mappings first
  if (SPECIAL_MAPPINGS[slug]) {
    const specialBase = SPECIAL_MAPPINGS[slug].replace(/\.[^.]+$/, "");
    // Try preferred formats first
    for (const ext of PREFERRED_FORMATS) {
      const specialImage = availableImages[specialBase];
      if (specialImage && specialImage.endsWith(ext)) {
        return specialImage;
      }
    }
    // Fallback to any format
    const specialImage = availableImages[specialBase];
    if (specialImage) {
      return specialImage;
    }
  }

  // Try exact match
  if (availableImages[slug]) {
    return availableImages[slug];
  }

  // Try with underscores replaced by dashes
  const slugWithDashes = slug.replace(/_/g, "-");
  if (availableImages[slugWithDashes]) {
    return availableImages[slugWithDashes];
  }

  // Try with dashes replaced by underscores
  const slugWithUnderscores = slug.replace(/-/g, "_");
  if (availableImages[slugWithUnderscores]) {
    return availableImages[slugWithUnderscores];
  }

  // Try partial matches (slug contains image name or vice versa)
  for (const [imageName, imagePath] of Object.entries(availableImages)) {
    if (slug.includes(imageName) || imageName.includes(slug)) {
      return imagePath;
    }
  }

  return null;
}

function fixArticleImages() {
  const availableImages = getAllImages();
  console.log(`📸 Gefundene Bilder: ${Object.keys(availableImages).length}`);
  
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".md"));
  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const imagePath = findImageForSlug(slug, availableImages);

    const articlePath = path.join(articlesDir, file);
    let content = fs.readFileSync(articlePath, "utf8");

    const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (!frontmatterMatch) {
      console.log(`⚠️ Kein Frontmatter gefunden: ${file}`);
      continue;
    }

    const frontmatter = frontmatterMatch[1];
    let newFrontmatter;

    if (imagePath) {
      // Remove any existing image field (including malformed ones)
      newFrontmatter = frontmatter
        .replace(/image:\s*["']?[^"'\n]*["']?[^\n]*\n?/g, "")
        .replace(/image:\s*>-\s*\n?[^\n]*\n?/g, "")
        .replace(/\/images\/[^"'\s]+\/images\/[^"'\s]+/g, "")
        .trim();

      // Add the correct image field
      newFrontmatter = `image: "${imagePath}"\n${newFrontmatter}`;
      
      const newContent = content.replace(
        frontmatterMatch[0],
        `---\n${newFrontmatter}\n---`
      );

      fs.writeFileSync(articlePath, newContent, "utf8");
      console.log(`✅ Fix angewendet: ${slug} → ${imagePath}`);
      fixed++;
    } else {
      // Remove malformed image fields but don't add new ones
      if (frontmatter.includes("image:")) {
        newFrontmatter = frontmatter
          .replace(/image:\s*["']?[^"'\n]*["']?[^\n]*\n?/g, "")
          .replace(/image:\s*>-\s*\n?[^\n]*\n?/g, "")
          .replace(/\/images\/[^"'\s]+\/images\/[^"'\s]+/g, "")
          .trim();

        const newContent = content.replace(
          frontmatterMatch[0],
          `---\n${newFrontmatter}\n---`
        );

        fs.writeFileSync(articlePath, newContent, "utf8");
        console.log(`🧹 Bereinigt (kein Bild): ${slug}`);
        fixed++;
      } else {
        console.log(`❌ Kein Bild gefunden für: ${slug}`);
        skipped++;
      }
    }
  }

  console.log(`\n📊 Zusammenfassung:`);
  console.log(`✅ Fixiert: ${fixed}`);
  console.log(`❌ Übersprungen: ${skipped}`);
}

fixArticleImages();

