'use client'

import { useState } from 'react'
import Image from 'next/image'

/**
 * Wiederverwendbare Affiliate-Produktbox-Komponente
 * 
 * Verwendung:
 * <AffiliateProductBox
 *   title="LEGO Classic 10715 – Kreativ-Bauset Fahrzeuge"
 *   description="Perfektes Set für Papa-Kind-Projekte mit ChatGPT. Ideal für kreative KI-LEGO-Bauideen."
 *   affiliateUrl="https://amzn.to/489ykSJ"
 *   imageSrc="/images/lego-classic-box.webp"
 *   imageAlt="LEGO Classic 10715 Kreativ-Bauset"
 * />
 * 
 * WICHTIG: 
 * - Verwende KEINE direkt von Amazon kopierten Produktbilder
 * - Keine Preise anzeigen
 * - Affiliate-Links immer mit rel="nofollow sponsored" und target="_blank"
 */
interface AffiliateProductBoxProps {
  title: string
  description: string
  affiliateUrl: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export function AffiliateProductBox({
  title,
  description,
  affiliateUrl,
  imageSrc = '/images/lego-classic-box.webp',
  imageAlt = 'LEGO Produkt',
  className = '',
}: AffiliateProductBoxProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={`flex flex-col gap-4 border-2 border-slate-700 p-5 rounded-xl bg-slate-800/50 my-5 max-w-[260px] ${className}`}
    >
      <div className="text-center bg-slate-700/50 rounded-lg p-4">
        {imageError ? (
          <div className="w-40 h-40 bg-slate-700 rounded-lg mx-auto flex items-center justify-center">
            <span className="text-4xl">🧱</span>
          </div>
        ) : (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={160}
            height={160}
            className="max-w-full w-40 h-auto rounded-lg mx-auto"
            unoptimized={imageSrc.startsWith('http')}
          />
        )}
      </div>

      <h3 className="mt-0 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-slate-300">
        {description}
      </p>

      <a
        href={affiliateUrl}
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

