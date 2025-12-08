#!/usr/bin/env tsx

import { ContentGenerator } from '../lib/content-generator'
import { KeywordResearch } from '../lib/keyword-research'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
  const args = process.argv.slice(2)
  const keyword = args[0] || 'KI und Machine Learning'

  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env file')
    process.exit(1)
  }

  console.log(`🚀 Starting content generation for: "${keyword}"`)
  console.log('⏳ This may take a few minutes...\n')

  try {
    const generator = new ContentGenerator()
    const keywordResearch = new KeywordResearch()

    // Analyze keyword
    console.log('📊 Analyzing keyword...')
    const keywordData = await keywordResearch.analyzeKeyword(keyword)
    console.log(`   Keyword: ${keywordData.keyword}`)
    console.log(`   Competition: ${keywordData.competition}`)
    console.log(`   Intent: ${keywordData.intent}\n`)

    // Generate article
    console.log('✍️  Generating article content...')
    const filePath = await generator.generateAndSave(keyword, {
      category: 'Technology',
    })

    console.log(`\n✅ Successfully generated article!`)
    console.log(`   File: ${filePath}`)
    console.log(`\n📝 Next steps:`)
    console.log(`   1. Review the article: ${filePath}`)
    console.log(`   2. Add a featured image if needed`)
    console.log(`   3. Run 'npm run dev' to preview`)
  } catch (error) {
    console.error('❌ Error generating content:', error)
    process.exit(1)
  }
}

main()

