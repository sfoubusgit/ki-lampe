import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CookieBanner } from '@/components/CookieBanner'
import { Analytics } from '@/components/Analytics'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Script from "next/script"

const inter = Inter({ subsets: ['latin'] })

const siteUrl = process.env.BLOG_URL || 'https://yourblog.com'
const siteName = process.env.BLOG_NAME || 'KI.LAMPE - Der Künstliche Intelligenz Blog für Kreative Leuchten'
const siteDescription = process.env.BLOG_DESCRIPTION || 'KI.LAMPE - Der Künstliche Intelligenz Blog für Kreative Leuchten'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: ['AI', 'Blog', 'Technology', 'SEO', 'Content Marketing'],
  authors: [{ name: 'AI Content Team' }],
  creator: 'AI Content Team',
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: siteName,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteName,
              url: siteUrl,
              description: siteDescription,
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />

        {/* Google Analytics */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-FZ6K9TC66R"
            strategy="afterInteractive"
          />

          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FZ6K9TC66R');
            `}
          </Script>
      </body>
    </html>
  )
}

