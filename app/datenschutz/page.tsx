import type { Metadata } from 'next'
import { PrivacyPageContent } from '@/components/PrivacyPageContent'

export const revalidate = 3600 // Revalidate once per hour

const siteUrl = process.env.BLOG_URL || 'https://ki-lampe.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Datenschutzerklärung - KI.LAMPE',
    description: 'Datenschutzerklärung und Informationen zum Datenschutz bei KI.LAMPE',
    alternates: {
      canonical: `${siteUrl}/datenschutz`,
    },
  }
}

export default async function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <PrivacyPageContent />
      </div>
    </main>
  )
}
