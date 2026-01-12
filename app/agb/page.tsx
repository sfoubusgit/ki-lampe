import type { Metadata } from 'next'
import { TermsPageContent } from '@/components/TermsPageContent'

export const revalidate = 3600 // Revalidate once per hour

const siteUrl = process.env.BLOG_URL || 'https://ki-lampe.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'AGB - Allgemeine Geschäftsbedingungen - KI.LAMPE',
    description: 'Allgemeine Geschäftsbedingungen für die Nutzung von KI.LAMPE',
    alternates: {
      canonical: `${siteUrl}/agb`,
    },
  }
}

export default async function TermsPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <TermsPageContent />
      </div>
    </main>
  )
}
