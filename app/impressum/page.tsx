import type { Metadata } from 'next'
import { ImprintPageContent } from '@/components/ImprintPageContent'

export const revalidate = 3600 // Revalidate once per hour

const siteUrl = process.env.BLOG_URL || 'https://ki-lampe.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Impressum - KI.LAMPE',
    description: 'Impressum und rechtliche Angaben zu KI.LAMPE',
    alternates: {
      canonical: `${siteUrl}/impressum`,
    },
  }
}

export default async function ImprintPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <ImprintPageContent />
      </div>
    </main>
  )
}
