#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllArticles } from '../lib/articles'

// Unsplash Image URLs basierend auf Keywords
const imageKeywords: Record<string, string> = {
  'machine learning': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'neuronale netze': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'chatgpt': 'https://images.unsplash.com/photo-1676299080923-7b343597a673?w=1200&h=630&fit=crop',
  'prompt engineering': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'deep learning': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1200&h=630&fit=crop',
  'natural language processing': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'computer vision': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'ki-tools': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'midjourney': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'dall-e': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'claude': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'gemini': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'chatbot': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'vergleich': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'seo': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  'automatisierung': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'code-generierung': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
  'voice ai': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'reinforcement learning': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'arbeit': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'kreativität': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'bildung': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'psychologie': 'https://images.unsplash.com/photo-1559757148-5c0d4205e1d1?w=1200&h=630&fit=crop',
  'datenschutz': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=630&fit=crop',
  'medizin': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=630&fit=crop',
  'klimawandel': 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=630&fit=crop',
  'intuition': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'kunst': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'demokratie': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  'musik': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop',
  'illusion': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'dystopie': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'utopie': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'effizienz': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'menschlichkeit': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'ethik': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'authentizität': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'macht': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'objektivität': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'einsamkeit': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'generation': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'zeit': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'humor': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'fails': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'dating': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'alltag': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'horoskope': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'memes': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'persönlichkeit': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
  'confessions': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'hausaufgaben': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'oma': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
}

// Fallback-Bilder für verschiedene Kategorien
const categoryImages: Record<string, string> = {
  'Grundlagen': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'Praktisch': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  'Tools': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'Vergleich': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'Gesellschaft': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=630&fit=crop',
  'Philosophie': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'Psychologie': 'https://images.unsplash.com/photo-1559757148-5c0d4205e1d1?w=1200&h=630&fit=crop',
  'Anwendung': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop',
  'Kreativität': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'Business': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  'Kritik': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop',
  'Zukunft': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'Ethik': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
  'Humor': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=630&fit=crop',
  'Technology': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
}

function findImageForArticle(title: string, category?: string, tags?: string[]): string {
  const titleLower = title.toLowerCase()
  
  // Suche nach passenden Keywords im Titel
  for (const [keyword, imageUrl] of Object.entries(imageKeywords)) {
    if (titleLower.includes(keyword)) {
      return imageUrl
    }
  }
  
  // Suche in Tags
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
  
  // Fallback: Kategorie-Bild
  if (category && categoryImages[category]) {
    return categoryImages[category]
  }
  
  // Default: KI/Tech Bild
  return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop'
}

async function addFeaturedImages() {
  const articles = await getAllArticles()
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  let updated = 0
  let skipped = 0

  console.log(`🖼️  Füge Featured Images zu ${articles.length} Artikeln hinzu...\n`)

  for (const article of articles) {
    const articlePath = path.join(articlesDirectory, `${article.slug}.md`)

    if (!fs.existsSync(articlePath)) {
      console.log(`⚠️  Datei nicht gefunden: ${articlePath}`)
      continue
    }

    const fileContents = fs.readFileSync(articlePath, 'utf8')
    const { data, content } = matter(fileContents)

    // Prüfe, ob bereits ein Bild vorhanden ist (egal ob lokal oder extern)
    if (data.image && data.image.trim() !== '') {
      console.log(`⏭️  ${article.title}: Bereits ein Bild vorhanden`)
      skipped++
      continue
    }
    
    // Prüfe auch, ob Bild-Datei existiert (falls kein image im frontmatter)
    const { getHeroImage } = require('../lib/getHeroImage')
    const heroImage = getHeroImage(article.slug)
    if (heroImage) {
      console.log(`⏭️  ${article.title}: Bild-Datei gefunden`)
      skipped++
      continue
    }

    // Finde passendes Bild
    const imageUrl = findImageForArticle(article.title, article.category, article.tags)

    // Aktualisiere Frontmatter
    const updatedData = {
      ...data,
      image: imageUrl,
    }

    const frontmatter = matter.stringify(content, updatedData)
    fs.writeFileSync(articlePath, frontmatter, 'utf8')

    console.log(`✅ ${article.title}: Bild hinzugefügt`)
    updated++
  }

  console.log(`\n✅ Fertig!`)
  console.log(`   Aktualisiert: ${updated} Artikel`)
  console.log(`   Übersprungen: ${skipped} Artikel (hatten bereits Bilder)`)
  console.log(`\n📝 Alle Bilder von Unsplash (kostenlos, lizenzfrei)`)
}

if (require.main === module) {
  addFeaturedImages().catch(console.error)
}

export { addFeaturedImages }

