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
    <footer className="relative bg-gradient-to-b from-[#020617] to-[#01030c] text-white mt-24 overflow-hidden">
      {/* Sternenhimmel Hintergrund */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='twinkle'%3E%3CfeGaussianBlur stdDeviation='0.5'/%3E%3C/filter%3E%3C/defs%3E%3Ccircle cx='20' cy='30' r='1' fill='white' filter='url(%23twinkle)'/%3E%3Ccircle cx='60' cy='70' r='1.5' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3Ccircle cx='50' cy='50' r='1' fill='white' opacity='0.9' filter='url(%23twinkle)'/%3E%3Ccircle cx='80' cy='10' r='1' fill='white' opacity='0.7' filter='url(%23twinkle)'/%3E%3Ccircle cx='90' cy='40' r='1.5' fill='white' opacity='0.6' filter='url(%23twinkle)'/%3E%3Ccircle cx='33' cy='60' r='1' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3Ccircle cx='15' cy='80' r='1' fill='white' opacity='0.7' filter='url(%23twinkle)'/%3E%3Ccircle cx='45' cy='90' r='1.5' fill='white' opacity='0.6' filter='url(%23twinkle)'/%3E%3Ccircle cx='75' cy='20' r='1' fill='white' opacity='0.9' filter='url(%23twinkle)'/%3E%3Ccircle cx='25' cy='50' r='1' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3Ccircle cx='120' cy='35' r='1' fill='white' opacity='0.7' filter='url(%23twinkle)'/%3E%3Ccircle cx='150' cy='65' r='1.5' fill='white' opacity='0.6' filter='url(%23twinkle)'/%3E%3Ccircle cx='170' cy='25' r='1' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3Ccircle cx='110' cy='85' r='1' fill='white' opacity='0.7' filter='url(%23twinkle)'/%3E%3Ccircle cx='130' cy='55' r='1.5' fill='white' opacity='0.6' filter='url(%23twinkle)'/%3E%3Ccircle cx='35' cy='15' r='1' fill='white' opacity='0.9' filter='url(%23twinkle)'/%3E%3Ccircle cx='95' cy='75' r='1' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3Ccircle cx='155' cy='95' r='1.5' fill='white' opacity='0.6' filter='url(%23twinkle)'/%3E%3Ccircle cx='175' cy='45' r='1' fill='white' opacity='0.7' filter='url(%23twinkle)'/%3E%3Ccircle cx='105' cy='5' r='1' fill='white' opacity='0.8' filter='url(%23twinkle)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 py-16">
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
                className="px-4 py-3 rounded-md bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-4 py-3 bg-[#fbbf24] text-slate-950 hover:bg-[#facc15] rounded-md transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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

