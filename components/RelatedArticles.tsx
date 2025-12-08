import Link from 'next/link'
import Image from 'next/image'
import { getRelatedArticles } from '@/lib/articles'
import { formatDate } from '@/lib/utils'

interface RelatedArticlesProps {
  currentSlug: string
  category?: string
  tags?: string[]
}

export async function RelatedArticles({
  currentSlug,
  category,
  tags,
}: RelatedArticlesProps) {
  const related = await getRelatedArticles(currentSlug, category, tags, 3)

  if (related.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-slate-700">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
        Verwandte <span className="text-emerald-400">Artikel</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <article
            key={article.slug}
            className="group bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
          >
            {article.image && (
              <Link href={`/artikel/${article.slug}`}>
                <div className="relative overflow-hidden h-40 bg-slate-700">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            )}
            <div className="p-4">
              <div className="text-xs text-slate-400 mb-2 font-medium">
                {formatDate(article.date)}
              </div>
              <Link href={`/artikel/${article.slug}`}>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

