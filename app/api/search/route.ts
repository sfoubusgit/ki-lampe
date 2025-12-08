import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'

export const revalidate = 60

/**
 * Client-side search API endpoint
 * Searches through article titles, excerpts, content, tags, and categories
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')?.toLowerCase().trim() || ''

  if (query.length < 2) {
    return NextResponse.json({ results: [] })
  }

  try {
    const allArticles = await getAllArticles()
    
    // Search through articles
    const results = allArticles
      .map((article) => {
        let score = 0
        const searchTerms = query.split(/\s+/).filter(Boolean)

        // Title match (highest priority)
        const titleLower = article.title.toLowerCase()
        if (titleLower.includes(query)) {
          score += 100
        }
        searchTerms.forEach((term) => {
          if (titleLower.includes(term)) score += 50
        })

        // Exact title match (even higher)
        if (titleLower === query) {
          score += 200
        }

        // Excerpt match
        const excerptLower = article.excerpt.toLowerCase()
        if (excerptLower.includes(query)) {
          score += 30
        }
        searchTerms.forEach((term) => {
          if (excerptLower.includes(term)) score += 15
        })

        // Category match
        if (article.category?.toLowerCase().includes(query)) {
          score += 40
        }

        // Tag matches
        if (article.tags) {
          article.tags.forEach((tag) => {
            const tagLower = tag.toLowerCase()
            if (tagLower.includes(query)) {
              score += 35
            }
            searchTerms.forEach((term) => {
              if (tagLower.includes(term)) score += 20
            })
          })
        }

        // Content match (lower priority, but still relevant)
        const contentLower = article.content.toLowerCase()
        searchTerms.forEach((term) => {
          const matches = (contentLower.match(new RegExp(term, 'g')) || []).length
          score += Math.min(matches * 2, 20) // Cap at 20 points per term
        })

        return { ...article, score }
      })
      .filter((article) => article.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ score, ...article }) => article) // Remove score from results

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}

