# Article Data Integration

## Overview

All article data is fully integrated with components. Articles are loaded from markdown files with frontmatter metadata, and all components automatically display the correct information.

## Integration Points

### 1. Homepage Article Grid ✅

**File**: `app/page.tsx`

- Displays all articles from markdown files
- Uses `getAllArticles()` to fetch article metadata
- Renders articles in responsive grid layout
- Each article card shows:
  - Image (if provided in frontmatter)
  - Title (from frontmatter)
  - Description (from frontmatter)
  - Metadata labels (topic, level, readTime from frontmatter)

**Code**:
```tsx
const articles = getAllArticles();
// Articles automatically sorted alphabetically
// All metadata pulled from frontmatter
```

### 2. Article Cards ✅

**File**: `components/ArticleCard.tsx`

- Displays article preview information
- Shows image if provided (handles both local and external URLs)
- Title and description from article metadata
- Metadata labels component for topic, level, readTime
- Hover effects and transitions working correctly

**Image Handling**:
- Local images (starting with `/`): Uses Next.js `Image` component for optimization
- External images: Uses regular `img` tag
- Proper alt text support
- Grayscale and opacity effects on hover

### 3. Article Pages ✅

**File**: `app/article/[slug]/page.tsx`

- Displays full article content
- Loads article by slug using `getArticleBySlug()`
- Renders article header with all metadata
- Displays full markdown content
- Static generation at build time

**Metadata Display**:
- Title: From frontmatter `title`
- Description: From frontmatter `description`
- Topic: From frontmatter `topic` (optional)
- Level: From frontmatter `level` (optional)
- Read Time: From frontmatter `readTime` OR auto-calculated

### 4. Metadata Labels ✅

**File**: `components/MetadataLabels.tsx`

- Pulls all data from article frontmatter
- Displays topic, level, and readTime
- Only shows labels that are provided
- Proper styling and spacing

**Data Flow**:
```
Frontmatter → getArticleBySlug() → ArticleMetadata → MetadataLabels
```

### 5. Image Loading ✅

**Article Cards** (`components/ArticleCard.tsx`):
- Local images: Next.js `Image` component with optimization
- External images: Regular `img` tag
- Proper error handling and fallbacks

**Article Content** (`components/MarkdownContent.tsx`):
- Local images (starting with `/`): Next.js `Image` component
- External images: Regular `img` tag
- Responsive sizing and styling
- Proper border and spacing

**Image Paths**:
- Local: `/images/article-image.jpg` (relative to `/public`)
- External: `https://example.com/image.jpg`

### 6. Reading Time Calculation ✅

**File**: `lib/content.ts`

- **Automatic Calculation**: If `readTime` not provided in frontmatter, automatically calculated from word count
- **Algorithm**: 
  - Removes markdown syntax (code blocks, links, formatting)
  - Counts words in clean text
  - Assumes 200 words per minute reading speed
  - Rounds up to nearest minute
- **Manual Override**: Can still specify `readTime` in frontmatter to override

**Example**:
```markdown
---
title: "My Article"
description: "A great article"
# readTime: "5 MIN"  # Optional - will be auto-calculated if omitted
---
```

**Calculation Function**:
```typescript
calculateReadingTime(content: string): string
// Returns: "X MIN" format
```

## Data Flow

### Homepage
```
1. getAllArticles() → Reads all .md files
2. Parses frontmatter for each article
3. Calculates reading time if not provided
4. Returns ArticleMetadata[]
5. Homepage renders ArticleCard for each
6. ArticleCard displays image, title, description, metadata
```

### Article Page
```
1. getArticleBySlug(slug) → Reads specific .md file
2. Parses frontmatter and content
3. Calculates reading time if not provided
4. Returns Article with metadata and content
5. ArticleHeader displays metadata
6. MarkdownContent renders markdown as HTML
```

## Frontmatter Schema

```typescript
interface ArticleMetadata {
  title: string;           // Required
  description: string;    // Required
  topic?: string;         // Optional (e.g., "GAMING", "CONSOLES", "PC")
  level?: string;         // Optional ("BEGINNER", "INTERMEDIATE", "ADVANCED")
  readTime?: string;      // Optional (auto-calculated if omitted)
  image?: string;         // Optional (local path or external URL)
  slug: string;           // Auto-generated from filename
}
```

## Example Article

```markdown
---
title: "Understanding Modern Game Development"
description: "A comprehensive guide to the tools, techniques, and workflows used in contemporary game development."
topic: "GAMING"
level: "INTERMEDIATE"
image: "/images/game-dev.jpg"
---

# Article Content

Your markdown content here...
```

## Features

### ✅ Automatic Reading Time
- Calculated from word count if not provided
- Removes code blocks and markdown syntax
- Assumes 200 words per minute
- Format: "X MIN"

### ✅ Image Support
- Local images: Optimized with Next.js Image
- External images: Regular img tag
- Proper alt text handling
- Responsive sizing

### ✅ Metadata Integration
- All metadata pulled from frontmatter
- Optional fields handled gracefully
- Type-safe interfaces

### ✅ Static Generation
- All articles pre-rendered at build time
- Fast loading and SEO-friendly
- Automatic route generation

## Testing

All integration points verified:

1. ✅ Homepage displays all articles
2. ✅ Article cards show correct metadata
3. ✅ Article pages display full content
4. ✅ Metadata labels pull from frontmatter
5. ✅ Images load correctly (local and external)
6. ✅ Reading time calculated automatically

## Build Verification

```
✓ Compiled successfully
✓ All articles generated statically
✓ No TypeScript errors
✓ All routes working correctly
```

## Future Enhancements

Potential improvements:

- [ ] Image optimization for external images
- [ ] Custom reading speed calculation
- [ ] Image lazy loading
- [ ] Article search and filtering
- [ ] Related articles based on topic
- [ ] Article date metadata
- [ ] Article author metadata
