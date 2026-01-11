'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HeaderSearchBar } from './HeaderSearchBar'
import { useLanguage } from '@/contexts/LanguageContext'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/artikel', label: t.nav.articles },
    { href: '/news', label: t.nav.news },
    { href: '/ueber', label: t.nav.about },
    { href: '/kontakt', label: t.nav.contact },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de')
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Glassmorphism Header */}
      <div className="relative">
        {/* Main Header Bar */}
        <div className="relative bg-gradient-to-b from-emerald-600/10 via-emerald-500/5 to-transparent backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 group"
                aria-label="KI.LAMPE — Home"
              >
                {/* Logo Text */}
                <span className="font-black text-xl md:text-2xl tracking-tight leading-none flex items-center">
                  <span className="text-white">KI</span>
                  <span className="inline-block mx-1 align-middle shrink-0">
                    <Image
                      src="/logo/logo-icon.svg"
                      alt=""
                      width={32}
                      height={32}
                      className="transition-all duration-300 group-hover:scale-125 cursor-pointer"
                      style={{
                        filter: 'drop-shadow(0 0 0px rgba(251, 191, 36, 0))',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 40px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.3))';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(251, 191, 36, 0))';
                      }}
                    />
                  </span>
                  <span className="text-white">LAMPE</span>
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav
                className="hidden lg:flex items-center space-x-1 flex-1 justify-center"
                aria-label="Hauptnavigation"
              >
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                        active
                          ? 'text-white bg-cyan-500/15'
                          : 'text-slate-200/80 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Desktop: Search + Language Toggle + CTA */}
              <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                {/* Search Field - Glass Style */}
                <HeaderSearchBar />

                {/* Language Toggle Button */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-sm font-medium text-slate-200 hover:text-white transition-all duration-200"
                  aria-label="Switch language"
                  title={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <span className="font-semibold">{language === 'de' ? 'DE' : 'EN'}</span>
                </button>

                {/* CTA Button */}
                <Link
                  href="/artikel"
                  className="rounded-full bg-[#fbbf24] hover:bg-[#facc15] text-sm font-semibold text-slate-950 px-4 py-2 shadow-lg shadow-amber-400/40 transition-all duration-200 hover:shadow-amber-400/60 hover:scale-105"
                >
                  {t.hero.discoverArticles}
                </Link>
              </div>

              {/* Mobile: Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/40 transition-colors"
                aria-label="Menü öffnen"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Glass Sheet */}
        <div
          className={`lg:hidden fixed inset-0 top-16 md:top-20 z-50 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Sheet */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-slate-950/80 backdrop-blur-2xl border-l border-cyan-500/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full overflow-y-auto">
              {/* Mobile Search */}
              <div className="p-4 border-b border-slate-800/50">
                <HeaderSearchBar />
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 px-4 py-6" aria-label="Mobile Navigation">
                <ul className="space-y-2">
                  {navLinks.map((link) => {
                    const active = isActive(link.href)
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                            active
                              ? 'text-white bg-cyan-500/20 border-l-2 border-cyan-400'
                              : 'text-slate-200 hover:text-white hover:bg-slate-800/40'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              {/* Mobile Language Toggle + CTA */}
              <div className="p-4 border-t border-slate-800/50 space-y-3">
                {/* Language Toggle */}
                <button
                  onClick={() => {
                    toggleLanguage()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 text-base font-medium text-slate-200 hover:text-white transition-all duration-200"
                  aria-label="Switch language"
                  title={language === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln'}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  <span className="font-semibold">{language === 'de' ? 'DE' : 'EN'}</span>
                </button>
                {/* CTA Button */}
                <Link
                  href="/artikel"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center rounded-full bg-[#fbbf24] hover:bg-[#facc15] text-base font-semibold text-slate-950 px-6 py-3 shadow-lg shadow-amber-400/40 transition-all duration-200"
                >
                  {t.hero.discoverArticles}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

