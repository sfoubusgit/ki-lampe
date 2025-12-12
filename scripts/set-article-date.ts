#!/usr/bin/env tsx
/**
 * Script to set or update article date to current date
 * 
 * Usage:
 *   tsx scripts/set-article-date.ts <slug>
 *   tsx scripts/set-article-date.ts --all
 *   tsx scripts/set-article-date.ts --new-only
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

interface ArticleFrontmatter {
  title?: string
  date?: string
  dateModified?: string
  [key: string]: any
}

/**
 * Set article date to current date
 */
function setArticleDate(slug: string, useCurrentDate: boolean = true): boolean {
  const articlePath = path.join(articlesDirectory, `${slug}.md`)
  
  if (!fs.existsSync(articlePath)) {
    console.error(`❌ Article not found: ${slug}`)
    return false
  }

  const fileContents = fs.readFileSync(articlePath, 'utf8')
  const { data, content } = matter(fileContents)

  const currentDate = new Date().toISOString()
  const oldDate = data.date

  // Update date
  const updatedData: ArticleFrontmatter = {
    ...data,
    date: currentDate,
    dateModified: currentDate,
  }

  const frontmatter = matter.stringify(content, updatedData)
  fs.writeFileSync(articlePath, frontmatter, 'utf8')

  console.log(`✅ Updated date for: ${slug}`)
  console.log(`   Old date: ${oldDate}`)
  console.log(`   New date: ${currentDate}`)
  
  return true
}

/**
 * Set date for all articles
 */
function setAllArticlesDate(onlyNew: boolean = false): void {
  if (!fs.existsSync(articlesDirectory)) {
    console.error(`❌ Articles directory not found: ${articlesDirectory}`)
    return
  }

  const files = fs.readdirSync(articlesDirectory)
  const mdFiles = files.filter(f => f.endsWith('.md'))
  
  console.log(`📝 Found ${mdFiles.length} articles\n`)

  let updated = 0
  let skipped = 0

  for (const file of mdFiles) {
    const slug = file.replace(/\.md$/, '')
    const articlePath = path.join(articlesDirectory, file)
    const fileContents = fs.readFileSync(articlePath, 'utf8')
    const { data } = matter(fileContents)

    // If onlyNew is true, skip articles that already have a date
    if (onlyNew && data.date) {
      skipped++
      continue
    }

    // Check if date is more than 30 days old (optional check)
    if (data.date) {
      const articleDate = new Date(data.date)
      const daysDiff = (Date.now() - articleDate.getTime()) / (1000 * 60 * 60 * 24)
      
      // Only update if date is more than 30 days old
      if (onlyNew && daysDiff < 30) {
        skipped++
        continue
      }
    }

    if (setArticleDate(slug, true)) {
      updated++
    }
  }

  console.log(`\n✅ Finished!`)
  console.log(`   Updated: ${updated} articles`)
  console.log(`   Skipped: ${skipped} articles`)
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log('Usage:')
    console.log('  tsx scripts/set-article-date.ts <slug>     - Update date for specific article')
    console.log('  tsx scripts/set-article-date.ts --all      - Update date for all articles')
    console.log('  tsx scripts/set-article-date.ts --new-only - Update date only for articles without date')
    process.exit(1)
  }

  const command = args[0]

  if (command === '--all') {
    console.log('🔄 Updating dates for all articles...\n')
    setAllArticlesDate(false)
  } else if (command === '--new-only') {
    console.log('🔄 Updating dates for articles without date...\n')
    setAllArticlesDate(true)
  } else {
    // Specific article slug
    const slug = command
    console.log(`🔄 Updating date for article: ${slug}\n`)
    setArticleDate(slug, true)
  }
}

if (require.main === module) {
  main()
}





