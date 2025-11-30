#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import { getAllArticles } from '../lib/articles'

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'warning'
  message: string
}

const results: TestResult[] = []

function addResult(name: string, status: 'pass' | 'fail' | 'warning', message: string) {
  results.push({ name, status, message })
}

async function runTests() {
  console.log('🧪 Starte finale Tests...\n')

  // Test 1: Artikel vorhanden
  console.log('📝 Test 1: Artikel vorhanden...')
  const articles = await getAllArticles()
  if (articles.length >= 30) {
    addResult('Artikel Anzahl', 'pass', `${articles.length} Artikel gefunden`)
  } else if (articles.length >= 20) {
    addResult('Artikel Anzahl', 'warning', `${articles.length} Artikel gefunden (empfohlen: 30+)`)
  } else {
    addResult('Artikel Anzahl', 'fail', `Nur ${articles.length} Artikel gefunden (mindestens 20 empfohlen)`)
  }

  // Test 2: Alle Artikel haben Bilder
  console.log('🖼️  Test 2: Featured Images...')
  const articlesWithImages = articles.filter(a => a.image && a.image.trim() !== '')
  const imagePercentage = (articlesWithImages.length / articles.length) * 100
  if (imagePercentage >= 95) {
    addResult('Featured Images', 'pass', `${articlesWithImages.length}/${articles.length} Artikel haben Bilder (${Math.round(imagePercentage)}%)`)
  } else {
    addResult('Featured Images', 'warning', `Nur ${articlesWithImages.length}/${articles.length} Artikel haben Bilder (${Math.round(imagePercentage)}%)`)
  }

  // Test 3: Alle Artikel haben Kategorien
  console.log('📂 Test 3: Kategorien...')
  const articlesWithCategories = articles.filter(a => a.category)
  if (articlesWithCategories.length === articles.length) {
    addResult('Kategorien', 'pass', `Alle ${articles.length} Artikel haben Kategorien`)
  } else {
    addResult('Kategorien', 'warning', `${articlesWithCategories.length}/${articles.length} Artikel haben Kategorien`)
  }

  // Test 4: Alle Artikel haben Excerpts
  console.log('📄 Test 4: Excerpts...')
  const articlesWithExcerpts = articles.filter(a => a.excerpt && a.excerpt.length > 20)
  if (articlesWithExcerpts.length === articles.length) {
    addResult('Excerpts', 'pass', `Alle ${articles.length} Artikel haben Excerpts`)
  } else {
    addResult('Excerpts', 'warning', `${articlesWithExcerpts.length}/${articles.length} Artikel haben Excerpts`)
  }

  // Test 5: .env Datei vorhanden
  console.log('🔐 Test 5: Environment Variables...')
  const envPath = path.join(process.cwd(), '.env')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    const hasOpenAIKey = envContent.includes('OPENAI_API_KEY')
    const hasBlogName = envContent.includes('BLOG_NAME')
    
    if (hasOpenAIKey && hasBlogName) {
      addResult('Environment Variables', 'pass', '.env Datei vorhanden mit wichtigen Variablen')
    } else {
      addResult('Environment Variables', 'warning', '.env Datei vorhanden, aber einige Variablen fehlen')
    }
  } else {
    addResult('Environment Variables', 'fail', '.env Datei nicht gefunden')
  }

  // Test 6: Build funktioniert
  console.log('🏗️  Test 6: Build-Check...')
  const nextDir = path.join(process.cwd(), '.next')
  if (fs.existsSync(nextDir)) {
    addResult('Build', 'pass', 'Build-Verzeichnis vorhanden (npm run build wurde ausgeführt)')
  } else {
    addResult('Build', 'warning', 'Build-Verzeichnis nicht gefunden (führe npm run build aus)')
  }

  // Test 7: Sitemap vorhanden
  console.log('🗺️  Test 7: Sitemap...')
  const sitemapPath = path.join(process.cwd(), 'app', 'sitemap.ts')
  if (fs.existsSync(sitemapPath)) {
    addResult('Sitemap', 'pass', 'Sitemap-Datei vorhanden')
  } else {
    addResult('Sitemap', 'fail', 'Sitemap-Datei nicht gefunden')
  }

  // Test 8: Robots.txt vorhanden
  console.log('🤖 Test 8: Robots.txt...')
  const robotsPath = path.join(process.cwd(), 'app', 'robots.ts')
  if (fs.existsSync(robotsPath)) {
    addResult('Robots.txt', 'pass', 'Robots.txt-Datei vorhanden')
  } else {
    addResult('Robots.txt', 'fail', 'Robots.txt-Datei nicht gefunden')
  }

  // Test 9: RSS Feed vorhanden
  console.log('📡 Test 9: RSS Feed...')
  const rssPath = path.join(process.cwd(), 'app', 'rss.xml', 'route.ts')
  if (fs.existsSync(rssPath)) {
    addResult('RSS Feed', 'pass', 'RSS Feed vorhanden')
  } else {
    addResult('RSS Feed', 'fail', 'RSS Feed nicht gefunden')
  }

  // Test 10: Durchschnittliche Artikel-Länge
  console.log('📊 Test 10: Artikel-Länge...')
  const avgLength = articles.reduce((sum, a) => sum + (a.content?.length || 0), 0) / articles.length
  const avgWords = Math.round(avgLength / 5) // Geschätzt: 5 Zeichen pro Wort
  if (avgWords >= 1000) {
    addResult('Artikel-Länge', 'pass', `Durchschnittlich ${avgWords} Wörter pro Artikel`)
  } else if (avgWords >= 800) {
    addResult('Artikel-Länge', 'warning', `Durchschnittlich ${avgWords} Wörter pro Artikel (empfohlen: 1000+)`)
  } else {
    addResult('Artikel-Länge', 'warning', `Durchschnittlich ${avgWords} Wörter pro Artikel (empfohlen: 1000+)`)
  }

  // Ergebnisse anzeigen
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST-ERGEBNISSE')
  console.log('='.repeat(60) + '\n')

  const passed = results.filter(r => r.status === 'pass').length
  const warnings = results.filter(r => r.status === 'warning').length
  const failed = results.filter(r => r.status === 'fail').length

  results.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌'
    console.log(`${icon} ${result.name}: ${result.message}`)
  })

  console.log('\n' + '='.repeat(60))
  console.log(`✅ Bestanden: ${passed}`)
  console.log(`⚠️  Warnungen: ${warnings}`)
  console.log(`❌ Fehler: ${failed}`)
  console.log('='.repeat(60) + '\n')

  if (failed === 0 && warnings <= 2) {
    console.log('🎉 Alle wichtigen Tests bestanden! Bereit für Launch! 🚀\n')
    return 0
  } else if (failed === 0) {
    console.log('✅ Grundlegende Tests bestanden. Einige Warnungen vorhanden, aber Launch möglich.\n')
    return 0
  } else {
    console.log('⚠️  Einige Tests fehlgeschlagen. Bitte behebe die Fehler vor dem Launch.\n')
    return 1
  }
}

if (require.main === module) {
  runTests().catch(console.error)
}

export { runTests }

