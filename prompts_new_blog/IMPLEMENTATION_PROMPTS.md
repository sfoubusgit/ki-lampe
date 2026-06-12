# Implementation Prompts: Complete Blog Redesign

## How to Use This Document

These prompts are designed to be given to an AI assistant (like me) one at a time, in order. Each prompt is self-contained but builds on previous work.

**CRITICAL: Always Start with Master Prompt**

Before every implementation request, copy and paste the master prompt from:
- **Full version:** `AI_WORK_INSTRUCTIONS.md` (with explanations)
- **Condensed version:** `MASTER_PROMPT.txt` (easy copy-paste)

Then add your specific prompt from below.

**Example:**
```
[PASTE MASTER_PROMPT.txt HERE]

[THEN PASTE SPECIFIC PROMPT FROM BELOW]
```

**Rules:**
- Follow the design manifesto strictly (black & white, minimal, typography-driven)
- Follow the architecture rules in `CONTRIBUTING.md`
- Use only Tailwind utilities from config
- No CSS files, no arbitrary values
- Document all decisions

**Order:**
- Complete prompts in the order listed
- Don't skip ahead
- Verify each step works before moving to the next

---

## Phase 1: Foundation & Content Processing

### Prompt 1.1: Content Processing Library

```
Create a content processing library in /redesign/lib/articles.ts that:

1. Reads markdown files from /redesign/content/articles/
2. Parses frontmatter using gray-matter
3. Converts markdown to HTML using remark and remark-html
4. Generates slugs from filenames
5. Extracts metadata (title, date, excerpt, category, tags, etc.)
6. Calculates reading time
7. Returns typed Article objects

Requirements:
- Use TypeScript with proper types
- Handle errors gracefully
- No styling logic (pure data processing)
- Functions: getAllArticles(), getArticle(slug), getArticlesByCategory(), getArticlesByTag()
- Sort articles by date (newest first)

Follow the architecture: this is business logic, no styling decisions.
```

### Prompt 1.2: Article Types

```
Create TypeScript type definitions in /redesign/types/article.ts:

1. Define Article interface with all fields
2. Define ArticleMetadata interface for frontmatter
3. Define Category and Tag types
4. Export all types for use across the application

Requirements:
- Strict typing
- No any types
- Document each field
- Align with content structure
```

### Prompt 1.3: Content Directory Structure

```
Set up the content directory structure:

1. Create /redesign/content/articles/ directory
2. Create a sample article markdown file with proper frontmatter:
   - title, date, dateModified, excerpt, category, tags, author, seoKeywords
3. Ensure markdown follows the design manifesto (no inline styles, clean structure)

Requirements:
- Frontmatter must match ArticleMetadata type
- Markdown should be clean and semantic
- No HTML with inline styles
- Use standard markdown syntax only
```

---

## Phase 2: Core Components

### Prompt 2.1: Article List Component

```
Create /redesign/components/content/ArticleList.tsx:

1. Displays a list of articles
2. Shows: title, excerpt, date, category, reading time
3. Uses Link component for article links
4. Follows typography hierarchy (H2 for titles, text-base for body, text-xs for meta)
5. Proper spacing using design tokens

Requirements:
- Typography-driven layout
- No decoration
- High contrast (black on white)
- Responsive spacing
- Uses Prose component for content wrapper
```

### Prompt 2.2: Article Card Component

```
Create /redesign/components/content/ArticleCard.tsx:

1. Individual article card for lists
2. Shows: title, excerpt, date, category
3. Clickable (wraps in Link component)
4. Hover state: underline on title (no other decoration)
5. Typography hierarchy: H3 for title, text-base for excerpt, text-xs for meta

Requirements:
- Minimal design (no borders, no backgrounds, no shadows)
- Pure typography
- Uses spacing scale only
- No decoration
```

### Prompt 2.3: Category Badge Component

```
Create /redesign/components/ui/CategoryBadge.tsx:

1. Displays category name
2. Text-only (no background, no border, no decoration)
3. Uses text-xs, font-semibold
4. Can be used as link or plain text

Requirements:
- Pure typography
- No visual decoration
- Follows design manifesto
```

### Prompt 2.4: Tag List Component

