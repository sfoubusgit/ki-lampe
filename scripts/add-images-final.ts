#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Force output
process.stdout.write('Starting...\n')

const articlesDir = path.join(process.cwd(), 'content/articles')
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))

const imageMap: Record<string, string> = {
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
  'github copilot': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
  'code-generierung': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop',
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

const defaultImage = 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop'

function findImage(title: string, tags?: string[]): string {
  const titleLower = title.toLowerCase()
  
  for (const [keyword, url] of Object.entries(imageMap)) {
    if (titleLower.includes(keyword)) {
      return url
    }
  }
  
  if (tags) {
    for (const tag of tags) {
      const tagLower = tag.toLowerCase()
      for (const [keyword, url] of Object.entries(imageMap)) {
        if (tagLower.includes(keyword)) {
          return url
        }
      }
    }
  }
  
  return defaultImage
}

let updated = 0
let skipped = 0

console.log(`🖼️  Adding images to all articles...\n`)
console.log(`📚 Processing ${files.length} articles\n`)

for (const file of files) {
  const filePath = path.join(articlesDir, file)
  const content = fs.readFileSync(filePath, 'utf8')
  const { data, content: body } = matter(content)
  
  if (data.image && data.image.trim() !== '') {
    skipped++
    continue
  }
  
  const imageUrl = findImage(data.title || '', data.tags)
  const updatedData = { ...data, image: imageUrl }
  const frontmatter = matter.stringify(body, updatedData)
  fs.writeFileSync(filePath, frontmatter, 'utf8')
  
  console.log(`✅ ${file}`)
  updated++
}

console.log(`\n✅ Done!`)
console.log(`   Updated: ${updated} articles`)
console.log(`   Skipped: ${skipped} articles (already had images)`)
