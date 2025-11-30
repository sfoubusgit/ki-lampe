import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dotenv from 'dotenv'
import { slugify, calculateReadTime } from './utils'

// Load .env file if not already loaded
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface KeywordData {
  keyword: string
  searchVolume?: number
  competition?: 'low' | 'medium' | 'high'
  intent?: 'informational' | 'commercial' | 'transactional'
  difficulty?: number
}

interface ArticleData {
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  seoKeywords: string[]
  date: string
  author: string
  image?: string
}

export class ContentGenerator {
  private minWordCount: number
  private defaultCategory: string
  private defaultAuthor: string

  constructor() {
    this.minWordCount = parseInt(process.env.MIN_WORD_COUNT || '1500')
    this.defaultCategory = process.env.DEFAULT_CATEGORY || 'Technology'
    this.defaultAuthor = process.env.DEFAULT_AUTHOR || 'AI Content Team'
  }

  /**
   * Generate article content using AI
   */
  async generateArticle(keyword: string, options?: {
    category?: string
    tone?: string
    targetAudience?: string
    customPrompt?: string
  }): Promise<ArticleData> {
    try {
      const category = options?.category || this.defaultCategory
      const tone = options?.tone || 'professionell und zugänglich'
      const targetAudience = options?.targetAudience || 'interessierte Leser'

      // Generate title
      const titlePrompt = `Erstelle einen SEO-optimierten, ansprechenden Titel für einen Blog-Artikel zum Thema "${keyword}". 
Der Titel sollte:
- Zwischen 50-60 Zeichen lang sein
- Das Hauptkeyword enthalten
- Neugier wecken und zum Klicken einladen
- Einen klaren Mehrwert versprechen

Antworte nur mit dem Titel, ohne zusätzliche Erklärungen.`

      const titleResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: titlePrompt }],
        temperature: 0.7,
        max_tokens: 100,
      })

      const title = titleResponse.choices[0]?.message?.content?.trim() || keyword

      // Generate full article content
      const contentPrompt = options?.customPrompt || `Schreibe einen umfassenden, SEO-optimierten Blog-Artikel zum Thema "${keyword}".

Anforderungen:
- Mindestens ${this.minWordCount} Wörter
- Professioneller, aber zugänglicher Schreibstil
- Strukturiert mit klaren Überschriften (H2, H3)
- E-E-A-T Prinzipien beachten (Experience, Expertise, Authoritativeness, Trustworthiness)
- Praktische Tipps und Beispiele einbauen
- Interne Verlinkungsmöglichkeiten erwähnen
- Call-to-Action am Ende
- Keyword natürlich integriert (nicht überoptimiert)
- Markdown-Format verwenden

Struktur:
1. Einleitung (H2)
2. Hauptinhalt mit mehreren Unterabschnitten (H2, H3)
3. Praktische Anwendungen/Beispiele
4. Zusammenfassung
5. Call-to-Action

Beginne direkt mit dem Inhalt, ohne zusätzliche Erklärungen.`

      const contentResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: contentPrompt }],
        temperature: 0.8,
        max_tokens: 4000,
      })

      let content = contentResponse.choices[0]?.message?.content?.trim() || ''

      // Ensure minimum word count
      const wordCount = content.split(/\s+/).length
      if (wordCount < this.minWordCount) {
        const extensionPrompt = `Erweitere den folgenden Artikel um weitere ${this.minWordCount - wordCount} Wörter. 
Füge mehr Details, Beispiele und praktische Tipps hinzu. Behalte die bestehende Struktur bei.

Artikel:
${content}`

        const extensionResponse = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [{ role: 'user', content: extensionPrompt }],
          temperature: 0.8,
          max_tokens: 2000,
        })

        content = extensionResponse.choices[0]?.message?.content?.trim() || content
      }

      // Generate excerpt
      const excerptPrompt = `Erstelle eine kurze, ansprechende Zusammenfassung (max. 160 Zeichen) für folgenden Artikel:

${content.substring(0, 500)}...

Die Zusammenfassung sollte:
- Neugier wecken
- Den Hauptnutzen des Artikels kommunizieren
- Zum Weiterlesen einladen`

      const excerptResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: excerptPrompt }],
        temperature: 0.7,
        max_tokens: 100,
      })

      const excerpt = excerptResponse.choices[0]?.message?.content?.trim() || 
        content.substring(0, 160) + '...'

      // Generate tags
      const tagsPrompt = `Erstelle 5-7 relevante Tags für einen Artikel mit dem Titel "${title}" und dem Hauptkeyword "${keyword}".
Antworte nur mit den Tags, getrennt durch Kommas, ohne zusätzliche Erklärungen.`

      const tagsResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: tagsPrompt }],
        temperature: 0.7,
        max_tokens: 100,
      })

      const tags = tagsResponse.choices[0]?.message?.content
        ?.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0) || [keyword]

      const slug = slugify(title)
      const seoKeywords = [keyword, ...tags.slice(0, 3)]

      return {
        title,
        slug,
        content,
        excerpt,
        category,
        tags,
        seoKeywords,
        date: new Date().toISOString(),
        author: this.defaultAuthor,
      }
    } catch (error) {
      console.error('Error generating article:', error)
      throw error
    }
  }

  /**
   * Save article to file system
   */
  async saveArticle(articleData: ArticleData): Promise<string> {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    
    // Ensure directory exists
    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true })
    }

    // Build frontmatter object, filtering out undefined values
    const frontmatterData: Record<string, any> = {
      title: articleData.title,
      date: articleData.date,
      dateModified: articleData.date,
      excerpt: articleData.excerpt,
      category: articleData.category,
      tags: articleData.tags,
      author: articleData.author,
      seoKeywords: articleData.seoKeywords,
    }
    
    // Only add image if it exists
    if (articleData.image) {
      frontmatterData.image = articleData.image
    }

    const frontmatter = matter.stringify(articleData.content, frontmatterData)

    const filePath = path.join(articlesDirectory, `${articleData.slug}.md`)
    const fileContent = frontmatter

    fs.writeFileSync(filePath, fileContent, 'utf8')
    
    console.log(`✅ Article saved: ${filePath}`)
    return filePath
  }

  /**
   * Generate and save article in one step
   */
  async generateAndSave(keyword: string, options?: {
    category?: string
    tone?: string
    targetAudience?: string
  }): Promise<string> {
    const article = await this.generateArticle(keyword, options)
    return await this.saveArticle(article)
  }
}

