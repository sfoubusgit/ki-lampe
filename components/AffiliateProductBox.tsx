'use client'

import { useState } from 'react'

export function AffiliateProductBox() {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className="flex flex-col gap-4 border-2 border-slate-700 p-5 rounded-xl bg-slate-800/50 my-5 max-w-[260px]"
    >
      <div className="text-center bg-slate-700/50 rounded-lg p-4">
        {imageError ? (
          <div className="w-40 h-40 bg-slate-700 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-4xl">🧱</span>
          </div>
        ) : (
          <img
            src="/images/lego-classic-box.webp"
            alt="LEGO Classic 10715 Kreativ-Bauset"
            className="max-w-full w-40 h-auto rounded-lg mx-auto"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      <h3 className="mt-0 text-lg font-bold text-white">
        LEGO Classic 10715 – Kreativ-Bauset
      </h3>

      <p className="text-sm leading-relaxed text-slate-300">
        Perfektes Set für Papa-Kind-Projekte mit ChatGPT. Ideal für kreative KI-LEGO-Bauideen.
      </p>

      <a
        href="https://amzn.to/48rIcpW"
        target="_blank"
        rel="nofollow sponsored"
        className="block px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white text-center text-base no-underline rounded-lg font-bold transition-colors"
      >
        👉 Jetzt bei Amazon ansehen
      </a>

      <p className="text-xs text-slate-400 mt-2">
        Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.
      </p>
    </div>
  )
}

