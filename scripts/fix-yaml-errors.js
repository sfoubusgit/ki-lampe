import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content/articles");
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".md"));
let fixed = 0;
let errors = [];

files.forEach(file => {
  const filePath = path.join(articlesDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  
  // Check if it parses
  try {
    matter(content);
    // Already valid, skip
    return;
  } catch (e) {
    // Has error, try to fix
    const frontmatterMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
    if (!frontmatterMatch) {
      errors.push({ file, error: "No frontmatter found" });
      return;
    }

    let frontmatter = frontmatterMatch[1];
    
    // Remove any lines that are malformed (image paths, URLs, etc.)
    frontmatter = frontmatter
      .split("\n")
      .filter(line => {
        const trimmed = line.trim();
        // Remove lines that are just image paths without "image:" key
        if (trimmed.startsWith("/images/") && !trimmed.startsWith("image:")) {
          return false;
        }
        // Remove lines that are malformed image entries (with leading spaces)
        if (trimmed.match(/^\s+\/images\//)) {
          return false;
        }
        // Remove lines that are just URLs (unsplash, etc.) without a key
        if (trimmed.match(/^https?:\/\//) && !trimmed.includes(":")) {
          return false;
        }
        // Remove lines that start with http/https and are indented (malformed)
        if (line.match(/^\s+https?:\/\//)) {
          return false;
        }
        return true;
      })
      .join("\n");

    // Clean up any trailing whitespace
    frontmatter = frontmatter.trim();

    const newContent = content.replace(
      frontmatterMatch[0],
      `---\n${frontmatter}\n---`
    );

    // Verify it parses now
    try {
      matter(newContent);
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ Fixed: ${file}`);
      fixed++;
    } catch (e2) {
      errors.push({ file, error: e2.message.split("\n")[0] });
    }
  }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Fixed: ${fixed}`);
if (errors.length > 0) {
  console.log(`❌ Still have errors: ${errors.length}`);
  errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
} else {
  console.log(`✅ All articles fixed!`);
}

