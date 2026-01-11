import { getPaginatedArticles } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Pagination } from '@/components/Pagination'
import { ArticlesPageContent } from '@/components/ArticlesPageContent'
import type { Metadata } from 'next'

export const revalidate = 0 // Disable cache to ensure latest articles show immediately

const siteUrl = process.env.BLOG_URL || 'https://yourblog.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Alle Artikel',
    description: 'Entdecke unsere gesamte Artikel-Sammlung über künstliche Intelligenz',
    alternates: {
      canonical: `${siteUrl}/artikel`,
    },
  }
}

export default async function ArticlesPage() {
  // Hole Seite 1 (10 Artikel pro Seite)
  const { articles, totalPages, currentPage, totalArticles } =
    await getPaginatedArticles(1, 10)

  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Ads */}
        <AdBanner 
          placement="top"
          adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
          adSlot="1234567896"
        />

        <ArticlesPageContent articles={articles} totalArticles={totalArticles} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/artikel"
          />
        )}
      </div>
    </main>
  )
}