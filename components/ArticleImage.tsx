'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  width?: number
  height?: number
  fill?: boolean
}

export function ArticleImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy', 
  priority = false,
  width,
  height,
  fill = false
}: ArticleImageProps) {
  // Clean the URL (remove quotes if any)
  const cleanSrc = src.trim().replace(/^['"]|['"]$/g, '')
  const [imgSrc, setImgSrc] = useState(cleanSrc)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Fallback to placeholder
      const placeholderUrl = `https://via.placeholder.com/${width || 800}x${height || 450}/0f172a/10b981?text=${encodeURIComponent(alt.substring(0, 50))}`
      setImgSrc(placeholderUrl)
    }
  }

  // Build className for fill mode
  const finalClassName = fill 
    ? `${className} w-full h-full object-cover`
    : className

  // Use Next.js Image component for optimization
  // Note: Next.js Image doesn't support onError, so we use unoptimized for external images or handle errors differently
  if (hasError) {
    // Fallback to placeholder
    const placeholderUrl = `https://via.placeholder.com/${width || 800}x${height || 450}/0f172a/10b981?text=${encodeURIComponent(alt.substring(0, 50))}`
    if (fill) {
      return (
        <div className={finalClassName} style={{ background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="text-emerald-400 text-sm">Bild konnte nicht geladen werden</span>
        </div>
      )
    }
    return (
      <div className={finalClassName} style={{ width: width || 800, height: height || 450, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="text-emerald-400 text-sm">Bild konnte nicht geladen werden</span>
      </div>
    )
  }

  // For external images, use unoptimized to avoid optimization issues
  const isExternal = imgSrc.startsWith('http') && !imgSrc.includes('via.placeholder.com')
  
  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={finalClassName}
        priority={priority}
        style={{ objectFit: 'cover' }}
        unoptimized={isExternal}
      />
    )
  }
  
  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={finalClassName}
      width={width || 800}
      height={height || 450}
      priority={priority}
      unoptimized={isExternal}
    />
  )
}
