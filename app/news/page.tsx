import Link from 'next/link'
import { getPaginatedNewsArticles } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Pagination } from '@/components/Pagination'
import { ArticleImage } from '@/components/ArticleImage'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 60

const siteUrl = process.env.BLOG_URL || 'https://yourblog.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'KI News - Aktuelle Nachrichten und Updates',
    description: 'Bleibe auf dem Laufenden mit den neuesten KI-News, Updates und Entwicklungen aus der Welt der künstlichen Intelligenz',
    alternates: {
      canonical: `${siteUrl}/news`,
    },
  }
}

export default async function NewsPage() {
  // Hole nur News-Artikel (Seite 1, 10 Artikel pro Seite)
  // News-Artikel haben category: "News" oder tag: "News"
  const { articles, totalPages, currentPage, totalArticles } =
    await getPaginatedNewsArticles(1, 10)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            KI <span className="text-emerald-400">News</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Aktuelle Nachrichten, Updates und Entwicklungen aus der Welt der künstlichen Intelligenz
          </p>
        </div>

        {/* Ads */}
        <AdBanner 
          placement="top"
          adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
          adSlot="3697505106"
        />

        {/* News-Artikel-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="group bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden 
                         hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 
                         transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* HERO / Thumbnail */}
              {article.image && (
                <Link href={`/artikel/${article.slug}`}>
                  <div className="relative overflow-hidden h-56 bg-slate-700">
                    <ArticleImage
                      src={article.image}
                      alt={article.title}
                      className="object-cover group-hover:scale-105 
                                 transition-transform duration-500"
                      fill
                    />
                  </div>
                </Link>
              )}

              {/* Text Content */}
              <div className="p-6">
                <div className="flex items-center text-xs text-slate-400 mb-3 font-medium">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>

                  {article.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full 
                                       text-xs font-semibold border border-emerald-500/30">
                        {article.category}
                      </span>
                    </>
                  )}
                </div>

                <Link href={`/artikel/${article.slug}`}>
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 
                                 transition-colors leading-tight line-clamp-2">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-slate-300 mb-5 line-clamp-3 leading-relaxed text-sm">
                  {article.excerpt}
                </p>

                <Link
                  href={`/artikel/${article.slug}`}
                  className="inline-flex items-center text-emerald-400 font-semibold text-sm 
                             hover:gap-2 transition-all group-hover:underline"
                >
                  Weiterlesen
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Falls keine Artikel vorhanden */}
        {articles.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-300 text-xl">
              Noch keine News-Artikel vorhanden.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/news"
          />
        )}

        {/* Redirect to page 1 if no articles and not on page 1 */}
        {articles.length === 0 && currentPage > 1 && (
          <div className="text-center py-24">
            <p className="text-slate-300 text-xl mb-4">
              Diese Seite existiert nicht.
            </p>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg transition-all"
            >
              Zur ersten Seite
            </Link>
          </div>
        )}

        <div className="text-center mt-8 text-slate-400 text-sm">
          Zeige {articles.length} von {totalArticles} News-Artikeln
        </div>

      </div>
    </main>
  )
}
