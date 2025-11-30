'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AdSidebarProps {
  adClient?: string
  adSlot: string
}

export function AdSidebar({ adClient, adSlot }: AdSidebarProps) {
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
    return null
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <div className="mb-8">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', maxWidth: '300px', height: '600px', margin: '0 auto' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="vertical"
          data-full-width-responsive="false"
        />
      </div>
    </>
  )
}

