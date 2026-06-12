# Content Directory

This directory contains all markdown articles for the KI-LAMPE blog.

## Directory Structure

```
content/
  articles/
    article-slug.md
    ...
```

## Article Format

Each article is a markdown file with frontmatter metadata:

```markdown
---
title: "Article Title"
description: "Article description for preview cards"
topic: "TOPIC"
level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
readTime: "5 MIN"
image: "/path/to/image.jpg" (optional)
---

# Article Content

Your markdown content goes here...
```

## Frontmatter Fields

- **title** (required): The article title
- **description** (required): Short description shown in article cards
- **topic** (optional): Topic category (e.g., "GAMING", "CONSOLES", "PC")
- **level** (optional): Difficulty level ("BEGINNER", "INTERMEDIATE", "ADVANCED")
- **readTime** (optional): Estimated reading time (e.g., "5 MIN")
- **image** (optional): Path to article image (relative to `/public`)

## File Naming

Article files should be named using kebab-case slugs that match the article title:

- `understanding-modern-game-development.md`
- `the-future-of-console-gaming.md`
- `pc-gaming-setup-guide.md`

The filename (without `.md`) becomes the article slug used in URLs: `/article/[slug]`

## Markdown Support

Articles support standard markdown syntax plus:

- Headings (H1-H4)
- Paragraphs
- Links
- Lists (ordered and unordered)
- Code blocks (with syntax highlighting)
- Inline code
- Blockquotes
- Images
- Tables
- Horizontal rules

All markdown is automatically styled according to the design system.

## Adding New Articles

1. Create a new `.md` file` in `content/articles/`
2. Add frontmatter with required fields
3. Write your content in markdown
4. The article will automatically appear on the homepage
5. Access it at `/article/[filename-without-extension]`

## Example Article

```markdown
---
title: "Getting Started with Game Development"
description: "Learn the basics of game development from scratch."
topic: "GAMING"
level: "BEGINNER"
readTime: "10 MIN"
---

# Introduction

Welcome to game development!

## Getting Started

Here's what you need to know...
```