```
Create /redesign/components/ui/TagList.tsx:

1. Displays list of tags
2. Each tag is a link (using Link component)
3. Comma-separated or list format
4. Uses text-xs for tags
5. No decoration

Requirements:
- Minimal presentation
- Typography-only
- Proper spacing
```

### Prompt 2.5: Date Formatter Utility

```
Create /redesign/lib/utils.ts with date formatting functions:

1. formatDate(date: string): string - Formats date for display
2. formatDateLong(date: string): string - Long format
3. formatDateShort(date: string): string - Short format
4. Uses date-fns or native Intl.DateTimeFormat

Requirements:
- German locale formatting
- Type-safe
- No styling logic
```

---

## Phase 3: Article Pages

### Prompt 3.1: Article Detail Page

```
Update /redesign/app/artikel/[slug]/page.tsx to:

1. Fetch article by slug using getArticle()
2. Generate static params for all articles
3. Generate metadata for SEO
4. Display full article content:
   - Title (H1, text-2xl, font-black)
   - Date and meta info (text-xs)
   - Excerpt (text-base)
   - Full content with proper typography hierarchy
   - Category and tags
5. Use Prose component for content
6. Add back link to article list

Requirements:
- Server component (async)
- Proper error handling (notFound for missing articles)
- Typography hierarchy throughout
- No decoration
- Follows design manifesto
```

### Prompt 3.2: Article Content Rendering

```
Create /redesign/components/content/ArticleContent.tsx:

1. Renders article HTML content
2. Applies proper typography classes to HTML elements:
   - h2 → text-xl font-bold mt-8 mb-3
   - h3 → text-lg font-semibold mt-6 mb-2
   - p → text-base mb-3
   - ul → list-outside list-square ml-6 space-y-1
   - ol → list-outside list-decimal ml-8 space-y-1
   - li → text-base
   - blockquote → border-l-4 border-black pl-4 italic
   - code → font-mono border border-black px-1
   - pre → border border-black p-3 (with code inside)
3. Uses dangerouslySetInnerHTML for HTML content
4. Wraps in Prose component

Requirements:
- Typography-driven styling
- All styles via Tailwind utilities
- No inline styles
- Follows design manifesto
```

### Prompt 3.3: Related Articles Component

```
Create /redesign/components/content/RelatedArticles.tsx:

1. Shows related articles based on category or tags
2. Uses ArticleCard component
3. Limits to 3-4 articles
4. Typography-driven layout
5. Section heading: "Verwandte Artikel" (H2, text-xl, font-bold)

Requirements:
- Minimal design
- Typography hierarchy
- Uses existing components
```

---

## Phase 4: Article Listings

### Prompt 4.1: Articles Index Page

```
Create /redesign/app/artikel/page.tsx:

1. Lists all articles
2. Uses ArticleList component
3. Shows page title: "Alle Artikel" (H1, text-2xl, font-black)
4. Pagination (if needed, simple prev/next)
5. Uses Prose component wrapper

Requirements:
- Server component
- Fetches all articles
- Typography-driven
- Minimal design
```

### Prompt 4.2: Category Page

```
Create /redesign/app/kategorie/[slug]/page.tsx:

1. Lists articles by category
2. Shows category name as page title
3. Uses ArticleList component
4. Shows article count
5. Back link to categories list

Requirements:
- Server component
- Generate static params for all categories
- Typography hierarchy
- Minimal design
```

### Prompt 4.3: Tag Page

```
Create /redesign/app/tag/[slug]/page.tsx:

1. Lists articles by tag
2. Shows tag name as page title
3. Uses ArticleList component
4. Shows article count
5. Back link

Requirements:
- Server component
- Generate static params for all tags
- Typography hierarchy
- Minimal design
```

### Prompt 4.4: Categories List Page

```
Create /redesign/app/kategorie/page.tsx:

1. Lists all categories with article counts
2. Each category is a link to category page
3. Typography-driven layout
4. Uses CategoryBadge component

Requirements:
- Server component
- Fetches all categories
- Minimal design
- Typography hierarchy
```

---

## Phase 5: Navigation & Layout

### Prompt 5.1: Enhanced Header Navigation

```
Update /redesign/components/layout/Header.tsx to:

1. Add proper active state detection (use usePathname)
2. Show underline for active link
3. Add mobile menu (hamburger, full-screen overlay)
4. Mobile menu: black background, white text, same typography
5. No animations (instant show/hide)

Requirements:
- Client component (use 'use client')
- Typography-driven
- High contrast
- No decoration
- Follows design manifesto
```

