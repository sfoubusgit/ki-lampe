import type { Metadata } from 'next'
import Link from 'next/link'

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
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Über <span className="text-emerald-400">KI.LAMPE</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Deine Quelle für verständliche KI-Artikel, Tutorials und News
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Unsere Mission
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              KI.LAMPE wurde mit dem Ziel gegründet, künstliche Intelligenz für jeden verständlich zu machen. 
              Wir glauben, dass KI nicht nur für Experten zugänglich sein sollte, sondern für alle, die neugierig 
              sind und lernen möchten.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Unser Team schreibt Artikel, die komplexe KI-Konzepte in einfache, nachvollziehbare Sprache übersetzen. 
              Von Machine Learning Grundlagen bis hin zu praktischen Anleitungen – wir decken alles ab, was du wissen musst.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Was wir machen
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Verständliche Artikel
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Wir erklären komplexe KI-Themen so, dass sie jeder verstehen kann – ohne technisches Vorwissen.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Praktische Tutorials
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Schritt-für-Schritt-Anleitungen, die dir zeigen, wie du KI-Tools in der Praxis nutzt.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">📰</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Aktuelle News
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Bleibe auf dem Laufenden mit den neuesten Entwicklungen und Trends aus der KI-Welt.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Tool-Vergleiche
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Wir testen und vergleichen verschiedene KI-Tools, damit du das Beste für deine Bedürfnisse findest.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Unsere Werte
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Verständlichkeit
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Komplexe Themen einfach erklären – das ist unser Anspruch. Wir verwenden keine unnötigen Fachbegriffe 
                und sorgen dafür, dass jeder unsere Artikel verstehen kann.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Praxisnähe
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Theorie ist gut, Praxis ist besser. Unsere Artikel enthalten immer konkrete Beispiele und 
                Anwendungsfälle, die du direkt umsetzen kannst.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Aktualität
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Die KI-Welt entwickelt sich rasant. Wir halten dich mit aktuellen News und Updates auf dem Laufenden.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Unabhängigkeit
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Unsere Meinungen und Empfehlungen sind unabhängig. Wir testen Tools selbst und geben ehrliche 
                Bewertungen.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Bereit, mehr zu lernen?
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Entdecke unsere Artikel-Sammlung und starte deine Reise in die Welt der künstlichen Intelligenz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/artikel"
              className="inline-block px-6 py-3 bg-[#fbbf24] hover:bg-[#facc15] text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-amber-400/30"
            >
              Artikel entdecken
            </Link>
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-slate-700"
            >
              News lesen
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-12 text-center">
          <p className="text-slate-300 mb-4">
            Hast du Fragen oder Anregungen?
          </p>
          <Link
            href="/kontakt"
            className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline"
          >
            Kontaktiere uns
          </Link>
        </section>

      </div>
    </main>
  )
}
