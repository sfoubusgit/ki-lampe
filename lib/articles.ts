import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { slugify, calculateReadTime, extractExcerpt } from './utils'
import { getHeroImage } from './getHeroImage'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  title: string
  date: string
  dateModified?: string
  excerpt: string
  content: string
  category?: string
  tags?: string[]
  author?: string
  image?: string
  readTime?: number
  seoKeywords?: string[]
}

async function getArticleSlugs(): Promise<string[]> {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(articlesDirectory)
  return fileNames
    .filter((name) => {
      // Exclude README.md and other non-article files
      const lowerName = name.toLowerCase()
      if (lowerName === 'readme.md' || lowerName === 'readme.mdx') {
        return false
      }
      return name.endsWith('.md') || name.endsWith('.mdx')
    })
    .map((name) => name.replace(/\.(md|mdx)$/, ''))
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML with timeout
    let htmlContent: string
    try {
      // Add timeout to prevent hanging
      const processPromise = remark().use(remarkHtml).process(content)
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
      )
      
      const processedContent = await Promise.race([processPromise, timeoutPromise])
      htmlContent = processedContent.toString()
    } catch (error) {
      console.error(`Error processing markdown for ${slug}:`, error)
      // Fallback: Use content as-is if processing fails
      htmlContent = content.replace(/\n/g, '<br>')
    }

    // Get image from frontmatter or fallback to slug-based lookup
    // Clean the image URL (remove quotes, trim whitespace)
    let image = data.image || getHeroImage(slug) || null
    if (image) {
      image = String(image).trim().replace(/^['"]|['"]$/g, '')
    }

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      dateModified: data.dateModified || data.date,
      excerpt: data.excerpt || extractExcerpt(htmlContent),
      content: htmlContent,
      category: data.category,
      tags: data.tags || [],
      author: data.author,
      image: image,
      readTime: calculateReadTime(htmlContent),
      seoKeywords: data.seoKeywords || [],
    }
  } catch (error) {
    console.error(`Error reading article ${slug}:`, error)
    return null
  }
}

// Cache for articles to improve performance
let articlesCache: Article[] | null = null
let cacheTimestamp: number = 0
let cacheFileModTimes: Map<string, number> = new Map()
const CACHE_DURATION = 30 * 1000 // 30 seconds (reduced for faster updates during development)

// Function to clear cache manually
export function clearArticlesCache() {
  articlesCache = null
  cacheTimestamp = 0
  cacheFileModTimes.clear()
}

/**
 * Check if any article files have been modified since cache was created
 */
async function hasArticlesChanged(): Promise<boolean> {
  const currentModTimes = new Map<string, number>()
  
  if (!fs.existsSync(articlesDirectory)) {
    return true
  }
  
  const fileNames = fs.readdirSync(articlesDirectory)
  const mdFiles = fileNames.filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
  
  for (const fileName of mdFiles) {
    const filePath = path.join(articlesDirectory, fileName)
    try {
      const stats = fs.statSync(filePath)
      const modTime = stats.mtimeMs
      currentModTimes.set(fileName, modTime)
      
      // Check if this file's mod time has changed
      const cachedModTime = cacheFileModTimes.get(fileName)
      if (cachedModTime !== modTime) {
        return true // File has changed
      }
    } catch (error) {
      // If we can't access a file, assume changed
      return true
    }
  }
  
  // Check if any files were deleted (exist in cache but not in filesystem)
  for (const [fileName] of cacheFileModTimes) {
    if (!currentModTimes.has(fileName)) {
      return true // File was deleted
    }
  }
  
  return false
}

export async function getAllArticles(): Promise<Article[]> {
  const now = Date.now()
  
  // Check if cache is still valid based on:
  // 1. Time-based expiration (short duration)
  // 2. File modification times
  const cacheAge = now - cacheTimestamp
  const isTimeValid = cacheAge < CACHE_DURATION
  const filesUnchanged = articlesCache ? !(await hasArticlesChanged()) : false
  
  if (articlesCache && isTimeValid && filesUnchanged) {
    return articlesCache
  }

  const slugs = await getArticleSlugs()
  
  // Update file modification times cache
  cacheFileModTimes.clear()
  for (const slug of slugs) {
    const filePath = path.join(articlesDirectory, `${slug}.md`)
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        cacheFileModTimes.set(`${slug}.md`, stats.mtimeMs)
      }
    } catch (error) {
      // Skip files that can't be accessed
    }
  }
  
  // Process articles in batches to avoid overwhelming the system
  const batchSize = 10
  const articles: (Article | null)[] = []
  
  for (let i = 0; i < slugs.length; i += batchSize) {
    const batch = slugs.slice(i, i + batchSize)
    const batchResults = await Promise.all(
      batch.map(async (slug) => {
        try {
          return await getArticle(slug)
        } catch (error) {
          console.error(`Error loading article ${slug}:`, error)
          return null
        }
      })
    )
    articles.push(...batchResults)
  }

  const filteredArticles = articles
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      // Use dateModified if available, otherwise use date
      // This ensures recently updated articles appear first
      const dateA = new Date(a.dateModified || a.date).getTime()
      const dateB = new Date(b.dateModified || b.date).getTime()
      return dateB - dateA // Sort descending (newest first)
    })

  // Update cache
  articlesCache = filteredArticles
  cacheTimestamp = now

  return filteredArticles
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter((article) => article.category === category)
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(
    (article) => article.tags && article.tags.includes(tag)
  )
}

