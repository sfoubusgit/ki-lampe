import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale/de'

export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString)
    return format(date, 'd. MMMM yyyy', { locale: de })
  } catch {
    return dateString
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  const text = content.replace(/<[^>]*>/g, '').trim()
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...'
}

