import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllAuthors, getPaginatedArticlesByAuthor, getArticlesByAuthor } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Pagination } from '@/components/Pagination'
import { formatDate, slugify } from '@/lib/utils'
import type { Metadata } from 'next'

export const revalidate = 60

const siteUrl = process.env.BLOG_URL || 'https://yourblog.com'
const ARTICLES_PER_PAGE = 10

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ seite?: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({
    slug: slugify(author),
  }))
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const { seite } = await searchParams
  const authors = await getAllAuthors()
  const author = authors.find((a) => slugify(a) === slug)

  if (!author) {
    return {}
  }

  const page = parseInt(seite || '1', 10)
  const pageSuffix = page > 1 ? ` - Seite ${page}` : ''

  return {
    title: `Autor: ${author}${pageSuffix}`,
    description: `Alle Artikel von ${author}`,
    alternates: {
      canonical: `${siteUrl}/autor/${slug}`,
    },
  }
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { seite } = await searchParams
  const authors = await getAllAuthors()
  const author = authors.find((a) => slugify(a) === slug)

  if (!author) {
    notFound()
  }

  const page = parseInt(seite || '1', 10)
  const { articles, totalPages, currentPage, totalArticles } = 
    await getPaginatedArticlesByAuthor(author, page, ARTICLES_PER_PAGE)

  // Get all articles for author info
  const allAuthorArticles = await getArticlesByAuthor(author)

  if (page > totalPages && totalPages > 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Author Header */}
        <div className="mb-12 p-8 bg-slate-800 rounded-2xl border border-slate-700">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Autor: <span className="text-emerald-400">{author}</span>
          </h1>
          <p className="text-slate-300 text-lg mb-4">
            {totalArticles} Artikel {totalPages > 1 && `• Seite ${currentPage} von ${totalPages}`}
          </p>
          <p className="text-slate-400">
            Experte für künstliche Intelligenz und digitale Innovationen. 🐵
          </p>
        </div>
        
        <AdBanner 
          placement="top" 
          adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
          adSlot="1234567896"
        />

        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {articles.map((article) => (
                <article
                  key={article.slug}
                  className="group bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {article.image && (
                    <Link href={`/artikel/${article.slug}`}>
                      <div className="relative overflow-hidden h-56 bg-slate-700">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                          <Link
                            href={`/kategorie/${slugify(article.category)}`}
                            className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                          >
                            {article.category}
                          </Link>
                        </>
                      )}
                    </div>
                    <Link href={`/artikel/${article.slug}`}>
                      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight line-clamp-2">
                        {article.title}
                      </h2>
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

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/autor/${slug}`}
              />
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-slate-300 text-xl">
              Keine Artikel von diesem Autor gefunden.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

