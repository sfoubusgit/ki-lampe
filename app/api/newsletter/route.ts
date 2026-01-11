import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter API Route
 * 
 * Unterstützt:
 * 1. Brevo (ehemals Sendinblue) - PRIORITÄT
 * 2. Mailchimp Integration
 * 3. Demo-Modus (E-Mails werden nur geloggt)
 */
export async function POST(request: NextRequest) {
  try {
    const { email, lead = '10-ki-prompts-grafiktablett' } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID

    // Brevo Integration (Priorität)
    if (brevoApiKey && brevoListId) {
      try {
        const brevoUrl = 'https://api.brevo.com/v3/contacts'
        
        const response = await fetch(brevoUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            email: email,
            listIds: [parseInt(brevoListId)],
            updateEnabled: true, // Aktualisiert bestehende Kontakte
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          
          // Wenn Kontakt bereits existiert, ist das OK
          if (response.status === 400 && errorData.code === 'duplicate_parameter') {
            return NextResponse.json({
              success: true,
              message: 'Sie sind bereits für den Newsletter angemeldet!',
              download: `/downloads/${lead}.pdf`
            }, { status: 200 })
          }
          
          console.error('Brevo Fehler:', errorData)
          throw new Error(errorData.message || 'Brevo Fehler')
        }

        return NextResponse.json({
          success: true,
          message: 'Vielen Dank für Ihre Anmeldung!',
          download: `/downloads/${lead}.pdf`
        }, { status: 200 })
      } catch (error: any) {
        console.error('Brevo Fehler:', error)
        // Fallback zu Mailchimp oder Demo-Modus
      }
    }

    // Mailchimp Integration (Fallback)
    const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
    const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID

    if (mailchimpApiKey && mailchimpAudienceId) {
      try {
        const serverPrefix = mailchimpApiKey.split('-')[1]
        if (!serverPrefix) throw new Error('Ungültiger Mailchimp API Key')

        const mailchimpUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${mailchimpAudienceId}/members`
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
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          if (response.status === 400 && errorData.title === 'Member Exists') {
            return NextResponse.json({
              success: true,
              message: 'Sie sind bereits angemeldet!',
              download: `/downloads/${lead}.pdf`
            }, { status: 200 })
          }
          throw new Error(errorData.detail || 'Mailchimp Fehler')
        }

        return NextResponse.json({
          success: true,
          message: 'Vielen Dank für Ihre Anmeldung!',
          download: `/downloads/${lead}.pdf`
        }, { status: 200 })
      } catch (error) {
        console.error('Mailchimp Fehler:', error)
      }
    }

    // Demo-Modus
    console.log('Newsletter Anmeldung:', email, 'Lead:', lead)
    console.log('HINWEIS: Weder Brevo noch Mailchimp konfiguriert. E-Mail geloggt.')
    console.log('Um Brevo zu nutzen, setze BREVO_API_KEY und BREVO_LIST_ID in .env')
    
    return NextResponse.json({
      success: true,
      message: 'Vielen Dank für Ihre Anmeldung! (Demo-Modus)',
      download: `/downloads/${lead}.pdf`
    }, { status: 200 })

  } catch (error) {
    console.error('Newsletter API Fehler:', error)
    return NextResponse.json({
      success: true,
      message: 'Technischer Fehler. Download freigeschaltet.',
      download: `/downloads/10-ki-prompts-grafiktablett.pdf`
    }, { status: 200 })
  }
}