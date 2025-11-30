#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllArticles } from '../lib/articles'

interface SEOAnalysis {
  slug: string
  title: string
  wordCount: number
  hasMetaDescription: boolean
  metaDescriptionLength?: number
  hasH1: boolean
  h1ContainsKeyword: boolean
  internalLinks: number
  externalLinks: number
  images: number
  imagesWithAlt: number
  keywordDensity: number
  readabilityScore: number
  issues: string[]
  suggestions: string[]
}

class SEOAnalyzer {
  /**
   * Analyze a single article
   */
  async analyzeArticle(articlePath: string): Promise<SEOAnalysis> {
    const fileContents = fs.readFileSync(articlePath, 'utf8')
    const { data, content } = matter(fileContents)
    const htmlContent = content

    const issues: string[] = []
    const suggestions: string[] = []

    // Word count
    const wordCount = content.split(/\s+/).length

    // Meta description
    const hasMetaDescription = !!data.excerpt
    const metaDescriptionLength = data.excerpt?.length || 0

    if (!hasMetaDescription) {
      issues.push('Fehlende Meta Description')
    } else if (metaDescriptionLength < 120) {
      issues.push('Meta Description zu kurz (< 120 Zeichen)')
      suggestions.push('Meta Description auf 150-160 Zeichen erweitern')
    } else if (metaDescriptionLength > 160) {
      issues.push('Meta Description zu lang (> 160 Zeichen)')
    }

    // H1 check
    const h1Matches = htmlContent.match(/^#\s+(.+)$/m)
    const hasH1 = !!h1Matches
    const h1ContainsKeyword = h1Matches
      ? h1Matches[1].toLowerCase().includes((data.seoKeywords?.[0] || '').toLowerCase())
      : false

    if (!hasH1) {
      issues.push('Kein H1 gefunden')
    }

    if (!h1ContainsKeyword && data.seoKeywords?.[0]) {
      suggestions.push('Hauptkeyword sollte im H1 enthalten sein')
    }

    // Word count recommendations
    if (wordCount < 1000) {
      issues.push('Artikel zu kurz (< 1000 Wörter)')
      suggestions.push('Artikel auf mindestens 1500 Wörter erweitern für bessere SEO')
    } else if (wordCount < 1500) {
      suggestions.push('Artikel auf 2000+ Wörter erweitern für Top-Rankings')
    }

    // Internal links
    const internalLinks = (htmlContent.match(/\[([^\]]+)\]\([^h]/g) || []).length

    if (internalLinks < 3) {
      suggestions.push('Mehr interne Links hinzufügen (mindestens 3-5)')
    }

    // External links
    const externalLinks = (htmlContent.match(/\[([^\]]+)\]\(https?:\/\//g) || []).length

    if (externalLinks === 0) {
      suggestions.push('Externe Links zu autoritativen Quellen hinzufügen')
    }

    // Images
    const images = (htmlContent.match(/!\[([^\]]*)\]\(/g) || []).length
    const imagesWithAlt = (htmlContent.match(/!\[([^\]]+)\]\(/g) || []).length

    if (images > 0 && imagesWithAlt < images) {
      issues.push('Nicht alle Bilder haben Alt-Tags')
    }

    if (images === 0 && wordCount > 1500) {
      suggestions.push('Bilder hinzufügen für bessere Lesbarkeit und SEO')
    }

    // Keyword density (simple calculation)
    const mainKeyword = data.seoKeywords?.[0] || ''
    const keywordMatches = content.toLowerCase().match(
      new RegExp(mainKeyword.toLowerCase(), 'g')
    ) || []
    const keywordDensity = mainKeyword
      ? (keywordMatches.length / wordCount) * 100
      : 0

    if (keywordDensity > 3) {
      issues.push('Keyword-Dichte zu hoch (> 3%) - könnte als Spam erkannt werden')
    } else if (keywordDensity < 0.5 && mainKeyword) {
      suggestions.push('Hauptkeyword öfter natürlich einbauen')
    }

    // Readability (simple Flesch-like score)
    const sentences = content.split(/[.!?]+/).length
    const avgWordsPerSentence = wordCount / sentences
    const readabilityScore = Math.max(0, Math.min(100, 100 - avgWordsPerSentence * 2))

    if (readabilityScore < 60) {
      suggestions.push('Sätze kürzen für bessere Lesbarkeit')
    }

    return {
      slug: data.slug || path.basename(articlePath, '.md'),
      title: data.title || 'Ohne Titel',
      wordCount,
      hasMetaDescription,
      metaDescriptionLength,
      hasH1,
      h1ContainsKeyword,
      internalLinks,
      externalLinks,
      images,
      imagesWithAlt,
      keywordDensity: Math.round(keywordDensity * 100) / 100,
      readabilityScore: Math.round(readabilityScore),
      issues,
      suggestions,
    }
  }

  /**
   * Analyze all articles
   */
  async analyzeAll(): Promise<SEOAnalysis[]> {
    const articles = await getAllArticles()
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    const analyses: SEOAnalysis[] = []

    for (const article of articles) {
      const articlePath = path.join(articlesDirectory, `${article.slug}.md`)
      if (fs.existsSync(articlePath)) {
        const analysis = await this.analyzeArticle(articlePath)
        analyses.push(analysis)
      }
    }

    return analyses
  }

  /**
   * Generate report
   */
  generateReport(analyses: SEOAnalysis[]): string {
    let report = '\n📊 SEO-Analyse Report\n'
    report += '='.repeat(50) + '\n\n'

    // Overall statistics
    const totalArticles = analyses.length
    const avgWordCount = Math.round(
      analyses.reduce((sum, a) => sum + a.wordCount, 0) / totalArticles
    )
    const articlesWithIssues = analyses.filter((a) => a.issues.length > 0).length
    const avgInternalLinks = Math.round(
      analyses.reduce((sum, a) => sum + a.internalLinks, 0) / totalArticles
    )

    report += `📈 Gesamt-Statistiken:\n`
    report += `   • Artikel gesamt: ${totalArticles}\n`
    report += `   • Durchschnittliche Wortanzahl: ${avgWordCount}\n`
    report += `   • Durchschnittliche interne Links: ${avgInternalLinks}\n`
    report += `   • Artikel mit Problemen: ${articlesWithIssues} (${Math.round((articlesWithIssues / totalArticles) * 100)}%)\n\n`

    // Top issues
    const allIssues = analyses.flatMap((a) => a.issues)
    const issueCounts = allIssues.reduce((acc, issue) => {
      acc[issue] = (acc[issue] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    if (Object.keys(issueCounts).length > 0) {
      report += `⚠️  Häufigste Probleme:\n`
      const sortedIssues = Object.entries(issueCounts).sort((a, b) => b[1] - a[1])
      sortedIssues.slice(0, 5).forEach(([issue, count]) => {
        report += `   • ${issue}: ${count}x\n`
      })
      report += '\n'
    }

    // Article details
    report += `📝 Artikel-Details:\n`
    report += '-'.repeat(50) + '\n'

    analyses.forEach((analysis, index) => {
      report += `\n${index + 1}. ${analysis.title}\n`
      report += `   Slug: ${analysis.slug}\n`
      report += `   Wörter: ${analysis.wordCount}\n`
      report += `   Keyword-Dichte: ${analysis.keywordDensity}%\n`
      report += `   Lesbarkeit: ${analysis.readabilityScore}/100\n`
      report += `   Interne Links: ${analysis.internalLinks}\n`
      report += `   Externe Links: ${analysis.externalLinks}\n`
      report += `   Bilder: ${analysis.images} (${analysis.imagesWithAlt} mit Alt-Tag)\n`

      if (analysis.issues.length > 0) {
        report += `   ⚠️  Probleme:\n`
        analysis.issues.forEach((issue) => {
          report += `      • ${issue}\n`
        })
      }

      if (analysis.suggestions.length > 0) {
        report += `   💡 Vorschläge:\n`
        analysis.suggestions.forEach((suggestion) => {
          report += `      • ${suggestion}\n`
        })
      }
    })

    return report
  }
}

async function main() {
  console.log('🔍 Starte SEO-Analyse...\n')

  try {
    const analyzer = new SEOAnalyzer()
    const analyses = await analyzer.analyzeAll()
    const report = analyzer.generateReport(analyses)

    console.log(report)

    // Save report to file
    const reportPath = path.join(process.cwd(), 'seo-report.txt')
    fs.writeFileSync(reportPath, report, 'utf8')
    console.log(`\n✅ Report gespeichert: ${reportPath}`)
  } catch (error) {
    console.error('❌ Fehler bei der Analyse:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { SEOAnalyzer }

