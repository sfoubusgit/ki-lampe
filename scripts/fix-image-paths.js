import fs from "fs";
import path from "path";

const articlesDir = path.join(process.cwd(), "content/articles");
const imagesDir = path.join(process.cwd(), "public/images");

const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".svg"];

function findImageForSlug(slug) {
  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${slug}${ext}`;
    const filePath = path.join(imagesDir, filename);
    if (fs.existsSync(filePath)) {
      return `/images/${filename}`;
    }
  }
  return null;
}

function fixArticleImages() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".md"));

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const imagePath = findImageForSlug(slug);

    if (!imagePath) {
      console.log(`❌ Kein Bild gefunden für: ${slug}`);
      continue;
    }

    const articlePath = path.join(articlesDir, file);
    let content = fs.readFileSync(articlePath, "utf8");

    const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (!frontmatterMatch) {
      console.log(`⚠️ Kein Frontmatter gefunden: ${file}`);
      continue;
    }

    const frontmatter = frontmatterMatch[1];
    let newFrontmatter;

    // Remove any existing image field (including malformed ones)
    newFrontmatter = frontmatter.replace(
      /image:\s*["']?[^"'\n]*["']?[^\n]*\n?/g,
      ""
    ).replace(
      /image:\s*>-\s*\n?[^\n]*\n?/g,
      ""
    );

    // Clean up any duplicate paths or malformed content
    newFrontmatter = newFrontmatter.replace(
      /\/images\/[^"'\s]+\/images\/[^"'\s]+/g,
      ""
    );

    // Add the correct image field
    newFrontmatter = `image: "${imagePath}"\n` + newFrontmatter.trim();

    const newContent = content.replace(
      frontmatterMatch[0],
      `---\n${newFrontmatter}\n---`
    );

    fs.writeFileSync(articlePath, newContent, "utf8");

    console.log(`✅ Fix angewendet: ${slug} → ${imagePath}`);
  }
}

fixArticleImages();

