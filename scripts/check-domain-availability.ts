#!/usr/bin/env tsx

import https from 'https'

function checkDomain(domain: string): Promise<boolean> {
  return new Promise((resolve) => {
    const options = {
      hostname: 'www.' + domain,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 5000,
    }

    const req = https.request(options, (res) => {
      resolve(res.statusCode !== 404)
    })

    req.on('error', () => resolve(false))
    req.on('timeout', () => {
      req.destroy()
      resolve(false)
    })

    req.end()
  })
}

async function checkBlogNameAvailability(name: string) {
  const domains = [
    `${name.toLowerCase().replace(/\s+/g, '')}.de`,
    `${name.toLowerCase().replace(/\s+/g, '')}.com`,
    `${name.toLowerCase().replace(/\s+/g, '-')}.de`,
    `${name.toLowerCase().replace(/\s+/g, '-')}.com`,
  ]

  console.log(`\n🔍 Prüfe Verfügbarkeit für: ${name}\n`)

  for (const domain of domains) {
    const available = !(await checkDomain(domain))
    const status = available ? '✅ Verfügbar' : '❌ Belegt'
    console.log(`   ${domain}: ${status}`)
  }
}

async function main() {
  const names = [
    'AI-Ape',
    'KI-Affe',
    'NeuralMonkey',
    'CodeGorilla',
    'AIBear',
    'TechTiger',
    'DataDolphin',
    'AlgoElephant',
    'SmartSloth',
    'ByteBunny',
  ]

  console.log('🎯 Prüfe Tier-basierte AI-Blog-Namen...\n')

  for (const name of names) {
    await checkBlogNameAvailability(name)
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Rate limiting
  }

  console.log('\n💡 Empfehlung: Wähle einen Namen mit ✅ Verfügbarkeit')
}

if (require.main === module) {
  main().catch(console.error)
}

