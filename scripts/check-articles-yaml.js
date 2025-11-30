import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content/articles");
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith(".md"));
const errors = [];

files.forEach(file => {
  try {
    const content = fs.readFileSync(path.join(articlesDir, file), "utf8");
    matter(content);
  } catch (e) {
    errors.push({ file, error: e.message.split("\n")[0] });
  }
});

if (errors.length > 0) {
  console.log("❌ Articles with YAML errors:");
  errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
  process.exit(1);
} else {
  console.log(`✅ All ${files.length} articles parse correctly!`);
}



