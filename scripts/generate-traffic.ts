#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getAllArticles, getArticle } from '../lib/articles'

/**
 * Traffic-Generierungs-System für einzelne Artikel
 * Erstellt Social Media Posts, Reddit-Posts, SEO-Optimierungen und mehr
 */
class TrafficGenerator {
  private outputDir: string

  constructor() {
    this.outputDir = path.join(process.cwd(), 'traffic-content')
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }
  }

  /**
   * Generiere Social Media Posts für einen Artikel
   */
  generateSocialMediaPosts(article: {
    title: string
    excerpt: string
    slug: string
    tags?: string[]
    category?: string
  }): {
    linkedin: string
    twitter: string
    reddit: string
    facebook: string
  } {
    const url = `https://ki-lampe.com/artikel/${article.slug}`
    const hashtags = article.tags?.slice(0, 3).map(t => `#${t.replace(/\s+/g, '')}`).join(' ') || '#KI #Tech'

    // LinkedIn Post (professionell, länger)
    const linkedin = `${article.title}

${article.excerpt}

💡 Warum das wichtig ist:
Dieser Artikel zeigt dir, wie du ${article.title.toLowerCase()} - ohne teure Hardware oder komplizierte Setup-Prozesse.

✅ Was du lernst:
• Schritt-für-Schritt Anleitung
• Praktische Tipps und Tricks
• Häufige Fehler vermeiden

🔗 Vollständigen Artikel lesen: ${url}

${hashtags}

#KünstlicheIntelligenz #TechTutorial #Lernen`

    // Twitter/X Post (kurz, prägnant)
    const twitter = `🚀 ${article.title}

${article.excerpt.substring(0, 200)}...

👉 ${url}

${hashtags}`

    // Reddit Post (wertvoll, nicht zu promotional)
    const reddit = `**${article.title}**

Ich habe kürzlich einen umfassenden Guide geschrieben, wie man ${article.title.toLowerCase()}.

**Was dich erwartet:**
• Komplette Schritt-für-Schritt-Anleitung
• Praktische Beispiele und Tipps
• Häufige Probleme und Lösungen

Der Artikel ist für Einsteiger geschrieben und erklärt alles von Grund auf. Falls ihr Fragen habt oder Feedback, lasst es mich wissen!

[Link zum Artikel](${url})`

    // Facebook Post (freundlich, einladend)
    const facebook = `🎯 ${article.title}

${article.excerpt}

In diesem Artikel zeige ich dir, wie du ${article.title.toLowerCase()} - auch ohne teure Hardware!

Was dich erwartet:
✅ Einfache Schritt-für-Schritt-Anleitung
✅ Praktische Tipps für den Einstieg
✅ Häufige Fehler vermeiden

Lies den vollständigen Artikel hier: ${url}

${hashtags}`

    return { linkedin, twitter, reddit, facebook }
  }

  /**
   * Generiere Reddit-Post für spezifische Subreddits
   */
  generateRedditPosts(article: {
    title: string
    slug: string
    category?: string
    tags?: string[]
  }): Record<string, string> {
    const url = `https://ki-lampe.com/artikel/${article.slug}`
    const posts: Record<string, string> = {}

    // r/StableDiffusion
    posts['r/StableDiffusion'] = `**${article.title}**

Hey Community! Ich habe einen ausführlichen Guide geschrieben, wie man Stable Diffusion auf CPU nutzt - ohne GPU.

**Warum das relevant ist:**
Nicht jeder hat eine High-End-GPU, aber Stable Diffusion funktioniert auch auf CPU (etwas langsamer, aber funktioniert).

**Was im Guide drin ist:**
• Komplette Installation für Windows/Mac/Linux
• Konfiguration für CPU-Nutzung
• Performance-Optimierungen
• Troubleshooting-Tipps

Falls ihr Fragen habt oder Verbesserungsvorschläge, lasst es mich wissen!

[Vollständiger Guide](${url})`

    // r/MachineLearning
    posts['r/MachineLearning'] = `**${article.title}**

Ich habe einen praktischen Guide erstellt, der zeigt, wie man Stable Diffusion auch ohne GPU nutzen kann.

**Zielgruppe:** Einsteiger, die keine teure Hardware haben, aber trotzdem mit KI-Bildgenerierung experimentieren wollen.

**Inhalt:**
• Installation ohne GPU-Anforderungen
• CPU-Optimierungen
• Praktische Anwendungsbeispiele

Feedback und Diskussionen sind willkommen!

[Link zum Artikel](${url})`

    // r/learnmachinelearning
    posts['r/learnmachinelearning'] = `**Tutorial: ${article.title}**

Für alle, die Stable Diffusion ausprobieren wollen, aber keine GPU haben: Dieser Guide zeigt, wie es trotzdem funktioniert.

**Was du lernst:**
• Installation auf normalem PC/Laptop
• CPU-Konfiguration
• Erste Schritte mit Stable Diffusion

Perfekt für Einsteiger! 🚀

[Komplette Anleitung](${url})`

    return posts
  }

  /**
   * Generiere SEO-Optimierungsvorschläge
   */
  generateSEORecommendations(article: {
    title: string
    slug: string
    tags?: string[]
    seoKeywords?: string[]
  }): string[] {
    const recommendations: string[] = []

    // Meta Description Check
    recommendations.push('✅ Meta Description: Stelle sicher, dass die Meta Description 150-160 Zeichen hat und das Hauptkeyword enthält')

    // Interne Verlinkung
    recommendations.push('✅ Interne Links: Füge 3-5 Links zu verwandten Artikeln hinzu (z.B. "Stable Diffusion Tutorial", "KI-Bildgenerierung")')

    // Bilder
    recommendations.push('✅ Bilder: Stelle sicher, dass alle Bilder Alt-Tags mit relevanten Keywords haben')

    // Schema Markup
    recommendations.push('✅ Schema Markup: Füge "HowTo" Schema Markup hinzu, da es ein Tutorial-Artikel ist')

    // Externe Links
    recommendations.push('✅ Externe Links: Füge 2-3 Links zu autoritativen Quellen hinzu (z.B. Stable Diffusion GitHub, offizielle Dokumentation)')

    // LSI Keywords
    if (article.seoKeywords && article.seoKeywords.length > 0) {
      recommendations.push(`✅ LSI Keywords: Nutze verwandte Begriffe wie "WebUI", "Automatic1111", "Diffusion Model", "Text-to-Image"`)
    }

    return recommendations
  }

  /**
   * Generiere Community-Engagement-Strategie
   */
  generateCommunityStrategy(article: {
    title: string
    slug: string
    category?: string
  }): string {
    return `## Community-Engagement-Strategie für "${article.title}"

### 1. Reddit (Woche 1)
**Subreddits:**
- r/StableDiffusion (Hauptzielgruppe)
- r/MachineLearning (größere Reichweite)
- r/learnmachinelearning (Einsteiger)
- r/artificial (breitere KI-Community)

**Strategie:**
- Poste in r/StableDiffusion am Dienstag oder Mittwoch (beste Engagement-Zeiten)
- Antworte auf alle Kommentare innerhalb von 2 Stunden
- Stelle Fragen, um Diskussionen anzuregen
- Teile den Post nicht mehr als 1x pro Subreddit

### 2. Twitter/X (Woche 1-2)
**Hashtags:**
- #StableDiffusion
- #AIGeneratedArt
- #MachineLearning
- #TechTutorial

**Strategie:**
- Poste 2-3x mit unterschiedlichen Hooks
- Nutze Threads für mehr Engagement
- Retweete relevante Tweets und füge deinen Link hinzu
- Engagiere dich in Diskussionen zu Stable Diffusion

### 3. LinkedIn (Woche 1)
**Strategie:**
- Poste am Dienstag oder Mittwoch, 8-10 Uhr
- Kommentiere in relevanten Gruppen (KI, Machine Learning, Tech)
- Teile den Post in 2-3 Gruppen (nicht mehr!)

### 4. Discord Communities
**Server:**
- Stable Diffusion Discord
- AI Art Communities
- Machine Learning Discord Server

**Strategie:**
- Stelle dich vor, bevor du Content teilst
- Biete Hilfe an, bevor du deinen Link postest
- Teile in "Showcase" oder "Resources" Channels

### 5. YouTube (Optional, aber effektiv)
**Strategie:**
- Erstelle ein kurzes Video (5-10 Min) basierend auf dem Artikel
- Zeige den Prozess visuell
- Link zum Artikel in der Beschreibung
- Nutze ähnliche Keywords wie im Artikel

### 6. Hacker News (Vorsichtig!)
**Strategie:**
- Nur wenn der Artikel wirklich wertvoll ist
- Poste am frühen Morgen (US-Zeit)
- Erwarte harte Kritik - sei vorbereitet
- Antworte konstruktiv auf alle Kommentare

### Timing:
- **Tag 1:** Reddit (r/StableDiffusion)
- **Tag 2:** Twitter Thread
- **Tag 3:** LinkedIn Post
- **Tag 4:** Reddit (r/learnmachinelearning)
- **Tag 5:** Twitter Follow-up
- **Tag 6:** Discord Communities
- **Tag 7:** Analyse & Optimierung`
  }

  /**
   * Generiere Backlink-Outreach-Email
   */
  generateOutreachEmail(article: {
    title: string
    slug: string
  }): string {
    const url = `https://ki-lampe.com/artikel/${article.slug}`
    
    return `Betreff: Wertvoller Guide: ${article.title}

Hallo [Name],

ich habe deinen Artikel über [verwandtes Thema] auf [Website] gelesen und fand ihn sehr hilfreich.

Ich habe kürzlich einen umfassenden Guide zu "${article.title}" geschrieben, der deine Leser interessieren könnte. Der Artikel enthält:

• Komplette Schritt-für-Schritt-Anleitung
• Praktische Tipps und Best Practices
• Häufige Probleme und Lösungen

Falls du den Artikel teilen möchtest oder einen Link in deinem Artikel hinzufügen willst, wäre das großartig!

Link: ${url}

Falls du Fragen hast oder Feedback, lass es mich gerne wissen.

Beste Grüße,
[Dein Name]

---

**Alternative (kürzer):**

Hallo [Name],

ich habe einen ausführlichen Guide zu "${article.title}" geschrieben, der perfekt zu deinem Artikel über [Thema] passt.

Falls du ihn teilen möchtest: ${url}

Beste Grüße,
[Dein Name]`
  }

  /**
   * Hauptfunktion: Generiere alle Traffic-Inhalte für einen Artikel
   */
  async generateForArticle(slug: string): Promise<void> {
    console.log(`🚀 Generiere Traffic-Content für: ${slug}\n`)

    const article = await getArticle(slug)
    if (!article) {
      console.error(`❌ Artikel nicht gefunden: ${slug}`)
      return
    }

    console.log(`📄 Artikel: ${article.title}\n`)

    // Social Media Posts
    console.log('📱 Generiere Social Media Posts...')
    const socialPosts = this.generateSocialMediaPosts(article)
    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-social-media.md`),
      `# Social Media Posts für: ${article.title}\n\n` +
      `## LinkedIn\n\`\`\`\n${socialPosts.linkedin}\n\`\`\`\n\n` +
      `## Twitter/X\n\`\`\`\n${socialPosts.twitter}\n\`\`\`\n\n` +
      `## Reddit (Allgemein)\n\`\`\`\n${socialPosts.reddit}\n\`\`\`\n\n` +
      `## Facebook\n\`\`\`\n${socialPosts.facebook}\n\`\`\`\n`
    )

    // Reddit Posts für spezifische Subreddits
    console.log('🔴 Generiere Reddit-Posts für Subreddits...')
    const redditPosts = this.generateRedditPosts(article)
    let redditContent = `# Reddit-Posts für: ${article.title}\n\n`
    for (const [subreddit, post] of Object.entries(redditPosts)) {
      redditContent += `## ${subreddit}\n\`\`\`\n${post}\n\`\`\`\n\n`
    }
    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-reddit.md`),
      redditContent
    )

    // SEO-Empfehlungen
    console.log('🔍 Generiere SEO-Empfehlungen...')
    const seoRecs = this.generateSEORecommendations(article)
    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-seo.md`),
      `# SEO-Optimierungen für: ${article.title}\n\n` +
      seoRecs.map(r => `- ${r}`).join('\n') + '\n'
    )

    // Community-Strategie
    console.log('👥 Generiere Community-Strategie...')
    const communityStrategy = this.generateCommunityStrategy(article)
    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-community-strategy.md`),
      communityStrategy
    )

    // Outreach-Email
    console.log('📧 Generiere Outreach-Email...')
    const outreachEmail = this.generateOutreachEmail(article)
    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-outreach-email.md`),
      `# Outreach-Email für: ${article.title}\n\n\`\`\`\n${outreachEmail}\n\`\`\`\n`
    )

    // Zusammenfassung
    const summary = `# Traffic-Generierungs-Plan für: ${article.title}

**Artikel-URL:** https://ki-lampe.com/artikel/${slug}

## ✅ Generierte Inhalte

1. ✅ Social Media Posts (LinkedIn, Twitter, Reddit, Facebook)
2. ✅ Reddit-Posts für spezifische Subreddits
3. ✅ SEO-Optimierungsvorschläge
4. ✅ Community-Engagement-Strategie
5. ✅ Backlink-Outreach-Email

## 📁 Dateien

Alle generierten Inhalte findest du im Ordner \`traffic-content/\`:

- \`${slug}-social-media.md\` - Social Media Posts
- \`${slug}-reddit.md\` - Reddit-Posts für Subreddits
- \`${slug}-seo.md\` - SEO-Empfehlungen
- \`${slug}-community-strategy.md\` - Community-Strategie
- \`${slug}-outreach-email.md\` - Outreach-Email Template

## 🚀 Nächste Schritte

### Diese Woche:
1. **Tag 1:** Poste auf Reddit (r/StableDiffusion)
2. **Tag 2:** Twitter Thread veröffentlichen
3. **Tag 3:** LinkedIn Post
4. **Tag 4:** SEO-Optimierungen umsetzen
5. **Tag 5:** Interne Verlinkung optimieren

### Dieser Monat:
1. Community-Engagement-Strategie umsetzen
2. 5-10 Backlink-Outreach-Emails senden
3. Social Media Posts regelmäßig teilen
4. Analytics überwachen und optimieren

## 📊 Tracking

Überwache folgende Metriken:
- Organischer Traffic (Google Analytics)
- Social Media Engagement
- Reddit Upvotes/Kommentare
- Backlinks (Ahrefs/SEMrush)

Viel Erfolg! 🎯
`

    fs.writeFileSync(
      path.join(this.outputDir, `${slug}-summary.md`),
      summary
    )

    console.log(`\n✅ Traffic-Content erfolgreich generiert!`)
    console.log(`📁 Alle Dateien im Ordner: traffic-content/`)
    console.log(`\n📋 Zusammenfassung: traffic-content/${slug}-summary.md`)
  }

  /**
   * Liste alle Artikel auf und zeige Traffic-Potenzial
   */
  async listArticlesWithPotential(): Promise<void> {
    const articles = await getAllArticles()
    
    console.log(`\n📊 Artikel mit Traffic-Potenzial:\n`)
    
    // Sortiere nach Kriterien für Traffic-Potenzial
    const articlesWithScore = articles.map(article => {
      let score = 0
      
      // Hat SEO Keywords = +10
      if (article.seoKeywords && article.seoKeywords.length > 0) {
        score += 10
      }
      
      // Hat Tags = +5
      if (article.tags && article.tags.length > 0) {
        score += 5
      }
      
      // Hat Kategorie = +3
      if (article.category) {
        score += 3
      }
      
      // Tutorial/Anleitung in Titel = +15
      if (article.title.toLowerCase().includes('anleitung') || 
          article.title.toLowerCase().includes('tutorial') ||
          article.title.toLowerCase().includes('guide') ||
          article.title.toLowerCase().includes('wie')) {
        score += 15
      }
      
      // Praktisch/Anwendbar = +10
      if (article.category === 'Praktisch' || 
          article.tags?.some(t => t.toLowerCase().includes('tutorial'))) {
        score += 10
      }
      
      return { article, score }
    })
    
    articlesWithScore
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach(({ article, score }, index) => {
        console.log(`${index + 1}. ${article.title}`)
        console.log(`   Score: ${score} | Slug: ${article.slug}`)
        console.log(`   Kategorie: ${article.category || 'Keine'} | Tags: ${article.tags?.slice(0, 3).join(', ') || 'Keine'}\n`)
      })
  }
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]
  const slug = args[1]

  const generator = new TrafficGenerator()

  if (command === 'list' || !command) {
    await generator.listArticlesWithPotential()
    console.log(`\n💡 Nutze: npm run traffic:generate <slug>`)
    console.log(`   Beispiel: npm run traffic:generate stable-diffusion-auf-cpu-nutzen-komplette-anleitung-ohne-gpu`)
  } else if (command === 'generate' && slug) {
    await generator.generateForArticle(slug)
  } else {
    console.log('❌ Ungültiger Befehl')
    console.log('\nVerfügbare Befehle:')
    console.log('  npm run traffic:list                    - Liste Artikel mit Traffic-Potenzial')
    console.log('  npm run traffic:generate <slug>         - Generiere Traffic-Content für einen Artikel')
    console.log('\nBeispiel:')
    console.log('  npm run traffic:generate stable-diffusion-auf-cpu-nutzen-komplette-anleitung-ohne-gpu')
  }
}

// Execute main function when script is run directly
main().catch((error) => {
  console.error('❌ Fehler:', error)
  process.exit(1)
})

export { TrafficGenerator }



