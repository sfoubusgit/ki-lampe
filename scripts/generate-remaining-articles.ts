#!/usr/bin/env tsx

import { ContentGenerator } from '../lib/content-generator'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

// Alle 50 Artikel-Themen
const allArticleTopics = [
  // BILDENDER CONTENT (15 Artikel)
  { title: 'Machine Learning für absolute Anfänger: Dein erster Schritt in die KI-Welt', type: 'bildend', category: 'Grundlagen' },
  { title: 'Neuronale Netze einfach erklärt: Wie lernt eine KI wirklich?', type: 'bildend', category: 'Grundlagen' },
  { title: 'ChatGPT richtig nutzen: 10 Profi-Tipps für bessere Ergebnisse', type: 'bildend', category: 'Praktisch' },
  { title: 'Prompt Engineering Masterclass: So bekommst du das Beste aus KI-Tools', type: 'bildend', category: 'Praktisch' },
  { title: 'Deep Learning vs. Machine Learning: Der ultimative Vergleich', type: 'bildend', category: 'Grundlagen' },
  { title: 'Natural Language Processing: Wie verstehen Computer unsere Sprache?', type: 'bildend', category: 'Grundlagen' },
  { title: 'Computer Vision erklärt: Wie KI Bilder und Videos versteht', type: 'bildend', category: 'Grundlagen' },
  { title: 'KI-Tools für Content Creator: Die komplette Übersicht 2024', type: 'bildend', category: 'Tools' },
  { title: 'Midjourney vs. DALL-E vs. Stable Diffusion: Welches Tool ist das Beste?', type: 'bildend', category: 'Vergleich' },
  { title: 'Claude vs. ChatGPT vs. Gemini: Der große KI-Chatbot Vergleich', type: 'bildend', category: 'Vergleich' },
  { title: 'KI für SEO: So optimierst du deine Website mit künstlicher Intelligenz', type: 'bildend', category: 'Praktisch' },
  { title: 'Automatisierung mit KI: 15 Aufgaben, die du sofort automatisieren kannst', type: 'bildend', category: 'Praktisch' },
  { title: 'KI-Code-Generierung: GitHub Copilot, Cursor & Co. im Praxistest', type: 'bildend', category: 'Tools' },
  { title: 'Voice AI: Wie funktionieren Sprachassistenten wie Siri und Alexa?', type: 'bildend', category: 'Grundlagen' },
  { title: 'Reinforcement Learning: Wie KI durch Versuch und Irrtum lernt', type: 'bildend', category: 'Grundlagen' },

  // VERKNÜPFENDER CONTENT (12 Artikel)
  { title: 'KI und die Zukunft der Arbeit: Welche Jobs bleiben, welche verschwinden?', type: 'verknüpfend', category: 'Gesellschaft' },
  { title: 'Kreativität vs. KI: Können Maschinen wirklich kreativ sein?', type: 'verknüpfend', category: 'Philosophie' },
  { title: 'KI in der Bildung: Revolution oder Bedrohung für das Lernen?', type: 'verknüpfend', category: 'Gesellschaft' },
  { title: 'Psychologie der KI: Warum wir Maschinen menschliche Eigenschaften zuschreiben', type: 'verknüpfend', category: 'Psychologie' },
  { title: 'KI und Datenschutz: Der Balanceakt zwischen Innovation und Privatsphäre', type: 'verknüpfend', category: 'Gesellschaft' },
  { title: 'KI in der Medizin: Wie künstliche Intelligenz Leben rettet', type: 'verknüpfend', category: 'Anwendung' },
  { title: 'KI und Klimawandel: Kann Technologie die Umwelt retten?', type: 'verknüpfend', category: 'Gesellschaft' },
  { title: 'KI vs. menschliche Intuition: Wer trifft bessere Entscheidungen?', type: 'verknüpfend', category: 'Philosophie' },
  { title: 'KI in der Kunst: Neue Ästhetik oder Ende der Kreativität?', type: 'verknüpfend', category: 'Kreativität' },
  { title: 'KI und Demokratie: Wie verändert Technologie unsere Gesellschaft?', type: 'verknüpfend', category: 'Gesellschaft' },
  { title: 'KI im Marketing: Von personalisierten Werbeanzeigen zu Chatbots', type: 'verknüpfend', category: 'Business' },
  { title: 'KI und Musik: Komponieren Maschinen die Hits der Zukunft?', type: 'verknüpfend', category: 'Kreativität' },

  // DENK-ANREGENDER CONTENT (13 Artikel)
  { title: 'Die große KI-Illusion: Was uns Technologie verspricht vs. was sie wirklich kann', type: 'denk-anregend', category: 'Kritik' },
  { title: 'KI-Dystopie oder Utopie? Eine realistische Einschätzung der Zukunft', type: 'denk-anregend', category: 'Zukunft' },
  { title: 'Effizienz vs. Menschlichkeit: Der Widerspruch der KI-Revolution', type: 'denk-anregend', category: 'Philosophie' },
  { title: 'KI und der Sinn der Arbeit: Was bleibt, wenn Maschinen alles können?', type: 'denk-anregend', category: 'Philosophie' },
  { title: 'Die KI-Blase: Wird der Hype platzen oder ist das erst der Anfang?', type: 'denk-anregend', category: 'Kritik' },
  { title: 'KI-Ethik: Wer trägt die Verantwortung, wenn Maschinen Fehler machen?', type: 'denk-anregend', category: 'Ethik' },
  { title: 'KI und Authentizität: Verlieren wir unsere Identität an Algorithmen?', type: 'denk-anregend', category: 'Philosophie' },
  { title: 'Die KI-Revolution: Warum wir jetzt handeln müssen, nicht später', type: 'denk-anregend', category: 'Zukunft' },
  { title: 'KI und Macht: Wer kontrolliert die Kontrolleure?', type: 'denk-anregend', category: 'Gesellschaft' },
  { title: 'Die Illusion der Objektivität: Warum KI-Vorurteile hat', type: 'denk-anregend', category: 'Kritik' },
  { title: 'KI und Einsamkeit: Verbindet oder isoliert uns Technologie?', type: 'denk-anregend', category: 'Gesellschaft' },
  { title: 'Die KI-Generation: Wie junge Menschen mit künstlicher Intelligenz aufwachsen', type: 'denk-anregend', category: 'Zukunft' },
  { title: 'KI und Zeit: Beschleunigt Technologie unser Leben zu sehr?', type: 'denk-anregend', category: 'Philosophie' },

  // HUMORVOLLER CONTENT (10 Artikel)
  { title: 'Wenn dein KI-Tool ehrlich wäre: 10 Dinge, die ChatGPT dir nie sagen würde', type: 'humorvoll', category: 'Humor' },
  { title: 'KI-Fails der Woche: Die lustigsten und absurdesten KI-Pannen', type: 'humorvoll', category: 'Humor' },
  { title: 'Dating mit KI: Warum dein Chatbot-Partner besser ist als dein Ex', type: 'humorvoll', category: 'Humor' },
  { title: 'KI im Alltag: 15 Situationen, in denen du dir wünschst, eine Maschine zu sein', type: 'humorvoll', category: 'Humor' },
  { title: 'Die KI-Horoskope: Was dein Lieblings-Tool über deine Zukunft sagt', type: 'humorvoll', category: 'Humor' },
  { title: 'KI-Memes erklärt: Warum wir über Maschinen lachen müssen', type: 'humorvoll', category: 'Humor' },
  { title: 'Wenn KI-Tools Menschen wären: Die Persönlichkeitstypen der künstlichen Intelligenz', type: 'humorvoll', category: 'Humor' },
  { title: 'KI-Confessions: Was passiert, wenn dein Chatbot zu viel Kaffee getrunken hat', type: 'humorvoll', category: 'Humor' },
  { title: 'Die Top 10 Ausreden, warum deine KI-Hausaufgaben nicht fertig sind', type: 'humorvoll', category: 'Humor' },
  { title: 'KI vs. deine Oma: Wer kann besser kochen, backen und Lebensweisheiten geben?', type: 'humorvoll', category: 'Humor' },
]

