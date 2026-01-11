'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { ArticleImage } from './ArticleImage'
import { formatDate } from '@/lib/utils'

interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  category?: string
  tags?: string[]
}

interface ArticlesPageContentProps {
  articles: Article[]
  totalArticles: number
}

export function ArticlesPageContent({ articles, totalArticles }: ArticlesPageContentProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {t.articles.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-emerald-400">{t.articles.title.split(' ').slice(-1)[0]}</span>
        </h1>
        <p className="text-slate-300 text-lg">
          {t.articles.subtitle}
        </p>
      </div>

      {/* Artikel-Grids */}
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
              <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mb-3 font-medium">
                <time dateTime={article.date}>{formatDate(article.date)}</time>

                {article.category && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full 
                                     text-xs font-semibold border border-emerald-500/30">
                      {article.category}
                    </span>
                  </>
                )}
                {article.tags && article.tags.filter(tag => tag !== article.category).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/30"
                  >
                    {tag}
                  </span>
                ))}
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
                {t.articles.readMore}
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
            {t.articles.noArticles}
          </p>
        </div>
      )}

      <div className="text-center mt-8 text-slate-400 text-sm">
        {t.articles.showing} {articles.length} {t.articles.of} {totalArticles} {t.articles.articles}
      </div>
    </>
  )
}
