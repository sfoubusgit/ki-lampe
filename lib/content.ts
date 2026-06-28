import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Content Management System
 * 
 * Handles reading and parsing markdown files for articles.
 * Supports frontmatter parsing for metadata.
 */

export interface ArticleMetadata {
  title: string;
  description: string;
  topic?: string;
  level?: string;
  readTime?: string;
  image?: string;
  slug: string;
  date?: Date;
  language: "en" | "de";
}

export interface Article {
  metadata: ArticleMetadata;
  content: string;
}

const contentSources = [
  { directory: path.join(process.cwd(), "content", "articles"), language: "de" as const },
  { directory: path.join(process.cwd(), "content", "articles_en"), language: "en" as const },
];

/**
 * Get all article slugs from markdown files
 */
export function getAllArticleSlugs(): string[] {
  const slugs = new Set<string>();

  for (const source of contentSources) {
    if (!fs.existsSync(source.directory)) {
      continue;
    }

    const fileNames = fs.readdirSync(source.directory);
    for (const fileName of fileNames) {
      if (fileName.endsWith(".md")) {
        slugs.add(fileName.replace(/\.md$/, ""));
      }
    }
  }

  return Array.from(slugs).sort();
}

/**
 * Get article by slug
 */
export function getArticleBySlug(slug: string): Article | null {
  try {
    const match = contentSources
      .map((source) => ({
        path: path.join(source.directory, `${slug}.md`),
        language: source.language,
      }))
      .find((candidate) => fs.existsSync(candidate.path));

    if (!match) {
      return null;
    }

    const fileContents = fs.readFileSync(match.path, "utf8");
    const { data, content } = matter(fileContents);

    // Calculate reading time if not provided in frontmatter
    const readTime = data.readTime || calculateReadingTime(content);

    // Handle image: normalize undefined/null/empty string to undefined
    let image = data.image;
    if (!image || image === 'undefined' || image === 'null' || image.trim() === '') {
      image = undefined;
    }

    // Handle date: use frontmatter date or file modification time
    let date: Date | undefined;
    if (data.date) {
      date = new Date(data.date);
    } else {
      // Use file modification time as fallback
      const stats = fs.statSync(match.path);
      date = stats.mtime;
    }

    return {
      metadata: {
        title: data.title || "",
        description: data.description || "",
        topic: data.topic,
        level: data.level,
        readTime: readTime,
        image: image,
        slug: slug,
        date: date,
        language: match.language,
      },
      content: content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error);
    return null;
  }
}

/**
 * Get article by slug and language
 */
export function getArticleBySlugAndLanguage(
  slug: string,
  language: "en" | "de"
): Article | null {
  const source = contentSources.find((entry) => entry.language === language);
  if (!source) {
    return null;
  }

  const filePath = path.join(source.directory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const readTime = data.readTime || calculateReadingTime(content);

    let image = data.image;
    if (!image || image === "undefined" || image === "null" || image.trim() === "") {
      image = undefined;
    }

    let date: Date | undefined;
    if (data.date) {
      date = new Date(data.date);
    } else {
      const stats = fs.statSync(filePath);
      date = stats.mtime;
    }

    return {
      metadata: {
        title: data.title || "",
        description: data.description || "",
        topic: data.topic,
        level: data.level,
        readTime: readTime,
        image: image,
        slug: slug,
        date: date,
        language: language,
      },
      content: content,
    };
  } catch (error) {
    console.error(`Error reading article ${slug} (${language}):`, error);
    return null;
  }
}

/**
 * Get all articles with metadata
 */
export function getAllArticles(): ArticleMetadata[] {
  const allMetadata: ArticleMetadata[] = [];

  for (const source of contentSources) {
    if (!fs.existsSync(source.directory)) {
      continue;
    }

    const fileNames = fs.readdirSync(source.directory);
    for (const fileName of fileNames) {
      if (!fileName.endsWith(".md")) {
        continue;
      }

      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(source.directory, fileName);

      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);

        const readTime = data.readTime || calculateReadingTime(content);

        let image = data.image;
        if (!image || image === "undefined" || image === "null" || image.trim() === "") {
          image = undefined;
        }

        let date: Date | undefined;
        if (data.date) {
          date = new Date(data.date);
        } else {
          const stats = fs.statSync(filePath);
          date = stats.mtime;
        }

        allMetadata.push({
          title: data.title || "",
          description: data.description || "",
          topic: data.topic,
          level: data.level,
          readTime: readTime,
          image: image,
          slug: slug,
          date: date,
          language: source.language,
        });
      } catch (error) {
        console.error(`Error reading article ${fileName}:`, error);
      }
    }
  }

  return allMetadata.sort((a, b) => {
    if (a.date && b.date) {
      return b.date.getTime() - a.date.getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });
}

/**
 * Calculate reading time from content
 * Assumes average reading speed of 200 words per minute
 */
export function calculateReadingTime(content: string): string {
  // Remove markdown syntax and count words
  const text = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]+`/g, "") // Remove inline code
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Convert links to text
    .replace(/[#*\-_~`]/g, "") // Remove markdown formatting
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  const wordCount = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(wordCount / 200); // 200 words per minute average

  return `${minutes} MIN`;
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Blog categories (the nav pillars). Articles are assigned to a single
 * category based on their `topic` frontmatter.
 */
export type Category = "games" | "game-design" | "art" | "ai";

// "Games" is the single gaming pillar (gaming culture + game design + engines).
// The old standalone "game-design" category was too narrow to be a top-level pillar.
export const CATEGORIES: Category[] = ["games", "art", "ai"];

/**
 * Map an article's free-form `topic` to one of the blog categories.
 * Order matters: AI/KI before the generic gaming match. Game design now
 * folds into the broader "games" pillar.
 */
export function categoryOfTopic(topic?: string): Category | null {
  const t = (topic || "").toLowerCase();
  if (/\bki\b|ki-?tool|\bai\b|ai-?tool|automat/.test(t)) return "ai";
  if (/\bart\b|kunst|kreativ/.test(t)) return "art";
  if (/gaming|games|game\s*design|game-design|console|konsol|^pc$|playstation|xbox|nintendo/.test(t)) return "games";
  return null;
}

/**
 * Get all articles belonging to a category, newest first.
 */
export function getArticlesByCategory(category: Category): ArticleMetadata[] {
  return getAllArticles().filter((article) => categoryOfTopic(article.topic) === category);
}
