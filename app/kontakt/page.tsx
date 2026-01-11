import type { Metadata } from 'next'
import { ContactPageContent } from '@/components/ContactPageContent'

export const revalidate = 3600 // Revalidate once per hour

const siteUrl = process.env.BLOG_URL || 'https://ki-lampe.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Kontakt - KI.LAMPE',
    description: 'Kontaktiere das KI.LAMPE Team - Wir freuen uns auf deine Fragen, Anregungen und Feedback',
    alternates: {
      canonical: `${siteUrl}/kontakt`,
    },
  }
}

export default async function ContactPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <ContactPageContent />
      </div>
    </main>
  )
}
