import { NextResponse } from 'next/server'

/**
 * Test endpoint to check if newsletter API is accessible
 * and if environment variables are set
 */
export async function GET() {
  const brevoApiKey = process.env.BREVO_API_KEY
  const brevoListId = process.env.BREVO_LIST_ID
  const mailchimpApiKey = process.env.MAILCHIMP_API_KEY
  const mailchimpAudienceId = process.env.MAILCHIMP_AUDIENCE_ID

  return NextResponse.json({
    status: 'ok',
    environment: {
      brevo: {
        apiKeySet: !!brevoApiKey,
        listIdSet: !!brevoListId,
        listId: brevoListId || 'not set',
      },
      mailchimp: {
        apiKeySet: !!mailchimpApiKey,
        audienceIdSet: !!mailchimpAudienceId,
      },
      mode: brevoApiKey && brevoListId 
        ? 'brevo' 
        : mailchimpApiKey && mailchimpAudienceId 
        ? 'mailchimp' 
        : 'demo',
    },
  })
}
