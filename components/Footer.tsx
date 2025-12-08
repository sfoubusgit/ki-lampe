'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message || 'Vielen Dank für Ihre Anmeldung!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Ein Fehler ist aufgetreten.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    }
  }

  return (
    <footer className="bg-slate-900 text-white mt-24 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-black mb-4 text-white">
              <span className="text-white">KI</span>
              <span className="text-amber-400">.</span>
              <span className="text-white">LAMPE</span>
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ihre E-Mail"
                disabled={status === 'loading'}
                className="px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-3 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Wird verarbeitet...' : 'Abonnieren'}
              </button>
              {message && (
                <p
                  className={`text-sm mt-2 ${
                    status === 'success'
                      ? 'text-emerald-400'
                      : status === 'error'
                      ? 'text-red-400'
                      : 'text-slate-400'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>
            © {currentYear} <span className="text-white">KI</span><span className="text-amber-400">.</span><span className="text-white">LAMPE</span>. Alle Rechte vorbehalten.
          </p>
          <p className="mt-4 text-slate-400">
            Hinweis: Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.
          </p>
        </div>
      </div>
    </footer>
  )
}

