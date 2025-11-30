#!/usr/bin/env tsx

import cron from 'node-cron'
import { ContentGenerator } from '../lib/content-generator'
import { KeywordResearch } from '../lib/keyword-research'
import { getAllArticles } from '../lib/articles'
import dotenv from 'dotenv'

dotenv.config()

const AUTO_POST_ENABLED = process.env.AUTO_POST_ENABLED === 'true'
const POST_INTERVAL_HOURS = parseInt(process.env.POST_INTERVAL_HOURS || '24')
const MAX_ARTICLES_PER_DAY = parseInt(process.env.MAX_ARTICLES_PER_DAY || '3')

// Predefined keyword pool for content generation
const KEYWORD_POOL = [
  'Künstliche Intelligenz',
  'Machine Learning',
  'Deep Learning',
  'Neuronale Netze',
  'Natural Language Processing',
  'Computer Vision',
  'Robotics',
  'Autonomes Fahren',
  'ChatGPT',
  'Generative AI',
  'Prompt Engineering',
  'Data Science',
  'Big Data',
  'Cloud Computing',
  'Cybersecurity',
  'Blockchain',
  'Kryptowährungen',
  'Web3',
  'Metaverse',
  'IoT',
  'Smart Home',
  '5G Technologie',
  'Quantencomputing',
  'Biotechnologie',
  'Nachhaltige Technologie',
]

class ContentScheduler {
  private generator: ContentGenerator
  private keywordResearch: KeywordResearch
  private articlesGeneratedToday: number = 0
  private lastResetDate: Date = new Date()

  constructor() {
    this.generator = new ContentGenerator()
    this.keywordResearch = new KeywordResearch()
  }

  /**
   * Reset daily counter if needed
   */
  private resetDailyCounter() {
    const today = new Date().toDateString()
    if (this.lastResetDate.toDateString() !== today) {
      this.articlesGeneratedToday = 0
      this.lastResetDate = new Date()
    }
  }

  /**
   * Select a keyword that hasn't been used yet
   */
  private async selectUnusedKeyword(): Promise<string | null> {
    const existingArticles = await getAllArticles()
    const usedKeywords = new Set(
      existingArticles.map(article => article.title.toLowerCase())
    )

    // Shuffle and find unused keyword
    const shuffled = [...KEYWORD_POOL].sort(() => Math.random() - 0.5)
    
    for (const keyword of shuffled) {
      // Check if we already have an article with this keyword
      const isUsed = Array.from(usedKeywords).some(used => 
        used.includes(keyword.toLowerCase())
      )
      
      if (!isUsed) {
        return keyword
      }
    }

    // If all keywords are used, generate a variation
    const baseKeyword = KEYWORD_POOL[Math.floor(Math.random() * KEYWORD_POOL.length)]
    const variations = await this.keywordResearch.generateKeywordIdeas(baseKeyword, 5)
    
    for (const variation of variations) {
      const isUsed = Array.from(usedKeywords).some(used => 
        used.includes(variation.toLowerCase())
      )
      
      if (!isUsed) {
        return variation
      }
    }

    return null
  }

  /**
   * Generate a single article
   */
  async generateArticle(): Promise<void> {
    this.resetDailyCounter()

    if (this.articlesGeneratedToday >= MAX_ARTICLES_PER_DAY) {
      console.log(`⏸️  Daily limit reached (${MAX_ARTICLES_PER_DAY} articles)`)
      return
    }

    try {
      const keyword = await this.selectUnusedKeyword()
      
      if (!keyword) {
        console.log('⚠️  No unused keywords found. Consider expanding keyword pool.')
        return
      }

      console.log(`\n🚀 Generating article for: "${keyword}"`)
      console.log(`📊 Progress: ${this.articlesGeneratedToday + 1}/${MAX_ARTICLES_PER_DAY} today`)

      const filePath = await this.generator.generateAndSave(keyword, {
        category: 'Technology',
      })

      this.articlesGeneratedToday++
      console.log(`✅ Article generated: ${filePath}`)
      console.log(`📈 Total articles today: ${this.articlesGeneratedToday}`)
    } catch (error) {
      console.error('❌ Error generating article:', error)
    }
  }

  /**
   * Start the scheduler
   */
  start() {
    if (!AUTO_POST_ENABLED) {
      console.log('⏸️  Auto-posting is disabled. Set AUTO_POST_ENABLED=true to enable.')
      return
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is not set. Cannot generate content.')
      return
    }

    console.log('🤖 Content Scheduler started')
    console.log(`📅 Schedule: Every ${POST_INTERVAL_HOURS} hours`)
    console.log(`📊 Max articles per day: ${MAX_ARTICLES_PER_DAY}`)

    // Generate initial article
    this.generateArticle()

    // Schedule recurring generation
    const cronExpression = `0 */${POST_INTERVAL_HOURS} * * *`
    
    cron.schedule(cronExpression, () => {
      this.generateArticle()
    })

    console.log(`✅ Scheduler running. Next article in ${POST_INTERVAL_HOURS} hours.`)
  }
}

// Run scheduler if executed directly
if (require.main === module) {
  const scheduler = new ContentScheduler()
  scheduler.start()

  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down scheduler...')
    process.exit(0)
  })
}

export { ContentScheduler }