### Prompt 5.2: Breadcrumbs Component

```
Create /redesign/components/layout/Breadcrumbs.tsx:

1. Shows navigation path (Home > Category > Article)
2. Text-only, no icons
3. Uses Link component for each segment
4. Separator: " > " (text)
5. Uses text-xs for breadcrumbs

Requirements:
- Minimal design
- Typography-only
- No decoration
```

### Prompt 5.3: Search Component

```
Create /redesign/components/ui/Search.tsx:

1. Simple text input
2. Border: 1px black
3. No decoration
4. Search icon: text only (or no icon)
5. Results dropdown (if needed): black border, white background

Requirements:
- Minimal design
- Typography-driven
- High contrast
- No decoration
```

### Prompt 5.4: Language Toggle

```
Create /redesign/components/ui/LanguageToggle.tsx:

1. Toggles between DE and EN
2. Text-only buttons
3. Active state: underline
4. Uses text-xs, uppercase
5. Stores preference in localStorage

Requirements:
- Client component
- Minimal design
- Typography-only
- No decoration
```

---

## Phase 6: Additional Pages

### Prompt 6.1: About Page

```
Create /redesign/app/ueber/page.tsx:

1. About page content
2. Uses Prose component
3. Typography hierarchy:
   - H1 for title
   - H2 for sections
   - Body text
4. No decoration

Requirements:
- Server component
- Typography-driven
- Minimal design
- Follows design manifesto
```

### Prompt 6.2: Contact Page

```
Create /redesign/app/kontakt/page.tsx:

1. Contact information
2. Simple contact form (if needed)
3. Uses Prose component
4. Typography hierarchy
5. Form inputs: border-1 border-black, no decoration

Requirements:
- Minimal design
- Typography-driven
- High contrast
- No decoration
```

### Prompt 6.3: Search Results Page

```
Create /redesign/app/suche/page.tsx:

1. Search results page
2. Query parameter: ?q=search-term
3. Shows search results using ArticleList
4. Shows "X Ergebnisse für 'search-term'"
5. Typography hierarchy

Requirements:
- Server component
- Handles search query
- Minimal design
- Typography-driven
```

### Prompt 6.4: 404 Page

```
Create /redesign/app/not-found.tsx:

1. Custom 404 page
2. Typography-driven
3. Message: "Seite nicht gefunden"
4. Link back to homepage
5. Uses Prose component

Requirements:
- Minimal design
- Typography hierarchy
- No decoration
```

---

## Phase 7: SEO & Metadata

### Prompt 7.1: Dynamic Metadata Generation

```
Update article pages to generate proper metadata:

1. Generate title from article title
2. Generate description from excerpt
3. Generate Open Graph tags
4. Generate Twitter Card tags
5. Generate canonical URL
6. Add article structured data (JSON-LD)

Requirements:
- Server-side generation
- Type-safe
- Follows SEO best practices
- No styling in metadata
```

### Prompt 7.2: Sitemap Generation

```
Create /redesign/app/sitemap.ts:

1. Generate sitemap for all articles
2. Generate sitemap for all categories
3. Generate sitemap for all tags
4. Include static pages
5. Proper URLs and priorities

Requirements:
- Dynamic generation
- Includes all content
- SEO-friendly
```

### Prompt 7.3: Robots.txt

```
Create /redesign/app/robots.ts:

1. Allow all crawlers
2. Reference sitemap
3. Proper directives

Requirements:
- SEO-friendly
- Allows indexing
```

### Prompt 7.4: RSS Feed

```
Create /redesign/app/rss.xml/route.ts:

1. Generate RSS feed for articles
2. Include all articles
3. Proper RSS 2.0 format
4. Includes title, description, date, link

Requirements:
- Dynamic generation
- Valid RSS format
- Includes all content
```

---

## Phase 8: Performance & Optimization

### Prompt 8.1: Image Optimization

```
Create /redesign/components/ui/Image.tsx:

1. Wrapper around Next.js Image component
2. Handles article images
3. Proper sizing and optimization
4. Alt text handling
5. No decoration (images are content)

Requirements:
- Uses Next.js Image
- Proper optimization
- Typography-driven (no decorative borders)
```

