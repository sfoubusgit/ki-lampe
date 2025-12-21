'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function HeaderSearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Handle search
  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)
    
    if (searchQuery.length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    setIsOpen(true)

    try {
      const response = await fetch('/api/search?q=' + encodeURIComponent(searchQuery))
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim().length >= 2) {
      router.push(`/suche?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative w-64">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Artikel suchen..."
          className="w-full px-4 pl-9 py-2 text-sm bg-slate-900/40 border border-slate-700/60 rounded-2xl text-slate-100 placeholder:text-slate-400 backdrop-blur focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          aria-label="Artikel suchen"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
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
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Suche zurücksetzen"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-slate-400">Suche...</div>
          ) : results.length > 0 ? (
            <>
              <div className="p-2 border-b border-slate-700/50">
                <div className="text-xs text-slate-400">
                  {results.length} Ergebnis{results.length !== 1 ? 'se' : ''} gefunden
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/artikel/${article.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-4 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50 last:border-b-0"
                  >
                    <h4 className="text-white font-semibold mb-1 line-clamp-1">
                      {article.title}
                    </h4>
                    <p className="text-sm text-slate-400 line-clamp-2">
                      {article.excerpt}
                    </p>
                    {article.category && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                        {article.category}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {results.length > 5 && (
                <div className="p-2 border-t border-slate-700/50">
                  <Link
                    href={`/suche?q=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                  >
                    Alle {results.length} Ergebnisse anzeigen →
                  </Link>
                </div>
              )}
            </>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-slate-400">
              Keine Ergebnisse gefunden
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

