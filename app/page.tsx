import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { ArticleImage } from '@/components/ArticleImage'
import { formatDate } from '@/lib/utils'

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function Home() {
  const articles = await getAllArticles()
  // Limit articles for homepage to improve performance
  const featuredArticles = articles.slice(0, 6)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section - Dark Theme with Green Accents */}
      <section className="py-24 px-4 border-b border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Willkommen bei <span className="text-emerald-400 whitespace-nowrap">KI.LAMPE</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Der intelligente KI-Blog 💡<br />
            Erleuchtung durch künstliche Intelligenz
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/artikel"
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-0.5"
            >
              Artikel entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Banner Top */}
      <AdBanner 
        placement="top" 
        adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
        adSlot="1234567890"
      />

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

