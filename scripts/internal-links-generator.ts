#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllArticles } from '../lib/articles'

/**
 * Automatically add internal links to articles based on keywords and topics
 */
class InternalLinksGenerator {
  /**
   * Find related articles based on keywords and content
   */
  findRelatedArticles(
    currentArticle: { slug: string; title: string; tags?: string[]; category?: string },
    allArticles: Array<{ slug: string; title: string; tags?: string[]; category?: string }>
  ): Array<{ slug: string; title: string; relevance: number }> {
    const related: Array<{ slug: string; title: string; relevance: number }> = []

    for (const article of allArticles) {
      if (article.slug === currentArticle.slug) continue

      let relevance = 0

      // Same category = high relevance
      if (article.category === currentArticle.category && currentArticle.category) {
        relevance += 10
      }

      // Common tags = medium relevance
      if (currentArticle.tags && article.tags) {
        const commonTags = currentArticle.tags.filter((tag) =>
          article.tags!.includes(tag)
        )
        relevance += commonTags.length * 5
      }

      // Title similarity = low relevance
      const currentWords = currentArticle.title.toLowerCase().split(/\s+/)
      const articleWords = article.title.toLowerCase().split(/\s+/)
      const commonWords = currentWords.filter((word) => articleWords.includes(word))
      relevance += commonWords.length * 2

      if (relevance > 0) {
        related.push({ slug: article.slug, title: article.title, relevance })
      }
    }

    return related.sort((a, b) => b.relevance - a.relevance).slice(0, 5)
  }

  /**
   * Add internal links to article content
   */
  addInternalLinks(
    content: string,
    relatedArticles: Array<{ slug: string; title: string }>
  ): string {
    if (relatedArticles.length === 0) return content

    // Create links section at the end
    const linksSection = `\n\n## Verwandte Artikel\n\n${relatedArticles
      .map((article) => `- [${article.title}](/artikel/${article.slug})`)
      .join('\n')}\n`

    // Check if "Verwandte Artikel" section already exists
    if (content.includes('## Verwandte Artikel')) {
      return content
    }

    return content + linksSection
  }

  /**
   * Process all articles
   */
  async processAll(): Promise<void> {
    const articles = await getAllArticles()
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    let updated = 0

    console.log(`🔗 Verarbeite ${articles.length} Artikel...\n`)

    for (const article of articles) {
      const articlePath = path.join(articlesDirectory, `${article.slug}.md`)

      if (!fs.existsSync(articlePath)) {
        console.log(`⚠️  Datei nicht gefunden: ${articlePath}`)
        continue
      }

      const fileContents = fs.readFileSync(articlePath, 'utf8')
      const { data, content } = matter(fileContents)

      // Find related articles
      const relatedArticles = this.findRelatedArticles(
        {
          slug: article.slug,
          title: article.title,
          tags: article.tags,
          category: article.category,
        },
        articles.map((a) => ({
          slug: a.slug,
          title: a.title,
          tags: a.tags,
          category: a.category,
        }))
      )

      if (relatedArticles.length === 0) {
        console.log(`⏭️  ${article.title}: Keine verwandten Artikel gefunden`)
        continue
      }

      // Add internal links
      const updatedContent = this.addInternalLinks(content, relatedArticles)

      // Only update if content changed
      if (updatedContent !== content) {
        const frontmatter = matter.stringify(updatedContent, data)
        fs.writeFileSync(articlePath, frontmatter, 'utf8')
        console.log(
          `✅ ${article.title}: ${relatedArticles.length} interne Links hinzugefügt`
        )
        updated++
      } else {
        console.log(`⏭️  ${article.title}: Bereits aktualisiert`)
      }
    }

    console.log(`\n✅ ${updated} Artikel aktualisiert`)
  }
}

async function main() {
  const generator = new InternalLinksGenerator()
  await generator.processAll()
}

if (require.main === module) {
  main()
}

export { InternalLinksGenerator }