// Funktionen aus dem ursprünglichen Script
function getPromptForArticle(topic: any): string {
  const basePrompt = `Schreibe einen umfassenden, SEO-optimierten Blog-Artikel zum Thema "${topic.title}".

Anforderungen:
- Mindestens 1500 Wörter
- Professioneller, aber zugänglicher Schreibstil
- Strukturiert mit klaren Überschriften (H2, H3)
- E-E-A-T Prinzipien beachten
- Praktische Tipps und Beispiele einbauen
- Markdown-Format verwenden

Struktur:
1. Einleitung (H2) - Fange mit einer interessanten Frage oder einem spannenden Fakt an
2. Hauptinhalt mit mehreren Unterabschnitten (H2, H3)
3. Praktische Anwendungen/Beispiele
4. Zusammenfassung/Key Takeaways
5. Call-to-Action am Ende

`

  if (topic.type === 'bildend') {
    return basePrompt + `
Besonderer Fokus:
- Schritt-für-Schritt Erklärungen
- Konkrete Beispiele und Anwendungsfälle
- Für Einsteiger verständlich
- Praktische Tipps und Best Practices
- Screenshots/Beispiele erwähnen (wo relevant)
`
  }

  if (topic.type === 'verknüpfend') {
    return basePrompt + `
Besonderer Fokus:
- Verbindungen zwischen KI und anderen Bereichen herstellen
- Verschiedene Perspektiven darstellen
- Vergleiche und Gegenüberstellungen
- Interdisziplinäre Betrachtung
- Kontext und Hintergrundwissen
`
  }

  if (topic.type === 'denk-anregend') {
    return basePrompt + `
Besonderer Fokus:
- Klare Meinung und Haltung
- Widersprüche und Spannungen aufzeigen
- Zum Nachdenken anregen
- Verschiedene Szenarien durchspielen
- Kritische Reflexion
- Zukunftsszenarien
`
  }

  if (topic.type === 'humorvoll') {
    return basePrompt + `
Besonderer Fokus:
- Leicht ironischer, spielerischer Ton
- Humorvolle Beispiele und Szenarien
- Alltags-Situationen, überzeichnet
- Witzige Beobachtungen
- Positive, aufmunternde Stimmung
- Leser sollen schmunzeln können
- Aber trotzdem informativ und wertvoll
`
  }

  return basePrompt
}

