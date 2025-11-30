import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter API Route
 * 
 * Unterstützt zwei Modi:
 * 1. Mailchimp Integration (wenn MAILCHIMP_API_KEY gesetzt)
 * 2. Einfache E-Mail-Sammlung (E-Mails werden in Console geloggt)
 * 
 * Um Mailchimp zu nutzen:
 * 1. Erstelle einen Account auf mailchimp.com
 * 2. Erstelle eine Audience/Liste
 * 3. Hole dir den API Key: Account → Extras → API Keys
 * 4. Hole dir die Audience ID: Audience → Settings → Audience name and defaults
 * 5. Setze in .env:
 *    MAILCHIMP_API_KEY=dein-api-key
 *    MAILCHIMP_AUDIENCE_ID=deine-audience-id
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validierung
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID

    // Mailchimp Integration
    if (mailchimpApiKey && mailchimpAudienceId) {
      try {
        // Extrahiere den Server-Prefix aus dem API Key (z.B. "us1" aus "xxxx-us1")
        const serverPrefix = mailchimpApiKey.split('-')[1]
        if (!serverPrefix) {
          throw new Error('Ungültiger Mailchimp API Key Format')
        }
        
        const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`

        // Mailchimp verwendet Basic Auth: beliebiger Username, API Key als Password
        const authString = Buffer.from(`anystring:${mailchimpApiKey}`).toString('base64')

        const response = await fetch(mailchimpUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authString}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: 'subscribed',
            status_if_new: 'subscribed',
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          // Wenn E-Mail bereits existiert, ist das OK
          if (response.status === 400 && errorData.title === 'Member Exists') {
            return NextResponse.json(
              { message: 'Sie sind bereits für den Newsletter angemeldet!' },
              { status: 200 }
            )
          }
          throw new Error(errorData.detail || 'Mailchimp Fehler')
        }

        return NextResponse.json(
          { message: 'Vielen Dank für Ihre Anmeldung!' },
          { status: 200 }
        )
      } catch (error: any) {
        console.error('Mailchimp Fehler:', error)
        return NextResponse.json(
          { error: 'Fehler bei der Anmeldung. Bitte versuchen Sie es später erneut.' },
          { status: 500 }
        )
      }
    }

    // Fallback: Einfache Logging (für Entwicklung)
    console.log('Newsletter Anmeldung:', email)
    console.log('HINWEIS: Mailchimp nicht konfiguriert. E-Mail wurde nur geloggt.')
    console.log('Um Mailchimp zu nutzen, setze MAILCHIMP_API_KEY und MAILCHIMP_AUDIENCE_ID in .env')

    return NextResponse.json(
      { message: 'Vielen Dank für Ihre Anmeldung! (Demo-Modus)' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter API Fehler:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}