### Prompt 8.2: Static Generation

```
Optimize all pages for static generation:

1. Ensure all article pages use generateStaticParams
2. Ensure category pages use generateStaticParams
3. Ensure tag pages use generateStaticParams
4. Add proper revalidation
5. Optimize build performance

Requirements:
- Static generation where possible
- Proper ISR strategy
- Fast builds
```

### Prompt 8.3: Code Splitting

```
Optimize component loading:

1. Ensure proper code splitting
2. Lazy load heavy components if needed
3. Optimize bundle size
4. No unnecessary imports

Requirements:
- Fast page loads
- Optimized bundles
- Proper code splitting
```

---

## Phase 9: Content Features

### Prompt 9.1: Table of Contents

```
Create /redesign/components/content/TableOfContents.tsx:

1. Generates TOC from article headings
2. Text-only list
3. Links to sections
4. Uses text-xs for TOC items
5. No decoration

Requirements:
- Minimal design
- Typography-driven
- No decoration
- Functional only
```

### Prompt 9.2: Reading Progress Indicator

```
Create /redesign/components/ui/ReadingProgress.tsx:

1. Shows reading progress
2. Simple line at top of page
3. Black line, 1px height
4. No animation (instant updates)

Requirements:
- Minimal design
- No decoration
- Functional only
```

### Prompt 9.3: Share Buttons

```
Create /redesign/components/ui/ShareButtons.tsx:

1. Share article links
2. Text-only buttons
3. No icons (or text labels only)
4. Minimal design
5. Uses Link component

Requirements:
- Typography-driven
- No decoration
- Minimal design
```

---

## Phase 10: Advanced Features

### Prompt 10.1: Newsletter Integration

```
Create /redesign/components/system/Newsletter.tsx:

1. Newsletter signup form
2. Simple input and button
3. Border-1 border-black for inputs
4. No decoration
5. Typography-driven

Requirements:
- Minimal design
- Typography-only
- No decoration
- Functional
```

### Prompt 10.2: Related Content Suggestions

```
Enhance RelatedArticles component:

1. Better algorithm for related articles
2. Based on category, tags, and content similarity
3. Shows at bottom of articles
4. Typography-driven layout

Requirements:
- Minimal design
- Typography hierarchy
- Uses existing components
```

### Prompt 10.3: Article Series Support

```
Add article series support:

1. Frontmatter field: series
2. Series navigation component
3. Shows "Teil 1 von 3" etc.
4. Links to other articles in series
5. Typography-driven

Requirements:
- Minimal design
- Typography-only
- No decoration
```

---

## Phase 11: Testing & Validation

### Prompt 11.1: Component Testing

```
Create basic component tests:

1. Test ArticleCard renders correctly
2. Test Link component hover states
3. Test Prose component wrapper
4. Test typography hierarchy
5. Use Jest and React Testing Library

Requirements:
- Test component behavior
- Test typography classes
- No styling tests (test structure)
```

### Prompt 11.2: Build Validation

```
Create build validation script:

1. Check all articles have required frontmatter
2. Check all slugs are valid
3. Check no broken links
4. Check typography classes are from config
5. Check no arbitrary values

Requirements:
- Validates architecture rules
- Catches violations
- Prevents bad builds
```

### Prompt 11.3: Accessibility Audit

```
Audit and fix accessibility:

1. Check heading hierarchy
2. Check link accessibility
3. Check form accessibility
4. Check color contrast (black/white is perfect)
5. Check keyboard navigation

Requirements:
- WCAG 2.1 AA compliance
- Keyboard accessible
- Screen reader friendly
```

---

## Phase 12: Documentation & Polish

### Prompt 12.1: Component Documentation

```
Document all components:

1. Add JSDoc comments to all components
2. Document props
3. Document design decisions
4. Document usage examples
5. Create component catalog

Requirements:
- Clear documentation
- Usage examples
- Design rationale
```

### Prompt 12.2: Content Guidelines

```
Create content authoring guidelines:

1. Markdown syntax guide
2. Frontmatter requirements
3. Image guidelines
4. Typography guidelines
5. Style guide for content

Requirements:
- Clear guidelines
- Examples
- Best practices
```

### Prompt 12.3: Deployment Guide

