import type { Metadata } from 'next'
import Link from 'next/link'

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
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            <span className="text-emerald-400">Kontakt</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Wir freuen uns auf deine Nachricht! Hast du Fragen, Anregungen oder Feedback?
          </p>
        </div>

        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">✉️</div>
              <h3 className="text-xl font-bold text-white mb-2">
                E-Mail
              </h3>
              <p className="text-slate-300 mb-4">
                Schicke uns eine E-Mail für allgemeine Anfragen, Kooperationsanfragen oder Feedback.
              </p>
              <a
                href="mailto:kontakt@ki-lampe.com"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline"
              >
                kontakt@ki-lampe.com
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <div className="text-emerald-400 text-3xl mb-3">📱</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Social Media
              </h3>
              <p className="text-slate-300 mb-4">
                Folge uns auf unseren Social-Media-Kanälen für aktuelle Updates und Diskussionen.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="Twitter/X"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Info */}
        <section className="mb-16">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Kontaktformular
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Du kannst uns auch direkt über das Kontaktformular erreichen. Wir antworten normalerweise 
              innerhalb von 24-48 Stunden.
            </p>
            
            {/* Contact Form */}
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Dein Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="deine@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Betreff *
                </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="frage">Allgemeine Frage</option>
                    <option value="feedback">Feedback</option>
                    <option value="kooperation">Kooperationsanfrage</option>
                    <option value="fehler">Fehler melden</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder="Deine Nachricht..."
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  required
                  className="mt-1 mr-2 w-4 h-4 bg-slate-900/50 border-slate-700 rounded text-emerald-500 focus:ring-emerald-500"
                />
                <label htmlFor="privacy" className="text-sm text-slate-300">
                  Ich stimme der <Link href="#" className="text-emerald-400 hover:text-emerald-300 underline">Datenschutzerklärung</Link> zu. *
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-emerald-500/30"
              >
                Nachricht senden
              </button>
            </form>

            <p className="text-slate-400 text-sm mt-4">
              * Pflichtfelder
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Häufige Fragen
          </h2>
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Wie schnell antwortet ihr?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Wir versuchen, alle Anfragen innerhalb von 24-48 Stunden zu beantworten. Bei dringenden 
                Angelegenheiten kann es auch schneller gehen.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Könnt ihr mir bei technischen Problemen helfen?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Ja, gerne! Wenn du Probleme mit einem KI-Tool hast oder Fragen zu unseren Tutorials, 
                helfen wir dir gerne weiter.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Nehmt ihr Gastbeiträge an?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Aktuell veröffentlichen wir hauptsächlich eigene Inhalte. Für Kooperationsanfragen 
                kontaktiere uns bitte per E-Mail.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-2">
                Kann ich einen Artikel vorschlagen?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Ja, sehr gerne! Wir freuen uns über Themenvorschläge. Schicke uns einfach eine E-Mail 
                mit deiner Idee.
              </p>
            </div>
          </div>
        </section>

        {/* Back to Articles */}
        <section className="text-center">
          <p className="text-slate-300 mb-4">
            Zurück zu den Artikeln?
          </p>
          <Link
            href="/artikel"
            className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline"
          >
            Artikel durchsuchen
          </Link>
        </section>

      </div>
    </main>
  )
}
