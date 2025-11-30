'use client'

import { useState, useEffect } from 'react'

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)
    // Enable ads
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookie-consent-accepted'))
    }
  }

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten. 
            Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.{' '}
            <a href="/datenschutz" className="underline hover:text-blue-300">
              Mehr erfahren
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Ablehnen
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
}

