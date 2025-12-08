#!/usr/bin/env tsx

import fs from 'fs'
import path from 'path'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function setupGoogleAnalytics() {
  console.log('\n📊 Google Analytics Setup\n')
  console.log('='.repeat(50))
  console.log('\nSchritte:')
  console.log('1. Gehe zu: https://analytics.google.com')
  console.log('2. Klicke auf "Messung starten"')
  console.log('3. Erstelle ein Property für deine Website')
  console.log('4. Kopiere die Measurement ID (Format: G-XXXXXXXXXX)')
  console.log('\n')

  const gaId = await question('Google Analytics Measurement ID (G-XXXXXXXXXX): ')

  if (gaId && gaId.startsWith('G-')) {
    const envPath = path.join(process.cwd(), '.env')
    let envContent = ''

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8')
    }

    // Update or add GA ID
    if (envContent.includes('NEXT_PUBLIC_GA_ID=')) {
      envContent = envContent.replace(
        /NEXT_PUBLIC_GA_ID=.*/,
        `NEXT_PUBLIC_GA_ID=${gaId}`
      )
    } else {
      envContent += `\nNEXT_PUBLIC_GA_ID=${gaId}\n`
    }

    fs.writeFileSync(envPath, envContent, 'utf8')
    console.log('\n✅ Google Analytics ID wurde in .env gespeichert!')
    console.log('   Starte den Server neu, damit die Änderungen wirksam werden.\n')
  } else {
    console.log('\n⚠️  Ungültige Google Analytics ID. Bitte später manuell in .env eintragen.')
  }
}

async function setupGoogleSearchConsole() {
  console.log('\n🔍 Google Search Console Setup\n')
  console.log('='.repeat(50))
  console.log('\nSchritte:')
  console.log('1. Gehe zu: https://search.google.com/search-console')
  console.log('2. Klicke auf "Property hinzufügen"')
  console.log('3. Wähle "URL-Präfix" und gib deine Domain ein')
  console.log('4. Wähle eine Verifizierungsmethode:')
  console.log('   - HTML-Tag (einfachste Methode)')
  console.log('   - DNS-Eintrag (für Produktion)')
  console.log('\n')

  const verificationMethod = await question(
    'Welche Verifizierungsmethode möchtest du verwenden? (html/dns): '
  )

  if (verificationMethod.toLowerCase() === 'html') {
    console.log('\n📝 HTML-Tag Verifizierung:')
    console.log('1. Google zeigt dir einen HTML-Tag wie:')
    console.log('   <meta name="google-site-verification" content="XXXXX" />')
    console.log('2. Kopiere den "content"-Wert (nur die Zeichenkette)')
    console.log('\n')

    const verificationCode = await question('Verification Code (nur der content-Wert): ')

    if (verificationCode) {
      const envPath = path.join(process.cwd(), '.env')
      let envContent = ''

      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8')
      }

      // Update or add verification code
      if (envContent.includes('GOOGLE_VERIFICATION=')) {
        envContent = envContent.replace(
          /GOOGLE_VERIFICATION=.*/,
          `GOOGLE_VERIFICATION=${verificationCode}`
        )
      } else {
        envContent += `\nGOOGLE_VERIFICATION=${verificationCode}\n`
      }

      fs.writeFileSync(envPath, envContent, 'utf8')
      console.log('\n✅ Verification Code wurde in .env gespeichert!')
      console.log('   Der Code wird automatisch in den <head> eingefügt.')
      console.log('   Nach dem Deployment kannst du in Search Console verifizieren.\n')
    }
  } else if (verificationMethod.toLowerCase() === 'dns') {
    console.log('\n📝 DNS Verifizierung:')
    console.log('1. Google zeigt dir einen DNS-Eintrag')
    console.log('2. Füge diesen in deinem DNS-Provider hinzu')
    console.log('3. Warte auf DNS-Propagierung (kann 24-48h dauern)')
    console.log('4. Klicke in Search Console auf "Verifizieren"\n')
    console.log('ℹ️  Diese Methode ist für die Produktion empfohlen.\n')
  }

  console.log('\n📋 Nächste Schritte:')
  console.log('1. Nach Verifizierung: Sitemap einreichen')
  console.log('2. Sitemap URL: https://deine-domain.com/sitemap.xml')
  console.log('3. Warte 1-2 Wochen auf erste Daten\n')
}

async function main() {
  console.log('\n🚀 Analytics & SEO Setup Helper\n')
  console.log('Dieses Tool hilft dir beim Einrichten von:')
  console.log('• Google Analytics')
  console.log('• Google Search Console\n')

  const setupGA = await question('Google Analytics einrichten? (j/n): ')
  if (setupGA.toLowerCase() === 'j' || setupGA.toLowerCase() === 'y') {
    await setupGoogleAnalytics()
  }

  const setupGSC = await question('Google Search Console einrichten? (j/n): ')
  if (setupGSC.toLowerCase() === 'j' || setupGSC.toLowerCase() === 'y') {
    await setupGoogleSearchConsole()
  }

  console.log('\n✅ Setup abgeschlossen!')
  console.log('\n📝 Wichtige Hinweise:')
  console.log('• Starte den Server neu nach .env Änderungen')
  console.log('• Google Analytics: Daten erscheinen nach 24-48h')
  console.log('• Search Console: Erste Daten nach 1-2 Wochen')
  console.log('\n')

  rl.close()
}

if (require.main === module) {
  main().catch(console.error)
}

