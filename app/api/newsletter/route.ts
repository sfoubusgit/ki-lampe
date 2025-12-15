import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, lead = '10-ki-prompts-grafiktablett' } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      )
    }

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
    console.log('HINWEIS: Mailchimp nicht konfiguriert. E-Mail geloggt.')
    
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