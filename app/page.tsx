import { getAllArticles, getAllCategories } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Hero } from '@/components/Hero'
import { HomeContent } from '@/components/HomeContent'

export const revalidate = 0 // Disable cache for development - ensures latest articles show immediately

export default async function Home() {
  const articles = await getAllArticles()
  // Limit articles for homepage to improve performance
  const featuredArticles = articles.slice(0, 6)
  
  // Get popular categories (most articles per category)
  const categories = await getAllCategories()
  const categoryCounts = categories.map(category => ({
    name: category,
    count: articles.filter(article => article.category === category).length
  }))
  const popularCategories = categoryCounts
    .sort((a, b) => b.count - a.count)
    .slice(0, 6) // Top 6 categories

  return (
    <main className="min-h-screen bg-[#020617]">
      {/* Hero Section - Cyber Neon Design */}
      <Hero />

      {/* Ad Banner Top */}
      <AdBanner 
        placement="top" 
        adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        adSlot="1234567890"
      />

      <HomeContent
        popularCategories={popularCategories}
        featuredArticles={featuredArticles}
        totalArticles={articles.length}
      />

      {/* Ad Banner Middle */}
      <AdBanner 
        placement="middle" 
        adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        adSlot="1234567891"
      />
    </main>
  )
}

