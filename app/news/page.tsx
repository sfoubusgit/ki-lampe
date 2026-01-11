import { getPaginatedNewsArticles } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Pagination } from '@/components/Pagination'
import { NewsPageContent } from '@/components/NewsPageContent'
import type { Metadata } from 'next'

export const revalidate = 0 // Disable cache to ensure latest articles show immediately

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
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Ads */}
        <AdBanner 
          placement="top"
          adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
          adSlot="3697505106"
        />

        <NewsPageContent 
          articles={articles} 
          totalArticles={totalArticles}
          currentPage={currentPage}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/news"
          />
        )}
      </div>
    </main>
  )
}
