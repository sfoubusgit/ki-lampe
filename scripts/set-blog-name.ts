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

async function setBlogName() {
  console.log('\n🎯 Blog-Name Konfiguration\n')
  console.log('='.repeat(50))
  console.log('\nTop 5 Empfehlungen:')
  console.log('1. KIInsight - "Dein Portal für KI-Intelligenz"')
  console.log('2. NeuralPulse - "Der Puls der Künstlichen Intelligenz"')
  console.log('3. CodeMind - "Wo Code auf Intelligenz trifft"')
  console.log('4. AIVision - "Die Zukunft der KI verstehen"')
  console.log('5. TechNeural - "Dein Neurales Netzwerk für Tech-News"')
  console.log('\nOder gib einen eigenen Namen ein!\n')

  const blogName = await question('Blog-Name (oder Enter für "KIInsight"): ')

  const finalName = blogName.trim() || 'KIInsight'
  const description = await question(
    `Blog-Beschreibung (oder Enter für Standard): `
  )

  const finalDescription =
    description.trim() ||
    'Dein Portal für Künstliche Intelligenz, Machine Learning und Tech-Innovationen'

  // Update .env file
  const envPath = path.join(process.cwd(), '.env')
  let envContent = ''

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8')
  }

  // Update or add BLOG_NAME
  if (envContent.includes('BLOG_NAME=')) {
    envContent = envContent.replace(/BLOG_NAME=.*/, `BLOG_NAME=${finalName}`)
  } else {
    envContent += `\nBLOG_NAME=${finalName}\n`
  }

  // Update or add BLOG_DESCRIPTION
  if (envContent.includes('BLOG_DESCRIPTION=')) {
    envContent = envContent.replace(
      /BLOG_DESCRIPTION=.*/,
      `BLOG_DESCRIPTION=${finalDescription}`
    )
  } else {
    envContent += `\nBLOG_DESCRIPTION=${finalDescription}\n`
  }

  fs.writeFileSync(envPath, envContent, 'utf8')

  console.log('\n✅ Blog-Name erfolgreich gesetzt!')
  console.log(`   Name: ${finalName}`)
  console.log(`   Beschreibung: ${finalDescription}`)
  console.log('\n📝 Nächste Schritte:')
  console.log('   1. Server neu starten: npm run dev')
  console.log('   2. Name erscheint in Navigation und Footer')
  console.log('   3. Optional: Domain registrieren\n')

  rl.close()
}

if (require.main === module) {
  setBlogName().catch(console.error)
}

