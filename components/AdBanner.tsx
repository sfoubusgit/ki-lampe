'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdBannerProps {
  placement: string
  adClient?: string
  adSlot: string
  format?: string
  responsive?: boolean
}

export function AdBanner({
  placement,
  adClient,
  adSlot,
  format = 'auto',
  responsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  if (!adClient) {
    return (
      <div className="ad-container bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-sm">Ad Platzhalter: {placement}</p>
      </div>
    )
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div className="ad-container">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </>
  )
}

