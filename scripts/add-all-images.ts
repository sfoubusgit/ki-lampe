#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllArticles } from '../lib/articles'
import { getHeroImage } from '../lib/getHeroImage'

// Comprehensive image mapping
const imageKeywords: Record<string, string> = {
  'machine learning': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'neuronale netze': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'neural network': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'chatgpt': 'https://images.unsplash.com/photo-1676299080923-7b343597a673?w=1200&h=630&fit=crop',
  'prompt engineering': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'deep learning': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1200&h=630&fit=crop',
  'natural language processing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'nlp': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'computer vision': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'ki-tools': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'midjourney': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'dall-e': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'stable diffusion': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'claude': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'gemini': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'chatbot': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'vergleich': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'seo': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  'automatisierung': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'code-generierung': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
  'github copilot': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
  'voice ai': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'siri': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'alexa': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'reinforcement learning': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'arbeit': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'jobmarkt': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'kreativität': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'bildung': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'psychologie': 'https://images.unsplash.com/photo-1559757148-5c0d4205e1d1?w=1200&h=630&fit=crop',
  'datenschutz': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop',
  'medizin': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop',
  'revolution': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop',
  'star wars': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'obi wan': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
}

const categoryImages: Record<string, string> = {
  'Technology': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'Tools': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'Vergleich': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'Praktisch': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
}

function findImageForArticle(title: string, category?: string, tags?: string[]): string {
  const titleLower = title.toLowerCase()
  
  // Check title
  for (const [keyword, imageUrl] of Object.entries(imageKeywords)) {
    if (titleLower.includes(keyword)) {
      return imageUrl
    }
  }
  
  // Check tags
  if (tags) {
    for (const tag of tags) {
      const tagLower = tag.toLowerCase()
      for (const [keyword, imageUrl] of Object.entries(imageKeywords)) {
        if (tagLower.includes(keyword)) {
          return imageUrl
        }
      }
    }
  }
  
  // Check category
  if (category && categoryImages[category]) {
    return categoryImages[category]
  }
  
  // Default
  return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop'
}

async function main() {
  console.log('🖼️  Füge Bilder zu ALLEN Artikeln hinzu...\n')
  
  const articles = await getAllArticles()
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  let updated = 0
  let skipped = 0
  let errors = 0

  console.log(`📚 Gefunden: ${articles.length} Artikel\n`)

  for (const article of articles) {
    try {
      const articlePath = path.join(articlesDirectory, `${article.slug}.md`)

      if (!fs.existsSync(articlePath)) {
        console.log(`⚠️  Datei nicht gefunden: ${article.slug}`)
        continue
      }

      const fileContents = fs.readFileSync(articlePath, 'utf8')
      const { data, content } = matter(fileContents)

      // Check if already has image in frontmatter
      if (data.image && data.image.trim() !== '' && data.image.startsWith('http')) {
        skipped++
        continue
      }
      
      // Check if image file exists
      const heroImage = getHeroImage(article.slug)
      if (heroImage && !data.image) {
        // Add the existing image to frontmatter
        const updatedData = {
          ...data,
          image: heroImage,
        }
        const frontmatter = matter.stringify(content, updatedData)
        fs.writeFileSync(articlePath, frontmatter, 'utf8')
        console.log(`✅ ${article.title} (existing image added to frontmatter)`)
        updated++
        continue
      }

      // Find suitable image
      const imageUrl = findImageForArticle(article.title, article.category, article.tags)

      // Update frontmatter
      const updatedData = {
        ...data,
        image: imageUrl,
      }

      const frontmatter = matter.stringify(content, updatedData)
      fs.writeFileSync(articlePath, frontmatter, 'utf8')

      console.log(`✅ ${article.title}`)
      updated++
    } catch (error) {
      console.error(`❌ Fehler bei ${article.slug}: ${error}`)
      errors++
    }
  }

  console.log(`\n✅ Fertig!`)
  console.log(`   Aktualisiert: ${updated} Artikel`)
  console.log(`   Übersprungen: ${skipped} Artikel (hatten bereits Bilder)`)
  if (errors > 0) {
    console.log(`   Fehler: ${errors} Artikel`)
  }
}

if (require.main === module) {
  main().catch(console.error)
}
