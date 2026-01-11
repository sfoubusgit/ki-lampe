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
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Newsletter API: Failed to parse request body:', parseError)
      return NextResponse.json(
        { error: 'Ungültige Anfrage. Bitte versuchen Sie es erneut.' },
        { status: 400 }
      )
    }

    const { email, lead = '10-ki-prompts-grafiktablett' } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

    const brevoApiKey = process.env.BREVO_API_KEY
    const brevoListId = process.env.BREVO_LIST_ID

    // Debug logging
    console.log('Newsletter API - Environment Check:')
    console.log('BREVO_API_KEY exists:', !!brevoApiKey)
    console.log('BREVO_LIST_ID exists:', !!brevoListId)
    console.log('BREVO_LIST_ID value:', brevoListId)

    // Brevo Integration (Priorität)
    if (brevoApiKey && brevoListId) {
      try {
        const brevoUrl = 'https://api.brevo.com/v3/contacts'
        
        const listIdNumber = parseInt(brevoListId, 10)
        if (isNaN(listIdNumber)) {
          console.error('BREVO_LIST_ID ist keine gültige Zahl:', brevoListId)
          throw new Error('Ungültige List ID')
        }

        console.log('Sending to Brevo:', {
          email,
          listIds: [listIdNumber],
          apiKeyLength: brevoApiKey.length
        })

        const response = await fetch(brevoUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': brevoApiKey,
          },
          body: JSON.stringify({
            email: email,
            listIds: [listIdNumber],
            updateEnabled: true, // Aktualisiert bestehende Kontakte
          }),
        })

        const responseText = await response.text()
        console.log('Brevo Response Status:', response.status)
        console.log('Brevo Response:', responseText)

        if (!response.ok) {
          let errorData
          try {
            errorData = JSON.parse(responseText)
          } catch {
            errorData = { message: responseText }
          }
          
          // Wenn Kontakt bereits existiert, ist das OK
          if (response.status === 400 && (
            errorData.code === 'duplicate_parameter' || 
            errorData.message?.includes('already exists') ||
            errorData.message?.includes('Contact already exist')
          )) {
            return NextResponse.json({
              success: true,
              message: 'Sie sind bereits für den Newsletter angemeldet!',
              download: `/downloads/${lead}.pdf`
            }, { status: 200 })
          }
          
          console.error('Brevo Fehler Details:', {
            status: response.status,
            error: errorData
          })
          throw new Error(errorData.message || `Brevo Fehler: ${response.status}`)
        }

        let successData
        try {
          successData = responseText ? JSON.parse(responseText) : {}
        } catch {
          successData = {}
        }
        console.log('Brevo Erfolg:', successData)

        return NextResponse.json({
          success: true,
          message: 'Vielen Dank für Ihre Anmeldung!',
          download: `/downloads/${lead}.pdf`
        }, { status: 200 })
      } catch (error: any) {
        console.error('Brevo Fehler Details:', {
          message: error.message,
          stack: error.stack,
          email: email
        })
        // Don't silently fail - return error if Brevo is configured
        // This ensures we know when Brevo fails vs when it's not configured
        return NextResponse.json({
          success: false,
          error: `Brevo Fehler: ${error.message || 'Unbekannter Fehler'}`,
          message: 'Die Newsletter-Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns.',
        }, { status: 500 })
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
      } catch (error: any) {
        console.error('Mailchimp Fehler:', error)
        // Don't silently fail - return error if Mailchimp is configured
        return NextResponse.json({
          success: false,
          error: `Mailchimp Fehler: ${error.message || 'Unbekannter Fehler'}`,
          message: 'Die Newsletter-Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.',
        }, { status: 500 })
      }
    }

    // Demo-Modus - nur wenn weder Brevo noch Mailchimp konfiguriert sind
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