import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

/**
 * Reusable Pagination Component
 * Displays page numbers and prev/next navigation
 */
export function Pagination({ currentPage, totalPages, baseUrl, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null

  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      className={`flex items-center justify-center gap-2 mt-12 ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      {prevPage ? (
        <Link
          href={prevPage === 1 ? baseUrl : `${baseUrl}/seite/${prevPage}`}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-all font-medium"
          aria-label="Vorherige Seite"
        >
          ← Zurück
        </Link>
      ) : (
        <span className="px-4 py-2 bg-slate-800/50 text-slate-500 rounded-lg border border-slate-700/50 cursor-not-allowed">
          ← Zurück
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-500"
                aria-hidden="true"
              >
                ...
              </span>
            )
          }

          const pageNum = page as number
          const isActive = pageNum === currentPage
          const pageUrl = pageNum === 1 ? baseUrl : `${baseUrl}/seite/${pageNum}`

          return (
            <Link
              key={pageNum}
              href={pageUrl}
              className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                isActive
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50'
              }`}
              aria-label={`Seite ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          )
        })}
      </div>

      {/* Next Button */}
      {nextPage ? (
        <Link
          href={`${baseUrl}/seite/${nextPage}`}
          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg border border-slate-700 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-all font-medium"
          aria-label="Nächste Seite"
        >
          Weiter →
        </Link>
      ) : (
        <span className="px-4 py-2 bg-slate-800/50 text-slate-500 rounded-lg border border-slate-700/50 cursor-not-allowed">
          Weiter →
        </span>
      )}
    </nav>
  )
}