async function getExistingArticles(): Promise<Set<string>> {
  const articlesDir = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(articlesDir)) {
    return new Set()
  }
  
  const files = fs.readdirSync(articlesDir)
  const existing = new Set<string>()
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      try {
        const filePath = path.join(articlesDir, file)
        const content = fs.readFileSync(filePath, 'utf8')
        const { data } = require('gray-matter')(content)
        if (data.title) {
          existing.add(data.title.toLowerCase().trim())
        }
      } catch (e) {
        // Ignore
      }
    }
  }
  
  return existing
}

async function generateRemainingArticles() {
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY is not set in .env file')
    process.exit(1)
  }

  const generator = new ContentGenerator()
  const existing = await getExistingArticles()
  
  // Filter out already generated articles
  const remainingTopics = allArticleTopics.filter(topic => {
    const titleLower = topic.title.toLowerCase().trim()
    return !existing.has(titleLower)
  })

  const total = remainingTopics.length
  let success = 0
  let failed = 0

  console.log(`🚀 Starte Generierung der verbleibenden ${total} Artikel...\n`)
  console.log(`📊 Bereits vorhanden: ${allArticleTopics.length - total} Artikel\n`)

  for (let i = 0; i < remainingTopics.length; i++) {
    const topic = remainingTopics[i]
    const articleNumber = i + 1

    console.log(`\n[${articleNumber}/${total}] Generiere: "${topic.title}"`)
    console.log(`   Typ: ${topic.type} | Kategorie: ${topic.category}`)

    try {
      const prompt = getPromptForArticle(topic)
      
      // Generate article with custom prompt
      const article = await generator.generateArticle(topic.title, {
        category: topic.category,
        customPrompt: prompt,
      })

      // Save article
      await generator.saveArticle(article)
      
      success++
      console.log(`   ✅ Erfolgreich gespeichert!`)
      
      // Rate limiting: Wait 3 seconds between articles
      if (i < total - 1) {
        console.log(`   ⏳ Warte 3 Sekunden...`)
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    } catch (error: any) {
      failed++
      console.error(`   ❌ Fehler: ${error.message || error}`)
      
      // Bei Verbindungsfehlern: Länger warten
      if (error.message?.includes('ENOTFOUND') || error.message?.includes('Connection')) {
        console.log(`   ⏳ Verbindungsfehler - warte 10 Sekunden...`)
        await new Promise(resolve => setTimeout(resolve, 10000))
      } else {
        // Continue with next article
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }
  }

  console.log(`\n\n✅ Generierung abgeschlossen!`)
  console.log(`   Erfolgreich: ${success}/${total}`)
  console.log(`   Fehlgeschlagen: ${failed}/${total}`)
  console.log(`\n📝 Artikel gespeichert in: content/articles/`)
}

if (require.main === module) {
  generateRemainingArticles().catch(console.error)
}

