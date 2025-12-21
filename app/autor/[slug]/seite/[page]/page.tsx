import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAllAuthors, getPaginatedArticlesByAuthor } from '@/lib/articles'
import { AdBanner } from '@/components/AdBanner'
import { Pagination } from '@/components/Pagination'
import { formatDate, slugify } from '@/lib/utils'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

const siteUrl = process.env.BLOG_URL || 'https://yourblog.com'
const ARTICLES_PER_PAGE = 10

type Props = {
  params: Promise<{ slug: string; page: string }>
}

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  const params: { slug: string; page: string }[] = []

  for (const author of authors) {
    const authorSlug = slugify(author)
    const { getArticlesByAuthor } = await import('@/lib/articles')
    const articles = await getArticlesByAuthor(author)
    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)

    for (let i = 1; i <= totalPages; i++) {
      if (i > 1) {
        params.push({
          slug: authorSlug,
          page: String(i),
        })
      }
    }
  }

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, page: pageParam } = await params
  const authors = await getAllAuthors()
  const author = authors.find((a) => slugify(a) === slug)

  if (!author) {
    return {}
  }

  const page = parseInt(pageParam, 10)

  return {
    title: `Autor: ${author} - Seite ${page}`,
    description: `Alle Artikel von ${author} - Seite ${page}`,
    alternates: {
      canonical: `${siteUrl}/autor/${slug}/seite/${page}`,
    },
  }
}

export default async function AuthorPagePage({ params }: Props) {
  const { slug, page: pageParam } = await params
  const authors = await getAllAuthors()
  const author = authors.find((a) => slugify(a) === slug)

  if (!author) {
    notFound()
  }

  const page = parseInt(pageParam, 10)

  if (isNaN(page) || page < 1) {
    notFound()
  }

  if (page === 1) {
    redirect(`/autor/${slug}`)
  }

  const { articles, totalPages, currentPage, totalArticles } = 
    await getPaginatedArticlesByAuthor(author, page, ARTICLES_PER_PAGE)

  if (page > totalPages) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-b bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12 p-8 bg-slate-800 rounded-2xl border border-slate-700">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Autor: <span className="text-emerald-400">{author}</span>
          </h1>
          <p className="text-slate-300 text-lg">
            {totalArticles} Artikel • Seite {currentPage} von {totalPages}
          </p>
        </div>
        
        <AdBanner 
          placement="top" 
          adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
          adSlot="1234567896"
        />

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
                <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mb-3 font-medium">
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  {article.category && (
                    <>
                      <span className="mx-1">•</span>
                      <Link
                        href={`/kategorie/${slugify(article.category)}`}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-[4px] text-xs font-semibold border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                      >
                        {article.category}
                      </Link>
                    </>
                  )}
                  {article.tags && article.tags.filter(tag => tag !== article.category).map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${slugify(tag)}`}
                      className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-[4px] text-xs font-semibold border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
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

        <div className="text-center mt-8 text-slate-400 text-sm">
          Zeige {articles.length} von {totalArticles} Artikeln
        </div>
      </div>
    </main>
  )
}

