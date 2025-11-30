'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchBarProps {
  light?: boolean
}

export function SearchBar({ light = false }: SearchBarProps) {
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
      // Fetch all articles for client-side search
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
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Artikel suchen..."
          className={
            (light
              ? 'w-full md:w-64 px-4 py-2 pl-10 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all'
              : 'w-full md:w-64 px-4 py-2 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all')
          }
          aria-label="Artikel suchen"
        />
        <svg
          className={light ? 'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400' : 'absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500'}
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
            className={light ? 'absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700' : 'absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300'}
            aria-label="Suche zurücksetzen"
          >
            ×
          </button>
        )}
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div className={light ? 'absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto' : 'absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto'}>
          {isLoading ? (
            <div className={light ? 'p-4 text-center text-slate-600' : 'p-4 text-center text-slate-400'}>Suche...</div>
          ) : results.length > 0 ? (
            <>
              <div className={light ? 'p-2 border-b border-slate-200' : 'p-2 border-b border-slate-700'}>
                <div className={light ? 'text-xs text-slate-600' : 'text-xs text-slate-400'}>
                  {results.length} Ergebnis{results.length !== 1 ? 'se' : ''} gefunden
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {results.slice(0, 5).map((article) => (
                  <Link
                    key={article.slug}
                    href={`/artikel/${article.slug}`}
                    onClick={() => setIsOpen(false)}
                    className={light ? 'block p-4 hover:bg-slate-50 transition-colors border-b border-slate-200/50 last:border-b-0' : 'block p-4 hover:bg-slate-700/50 transition-colors border-b border-slate-700/50 last:border-b-0'}
                  >
                    <h4 className={light ? 'text-slate-800 font-semibold mb-1 line-clamp-1' : 'text-white font-semibold mb-1 line-clamp-1'}>
                      {article.title}
                    </h4>
                    <p className={light ? 'text-sm text-slate-600 line-clamp-2' : 'text-sm text-slate-400 line-clamp-2'}>
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
                <div className={light ? 'p-2 border-t border-slate-200' : 'p-2 border-t border-slate-700'}>
                  <Link
                    href={`/suche?q=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-emerald-500 hover:text-emerald-600 text-sm font-medium"
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

