#!/usr/bin/env tsx
/**
 * Script to create a new article with correct current date
 * 
 * Usage:
 *   tsx scripts/create-article.ts <slug> "<title>"
 * 
 * Example:
 *   tsx scripts/create-article.ts "mein-neuer-artikel" "Mein Neuer Artikel"
 */

import fs from 'fs'
import path from 'path'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

/**
 * Get current date in ISO format
 */
function getCurrentDate(): string {
  return new Date().toISOString()
}

/**
 * Create slug from title
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Create new article with template
 */
function createArticle(slug: string, title: string): void {
  const articlePath = path.join(articlesDirectory, `${slug}.md`)
  
  if (fs.existsSync(articlePath)) {
    console.error(`❌ Article already exists: ${slug}`)
    process.exit(1)
  }

  const currentDate = getCurrentDate()

  const template = `---
image: 'https://images.unsplash.com/photo-XXXXX?w=1200&h=630&fit=crop'
title: "${title}"
date: '${currentDate}'
dateModified: '${currentDate}'
excerpt: >-
  Beschreibung des Artikels (bitte anpassen)
category: News
tags:
  - Tag1
  - Tag2
author: AI Content Team
seoKeywords:
  - 'keyword1'
  - 'keyword2'
---

# ${title}

Artikel-Inhalt hier...

`

  fs.writeFileSync(articlePath, template, 'utf8')
  
  console.log(`✅ Article created: ${slug}.md`)
  console.log(`   Title: ${title}`)
  console.log(`   Date: ${currentDate}`)
  console.log(`   Path: ${articlePath}`)
  console.log(`\n📝 Bitte passe den Inhalt an!`)
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('Usage:')
    console.log('  tsx scripts/create-article.ts <slug> "<title>"')
    console.log('  tsx scripts/create-article.ts "mein-artikel" "Mein Artikel Titel"')
    console.log('\nAlternative (generates slug from title):')
    console.log('  tsx scripts/create-article.ts --title "Mein Artikel Titel"')
    process.exit(1)
  }

  let slug: string
  let title: string

  if (args[0] === '--title') {
    if (args.length < 2) {
      console.error('❌ Title required when using --title flag')
      process.exit(1)
    }
    title = args.slice(1).join(' ')
    slug = createSlug(title)
  } else {
    if (args.length < 2) {
      console.error('❌ Title required')
      process.exit(1)
    }
    slug = args[0]
    title = args.slice(1).join(' ')
  }

  createArticle(slug, title)
}

if (require.main === module) {
  main()
}

