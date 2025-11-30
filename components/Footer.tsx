import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-white mt-24 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-black mb-4 text-white">
              <span className="text-emerald-400">{process.env.BLOG_NAME || 'KI-Lampe'}</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {process.env.BLOG_DESCRIPTION || 'Der intelligente KI-Blog - Erleuchtung durch künstliche Intelligenz'}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-400">Navigation</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artikel" className="hover:text-emerald-400 transition-colors">
                  Artikel
                </Link>
              </li>
              <li>
                <Link href="/ueber" className="hover:text-emerald-400 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-emerald-400 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-400">Rechtliches</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/impressum" className="hover:text-emerald-400 transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-emerald-400 transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-emerald-400 transition-colors">
                  AGB
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-emerald-400">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Bleiben Sie auf dem Laufenden mit unseren neuesten Artikeln.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Ihre E-Mail"
                className="px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg transition-all text-sm font-semibold"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>
            © {currentYear} <span className="text-emerald-400">{process.env.BLOG_NAME || 'KI-Lampe'}</span>. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

