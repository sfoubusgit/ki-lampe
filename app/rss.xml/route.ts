import { getAllArticles } from '@/lib/articles'

export async function GET() {
  const articles = await getAllArticles()
  const baseUrl = process.env.BLOG_URL || 'https://yourblog.com'
  const siteName = process.env.BLOG_NAME || 'AI Blog'
  const siteDescription = process.env.BLOG_DESCRIPTION || 'AI-powered blog'

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName}</title>
    <description>${siteDescription}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/artikel/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/artikel/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      ${article.category ? `<category><![CDATA[${article.category}]]></category>` : ''}
      ${article.image ? `<enclosure url="${article.image}" type="image/jpeg" />` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}

