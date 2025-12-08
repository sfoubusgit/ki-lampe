import Link from 'next/link'
import { getAllArticles, getAllCategories } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { ArticleImage } from '@/components/ArticleImage'
import { Hero } from '@/components/Hero'
import { formatDate, slugify } from '@/lib/utils'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section - Cyber Neon Design */}
      <Hero />

      {/* Ad Banner Top */}
      <AdBanner 
        placement="top" 
        adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        adSlot="1234567890"
      />

      {/* Popular Topics Section */}
      {popularCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16 border-b border-slate-700">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
              Beliebte <span className="text-emerald-400">Themen</span>
            </h2>
            <p className="text-slate-300 text-base">Entdecke unsere meistgelesenen Kategorien</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category) => (
              <Link
                key={category.name}
                href={`/kategorie/${slugify(category.name)}`}
                className="group relative bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 flex items-center justify-center mb-3 transition-colors">
                    <svg
                      className="w-6 h-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {category.count} {category.count === 1 ? 'Artikel' : 'Artikel'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Articles - Dark Card Design with Green Accents */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Aktuelle <span className="text-emerald-400">Artikel</span>
          </h2>
          <p className="text-slate-300 text-lg">Die neuesten Insights und Expertentipps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="group bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              {article.image && (
                <Link href={`/artikel/${article.slug}`}>
                  <div className="relative overflow-hidden h-56 bg-slate-700">
                    <ArticleImage
                      src={article.image}
                      alt={article.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      fill
                    />
                  </div>
                </Link>
              )}
              <div className="p-6">
                <div className="flex items-center text-xs text-slate-400 mb-3 font-medium">
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  {article.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30">
                        {article.category}
                      </span>
                    </>
                  )}
                </div>
                <Link href={`/artikel/${article.slug}`}>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-slate-300 mb-5 line-clamp-3 leading-relaxed text-sm">
                  {article.excerpt}
                </p>
                <Link
                  href={`/artikel/${article.slug}`}
                  className="inline-flex items-center text-emerald-400 font-semibold text-sm hover:gap-2 transition-all group-hover:underline"
                >
                  Weiterlesen
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Ad Banner Middle */}
      <AdBanner 
        placement="middle" 
        adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        adSlot="1234567891"
      />

      {/* More Articles Link */}
      {articles.length > 6 && (
        <section className="max-w-7xl mx-auto px-4 py-12 text-center border-t border-slate-700">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-0.5"
          >
            Alle Artikel anzeigen ({articles.length})
            <span>→</span>
          </Link>
        </section>
      )}
    </main>
  )
}

