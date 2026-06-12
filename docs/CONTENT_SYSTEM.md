# Content Management System

## Overview

The KI-LAMPE blog uses a file-based content management system built on markdown files. Articles are stored as markdown files with frontmatter metadata, automatically parsed and rendered on the site.

## Architecture

### Content Directory Structure

```
content/
  articles/
    article-slug.md
    ...
```

### Key Components

1. **Content Utilities** (`lib/content.ts`)
   - Reads markdown files from `content/articles/`
   - Parses frontmatter using `gray-matter`
   - Provides functions for article listing and retrieval

2. **Markdown Renderer** (`components/MarkdownContent.tsx`)
   - Renders markdown content as React components
   - Uses `react-markdown` with `remark-gfm` for GitHub Flavored Markdown
   - Automatically styled via `.article-content` CSS class

3. **Article Pages** (`app/article/[slug]/page.tsx`)
   - Dynamic route for individual articles
   - Generates static pages for all articles at build time
   - Handles 404 for non-existent articles

4. **Homepage** (`app/page.tsx`)
   - Lists all articles from markdown files
   - Displays article cards with metadata

## Features

### ✅ Markdown File Support
- Articles stored as `.md` files
- Standard markdown syntax supported
- GitHub Flavored Markdown (GFM) enabled

### ✅ Frontmatter Parsing
- YAML frontmatter for metadata
- Required fields: `title`, `description`
- Optional fields: `topic`, `level`, `readTime`, `image`

### ✅ Article Slug Generation
- Slug derived from filename (without `.md` extension)
- URL format: `/article/[slug]`
- Utility function `generateSlug()` available for programmatic generation

### ✅ Content Directory Structure
- Centralized `content/articles/` directory
- Easy to add new articles by creating new markdown files
- No database required

### ✅ Article Listing Functionality
- `getAllArticles()` returns all articles with metadata
- Automatically sorted alphabetically by title
- Homepage displays all articles in grid layout

### ✅ Single Article Page Routing
- Dynamic route: `/article/[slug]`
- Static generation at build time via `generateStaticParams()`
- 404 handling for non-existent articles

## Usage

### Adding a New Article

1. Create a new markdown file in `content/articles/`:
   ```markdown
   ---
   title: "My New Article"
   description: "A great article about something interesting"
   topic: "GAMING"
   level: "BEGINNER"
   readTime: "5 MIN"
   ---
   
   # Article Content
   
   Your markdown content here...
   ```

2. Name the file using kebab-case (e.g., `my-new-article.md`)

3. The article will automatically:
   - Appear on the homepage
   - Be accessible at `/article/my-new-article`
   - Be included in static generation at build time

### Article Metadata

```typescript
interface ArticleMetadata {
  title: string;           // Required
  description: string;    // Required
  topic?: string;          // Optional (e.g., "GAMING", "CONSOLES", "PC")
  level?: string;         // Optional ("BEGINNER", "INTERMEDIATE", "ADVANCED")
  readTime?: string;      // Optional (e.g., "5 MIN", "10 MIN")
  image?: string;         // Optional (path relative to /public)
  slug: string;           // Auto-generated from filename
}
```

### API Functions

#### `getAllArticleSlugs(): string[]`
Returns an array of all article slugs (filenames without `.md` extension).

#### `getArticleBySlug(slug: string): Article | null`
Retrieves a single article by slug. Returns `null` if article doesn't exist.

#### `getAllArticles(): ArticleMetadata[]`
Returns all articles with their metadata, sorted alphabetically by title.

#### `generateSlug(title: string): string`
Utility function to generate a URL-friendly slug from a title.

## Markdown Support

The markdown renderer supports:

- **Headings**: H1-H4 (automatically styled)
- **Paragraphs**: Standard paragraph text
- **Links**: `[text](url)` format
- **Lists**: Ordered (`1.`) and unordered (`-`)
- **Code**: Inline `` `code` `` and code blocks with syntax highlighting
- **Blockquotes**: `> quote text`
- **Images**: `![alt](url)` format
- **Tables**: GitHub Flavored Markdown tables
- **Horizontal Rules**: `---`

All markdown elements are automatically styled according to the design system defined in `app/globals.css`.

## Build Process

1. At build time, Next.js:
   - Reads all markdown files from `content/articles/`
   - Parses frontmatter and content
   - Generates static HTML for each article
   - Creates static routes for all articles

2. The homepage:
   - Loads article metadata at build time
   - Displays article cards with links

3. Article pages:
   - Pre-rendered as static HTML
   - Fast loading and SEO-friendly

## Example Articles

Three sample articles are included:

1. `understanding-modern-game-development.md`
2. `the-future-of-console-gaming.md`
3. `pc-gaming-setup-guide.md`

These demonstrate the full range of markdown features and frontmatter usage.

## Future Enhancements

Potential improvements:

- [ ] Image optimization using Next.js `<Image>` component
- [ ] Article categories/tags system
- [ ] Article search functionality
- [ ] Article sorting options (date, topic, level)
- [ ] Draft/published status
- [ ] Article date metadata
- [ ] Related articles suggestions
- [ ] Markdown extensions (footnotes, math, etc.)

## Dependencies

- `gray-matter`: Frontmatter parsing
- `react-markdown`: Markdown to React rendering
- `remark-gfm`: GitHub Flavored Markdown support

All dependencies are installed and configured.
