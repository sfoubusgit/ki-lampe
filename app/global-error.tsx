'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="de">
      <body>
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-black text-white mb-4">
              <span className="text-emerald-400">Kritischer Fehler</span>
            </h1>
            <p className="text-slate-300 mb-6 text-lg">
              {error.message || 'Ein kritischer Fehler ist aufgetreten.'}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
