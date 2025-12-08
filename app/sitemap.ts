import { MetadataRoute } from 'next'
import { 
  getAllArticles, 
  getAllCategories, 
  getAllTags, 
  getAllAuthors,
  getArticlesByCategory,
  getArticlesByTag,
  getArticlesByAuthor,
} from '@/lib/articles'
import { slugify } from '@/lib/utils'

export const revalidate = 60

const ARTICLES_PER_PAGE = 10

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BLOG_URL || 'https://yourblog.com'
  const articles = await getAllArticles()
  const categories = await getAllCategories()
  const tags = await getAllTags()
  const authors = await getAllAuthors()

  const urls: MetadataRoute.Sitemap = []

  // Homepage
  urls.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // Search page
  urls.push({
    url: `${baseUrl}/suche`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })

  // Articles listing (page 1)
  urls.push({
    url: `${baseUrl}/artikel`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  })

  // Article pagination pages
  const totalArticlePages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  for (let page = 2; page <= totalArticlePages; page++) {
    urls.push({
      url: `${baseUrl}/artikel/seite/${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    })
  }

  // Individual articles
  articles.forEach((article) => {
    urls.push({
      url: `${baseUrl}/artikel/${article.slug}`,
      lastModified: new Date(article.dateModified || article.date),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // Category pages
  for (const category of categories) {
    const categorySlug = slugify(category)
    const categoryArticles = await getArticlesByCategory(category)
    const totalPages = Math.ceil(categoryArticles.length / ARTICLES_PER_PAGE)

    // Category main page
    urls.push({
      url: `${baseUrl}/kategorie/${categorySlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    // Category pagination pages
    for (let page = 2; page <= totalPages; page++) {
      urls.push({
        url: `${baseUrl}/kategorie/${categorySlug}/seite/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  // Tag pages
  for (const tag of tags) {
    const tagSlug = slugify(tag)
    const tagArticles = await getArticlesByTag(tag)
    const totalPages = Math.ceil(tagArticles.length / ARTICLES_PER_PAGE)

    // Tag main page
    urls.push({
      url: `${baseUrl}/tag/${tagSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    // Tag pagination pages
    for (let page = 2; page <= totalPages; page++) {
      urls.push({
        url: `${baseUrl}/tag/${tagSlug}/seite/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  // Author pages
  for (const author of authors) {
    const authorSlug = slugify(author)
    const authorArticles = await getArticlesByAuthor(author)
    const totalPages = Math.ceil(authorArticles.length / ARTICLES_PER_PAGE)

    // Author main page
    urls.push({
      url: `${baseUrl}/autor/${authorSlug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })

    // Author pagination pages
    for (let page = 2; page <= totalPages; page++) {
      urls.push({
        url: `${baseUrl}/autor/${authorSlug}/seite/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  return urls
}

