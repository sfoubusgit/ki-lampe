import { getAllArticles, getArticle } from './lib/articles'

async function testArticle() {
  console.log('Testing article loading...')
  
  // Test 1: Check if article exists in list
  const allArticles = await getAllArticles()
  console.log(`Total articles found: ${allArticles.length}`)
  
  const targetSlug = 'stable-diffusion-auf-cpu-nutzen-komplette-anleitung-ohne-gpu'
  const foundArticle = allArticles.find(a => a.slug === targetSlug)
  
  if (foundArticle) {
    console.log('✅ Article found in getAllArticles()')
    console.log(`Title: ${foundArticle.title}`)
    console.log(`Date: ${foundArticle.date}`)
  } else {
    console.log('❌ Article NOT found in getAllArticles()')
    console.log('Available slugs (first 10):')
    allArticles.slice(0, 10).forEach(a => console.log(`  - ${a.slug}`))
  }
  
  // Test 2: Try to load article directly
  const article = await getArticle(targetSlug)
  if (article) {
    console.log('✅ Article loaded successfully with getArticle()')
    console.log(`Title: ${article.title}`)
  } else {
    console.log('❌ Article could NOT be loaded with getArticle()')
  }
}

testArticle().catch(console.error)
