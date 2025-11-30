'use client'

import { useState } from 'react'

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

  // Use regular img tag for better compatibility with external images
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={finalClassName}
      loading={loading}
      width={fill ? undefined : (width || 800)}
      height={fill ? undefined : (height || 450)}
      onError={handleError}
      style={fill ? { objectFit: 'cover' } : undefined}
    />
  )
}
