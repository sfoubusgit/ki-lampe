'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-black text-white mb-4">
          <span className="text-emerald-400">Oops!</span> Etwas ist schiefgelaufen
        </h1>
        <p className="text-slate-300 mb-6 text-lg">
          {error.message || 'Ein unerwarteter Fehler ist aufgetreten.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  )
}
