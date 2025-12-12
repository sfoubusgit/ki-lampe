import Link from 'next/link'
import { Logo } from './Logo'
import { SearchBar } from './SearchBar'

export function Navigation() {
  return (
    <nav className="bg-white backdrop-blur-sm shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Logo size="md" />
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <Link
              href="/"
              className="px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all font-medium text-sm"
            >
              Home
            </Link>
            <Link
              href="/artikel"
              className="px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all font-medium text-sm"
            >
              Artikel
            </Link>
            <Link
              href="/news"
              className="px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all font-medium text-sm"
            >
              News
            </Link>
            <Link
              href="/ueber"
              className="px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all font-medium text-sm"
            >
              Über uns
            </Link>
            <Link
              href="/kontakt"
              className="px-4 py-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-all font-medium text-sm"
            >
              Kontakt
            </Link>
            <div className="ml-4">
              <SearchBar light />
            </div>
          </div>
          {/* Mobile menu with search */}
          <div className="md:hidden">
            <SearchBar light />
          </div>
        </div>
      </div>
    </nav>
  )
}

