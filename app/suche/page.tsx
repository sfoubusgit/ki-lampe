'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface SearchResult {
  slug: string
  title: string
  excerpt: string
  date: string
  category?: string
  tags?: string[]
  image?: string
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length >= 2) {
      window.history.pushState({}, '', `/suche?q=${encodeURIComponent(searchQuery.trim())}`)
      performSearch(searchQuery.trim())
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            <span className="text-emerald-400">Suche</span>
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSubmit} className="max-w-2xl mt-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Artikel durchsuchen..."
                className="w-full px-6 py-4 pl-12 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
              >
                Suchen
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div>
            {isLoading ? (
              <div className="text-center py-24">
                <p className="text-slate-300 text-xl">Suche läuft...</p>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="mb-6 text-slate-300">
                  <p>
                    <span className="font-semibold">{results.length}</span> Ergebnis
                    {results.length !== 1 ? 'se' : ''} für &quot;
                    <span className="text-emerald-400">{query}</span>&quot;
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map((article) => (
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
                              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30">
                                {article.category}
                              </span>
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
              </>
            ) : (
              <div className="text-center py-24">
                <p className="text-slate-300 text-xl mb-4">
                  Keine Ergebnisse für &quot;
                  <span className="text-emerald-400">{query}</span>&quot; gefunden.
                </p>
                <p className="text-slate-400">
                  Versuche es mit anderen Suchbegriffen.
                </p>
              </div>
            )}
          </div>
        )}

        {!query && (
          <div className="text-center py-24">
            <p className="text-slate-300 text-xl">
              Gib einen Suchbegriff ein, um Artikel zu finden.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-24">
            <p className="text-slate-300 text-xl">Lade Suche...</p>
          </div>
        </div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  )
}

