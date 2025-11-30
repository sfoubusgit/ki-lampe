#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function checkArticles() {
  const articlesDir = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(articlesDir)) {
    return 0
  }
  const files = fs.readdirSync(articlesDir)
  return files.filter(f => f.endsWith('.md')).length
}

async function checkEnv() {
  const envPath = path.join(process.cwd(), '.env')
  if (!fs.existsSync(envPath)) {
    return { configured: false, missing: ['OPENAI_API_KEY', 'BLOG_NAME', 'BLOG_URL'] }
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8')
  const required = ['OPENAI_API_KEY', 'BLOG_NAME', 'BLOG_URL']
  const missing = required.filter(key => !envContent.includes(`${key}=`) || envContent.includes(`${key}=your_`))
  
  return {
    configured: missing.length === 0,
    missing,
  }
}

async function main() {
  console.log('\n🚀 Pre-Launch Checklist\n')
  console.log('='.repeat(50))
  
  // Check articles
  const articleCount = await checkArticles()
  console.log(`\n📝 Artikel: ${articleCount}`)
  if (articleCount < 20) {
    console.log(`   ⚠️  Empfehlung: Mindestens 20 Artikel vor Launch`)
    console.log(`   💡 Generiere mehr: npm run generate "Keyword"`)
  } else {
    console.log(`   ✅ Gut! Du hast genug Content`)
  }
  
  // Check environment
  const envCheck = await checkEnv()
  console.log(`\n⚙️  Konfiguration:`)
  if (envCheck.configured) {
    console.log(`   ✅ Alle wichtigen Variablen gesetzt`)
  } else {
    console.log(`   ⚠️  Fehlende Variablen: ${envCheck.missing.join(', ')}`)
    console.log(`   💡 Setze diese in .env`)
  }
  
  // Check build
  console.log(`\n🔨 Build Status:`)
  const nextDir = path.join(process.cwd(), '.next')
  if (fs.existsSync(nextDir)) {
    console.log(`   ✅ Build vorhanden`)
  } else {
    console.log(`   ⚠️  Noch kein Build - führe aus: npm run build`)
  }
  
  // Recommendations
  console.log(`\n💡 Empfehlungen:`)
  console.log(`   1. Generiere mehr Artikel (Ziel: 20-30)`)
  console.log(`   2. SEO optimieren: npm run seo:analyze`)
  console.log(`   3. Interne Links: npm run seo:internal-links`)
  console.log(`   4. Domain registrieren (ai-ape.de/com)`)
  console.log(`   5. GitHub Repository erstellen`)
  console.log(`   6. Vercel Deployment vorbereiten`)
  
  console.log(`\n📚 Weitere Infos: PRE_LAUNCH_CHECKLIST.md\n`)
  
  rl.close()
}

if (require.main === module) {
  main().catch(console.error)
}

