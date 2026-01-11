import type { Metadata } from 'next'
import { AboutPageContent } from '@/components/AboutPageContent'

export const revalidate = 3600 // Revalidate once per hour

const siteUrl = process.env.BLOG_URL || 'https://ki-lampe.com'

// SEO
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Über uns - KI.LAMPE',
    description: 'Erfahre mehr über KI.LAMPE - Deine Quelle für verständliche KI-Artikel, Tutorials und News aus der Welt der künstlichen Intelligenz',
    alternates: {
      canonical: `${siteUrl}/ueber`,
    },
  }
}

export default async function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <AboutPageContent />
      </div>
    </main>
  )
}