```
Create deployment documentation:

1. Build process
2. Environment variables
3. Vercel deployment
4. Domain setup
5. Performance optimization

Requirements:
- Step-by-step guide
- Troubleshooting
- Best practices
```

---

## Phase 13: Migration from Old Blog

### Prompt 13.1: Content Migration Script

```
Create script to migrate content from old blog:

1. Read articles from /content/articles/
2. Convert to new format if needed
3. Validate frontmatter
4. Copy to /redesign/content/articles/
5. Generate migration report

Requirements:
- Preserves content
- Validates format
- Reports issues
```

### Prompt 13.2: URL Redirect Mapping

```
Create redirect mapping:

1. Map old URLs to new URLs
2. Handle slug changes
3. Create redirect rules
4. Test all redirects

Requirements:
- Preserves SEO
- Handles all old URLs
- Proper 301 redirects
```

---

## Quick Reference: Prompt Checklist

Use this checklist to track progress:

### Foundation
- [ ] Prompt 1.1: Content Processing Library
- [ ] Prompt 1.2: Article Types
- [ ] Prompt 1.3: Content Directory Structure

### Core Components
- [ ] Prompt 2.1: Article List Component
- [ ] Prompt 2.2: Article Card Component
- [ ] Prompt 2.3: Category Badge Component
- [ ] Prompt 2.4: Tag List Component
- [ ] Prompt 2.5: Date Formatter Utility

### Article Pages
- [ ] Prompt 3.1: Article Detail Page
- [ ] Prompt 3.2: Article Content Rendering
- [ ] Prompt 3.3: Related Articles Component

### Article Listings
- [ ] Prompt 4.1: Articles Index Page
- [ ] Prompt 4.2: Category Page
- [ ] Prompt 4.3: Tag Page
- [ ] Prompt 4.4: Categories List Page

### Navigation & Layout
- [ ] Prompt 5.1: Enhanced Header Navigation
- [ ] Prompt 5.2: Breadcrumbs Component
- [ ] Prompt 5.3: Search Component
- [ ] Prompt 5.4: Language Toggle

### Additional Pages
- [ ] Prompt 6.1: About Page
- [ ] Prompt 6.2: Contact Page
- [ ] Prompt 6.3: Search Results Page
- [ ] Prompt 6.4: 404 Page

### SEO & Metadata
- [ ] Prompt 7.1: Dynamic Metadata Generation
- [ ] Prompt 7.2: Sitemap Generation
- [ ] Prompt 7.3: Robots.txt
- [ ] Prompt 7.4: RSS Feed

### Performance
- [ ] Prompt 8.1: Image Optimization
- [ ] Prompt 8.2: Static Generation
- [ ] Prompt 8.3: Code Splitting

### Content Features
- [ ] Prompt 9.1: Table of Contents
- [ ] Prompt 9.2: Reading Progress Indicator
- [ ] Prompt 9.3: Share Buttons

### Advanced Features
- [ ] Prompt 10.1: Newsletter Integration
- [ ] Prompt 10.2: Related Content Suggestions
- [ ] Prompt 10.3: Article Series Support

### Testing
- [ ] Prompt 11.1: Component Testing
- [ ] Prompt 11.2: Build Validation
- [ ] Prompt 11.3: Accessibility Audit

### Documentation
- [ ] Prompt 12.1: Component Documentation
- [ ] Prompt 12.2: Content Guidelines
- [ ] Prompt 12.3: Deployment Guide

### Migration
- [ ] Prompt 13.1: Content Migration Script
- [ ] Prompt 13.2: URL Redirect Mapping

---

## Usage Instructions

1. **Start with Phase 1** - Foundation is critical
2. **Complete in order** - Each phase builds on previous
3. **Test after each prompt** - Verify it works before continuing
4. **Follow the rules** - Reference CONTRIBUTING.md if unsure
5. **Document decisions** - Add comments explaining choices

## Important Reminders

- **No CSS files** - Only Tailwind utilities
- **No arbitrary values** - Only from config
- **Typography-driven** - Content is king
- **Minimal design** - No decoration
- **Black & white only** - No colors
- **High contrast** - Maximum readability

---

**Total Prompts: 50+**

This comprehensive set covers the entire blog redesign from foundation to deployment. Each prompt is specific, actionable, and aligned with the design manifesto and architecture rules.