export async function getArticlesByAuthor(author: string): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter(
    (article) => article.author && article.author.toLowerCase() === author.toLowerCase()
  )
}

/**
 * Get paginated articles
 * @param page Page number (1-indexed)
 * @param pageSize Number of articles per page
 * @returns Object with articles for the page and pagination info
 */
export async function getPaginatedArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
}> {
  const allArticles = await getAllArticles()
  const totalArticles = allArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = allArticles.slice(startIndex, endIndex)

  return {
    articles,
    totalPages,
    currentPage,
    totalArticles,
  }
}

/**
 * Get all unique categories from articles
 */
export async function getAllCategories(): Promise<string[]> {
  const allArticles = await getAllArticles()
  const categories = allArticles
    .map((article) => article.category)
    .filter((category): category is string => !!category)
  
  // Get unique categories
  return Array.from(new Set(categories)).sort()
}

/**
 * Get all unique tags from articles
 */
export async function getAllTags(): Promise<string[]> {
  const allArticles = await getAllArticles()
  const allTags = allArticles
    .flatMap((article) => article.tags || [])
    .filter((tag): tag is string => !!tag)
  
  // Get unique tags
  return Array.from(new Set(allTags)).sort()
}

/**
 * Get all unique authors from articles
 */
export async function getAllAuthors(): Promise<string[]> {
  const allArticles = await getAllArticles()
  const authors = allArticles
    .map((article) => article.author)
    .filter((author): author is string => !!author)
  
  // Get unique authors
  return Array.from(new Set(authors)).sort()
}

/**
 * Get paginated articles by category
 */
export async function getPaginatedArticlesByCategory(
  category: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
}> {
  const categoryArticles = await getArticlesByCategory(category)
  const totalArticles = categoryArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = categoryArticles.slice(startIndex, endIndex)

  return {
    articles,
    totalPages,
    currentPage,
    totalArticles,
  }
}

/**
 * Get paginated articles by tag
 */
export async function getPaginatedArticlesByTag(
  tag: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
}> {
  const tagArticles = await getArticlesByTag(tag)
  const totalArticles = tagArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = tagArticles.slice(startIndex, endIndex)

  return {
    articles,
    totalPages,
    currentPage,
    totalArticles,
  }
}

/**
 * Get paginated articles by author
 */
export async function getPaginatedArticlesByAuthor(
  author: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
}> {
  const authorArticles = await getArticlesByAuthor(author)
  const totalArticles = authorArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = authorArticles.slice(startIndex, endIndex)

  return {
    articles,
    totalPages,
    currentPage,
    totalArticles,
  }
}

/**
 * Get all news articles (articles with category "News" or tag "News")
 */
export async function getNewsArticles(): Promise<Article[]> {
  const allArticles = await getAllArticles()
  return allArticles.filter((article) => 
    article.category === 'News' || 
    (article.tags && article.tags.includes('News'))
  )
}

/**
 * Get paginated news articles
 */
export async function getPaginatedNewsArticles(
  page: number = 1,
  pageSize: number = 10
): Promise<{
  articles: Article[]
  totalPages: number
  currentPage: number
  totalArticles: number
}> {
  const newsArticles = await getNewsArticles()
  const totalArticles = newsArticles.length
  const totalPages = Math.ceil(totalArticles / pageSize)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const articles = newsArticles.slice(startIndex, endIndex)

  return {
    articles,
    totalPages,
    currentPage,
    totalArticles,
  }
}

/**
 * Get related articles based on category and tags
 * Priority: category > tags > random
 */
export async function getRelatedArticles(
  currentSlug: string,
  category?: string,
  tags?: string[],
  limit: number = 3
): Promise<Article[]> {
  const allArticles = await getAllArticles()
  const currentArticle = allArticles.find((a) => a.slug === currentSlug)
  
  if (!currentArticle) return []

  // Filter out current article
  let related = allArticles.filter((article) => article.slug !== currentSlug)

  // Priority 1: Same category
  if (category) {
    const categoryMatches = related.filter((article) => article.category === category)
    if (categoryMatches.length >= limit) {
      return categoryMatches.slice(0, limit)
    }
    // If not enough, combine with tag matches
    related = categoryMatches
  }

  // Priority 2: Same tags
  if (tags && tags.length > 0) {
    const tagMatches = related.filter((article) => 
      article.tags && article.tags.some((tag) => tags.includes(tag))
    )
    
    // Combine category and tag matches, remove duplicates
    const combined = [...related, ...tagMatches]
    const unique = combined.filter((article, index, self) =>
      index === self.findIndex((a) => a.slug === article.slug)
    )
    
    if (unique.length >= limit) {
      return unique.slice(0, limit)
    }
    related = unique
  }

  // Fallback: Random articles if not enough matches
  if (related.length < limit) {
    const remaining = allArticles
      .filter((article) => 
        article.slug !== currentSlug && 
        !related.some((r) => r.slug === article.slug)
      )
    const shuffled = remaining.sort(() => 0.5 - Math.random())
    related = [...related, ...shuffled].slice(0, limit)
  }

  return related.slice(0, limit)
}

