'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function ContactPageContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          <span className="text-emerald-400">{t.contact.title}</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Contact Methods */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="text-emerald-400 text-3xl mb-3">✉️</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t.contact.email}
            </h3>
            <p className="text-slate-300 mb-4">
              {t.contact.emailDescription}
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
              {t.contact.socialMedia}
            </h3>
            <p className="text-slate-300 mb-4">
              {t.contact.socialDescription}
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
            {t.contact.contactForm}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-6">
            {t.contact.formDescription}
          </p>
          
          {/* Contact Form */}
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                {t.contact.name} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder={t.contact.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                {t.contact.emailLabel} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder={t.contact.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                {t.contact.subject} *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="">{t.contact.selectSubject}</option>
                <option value="frage">{t.contact.subjectOptions.question}</option>
                <option value="feedback">{t.contact.subjectOptions.feedback}</option>
                <option value="kooperation">{t.contact.subjectOptions.cooperation}</option>
                <option value="fehler">{t.contact.subjectOptions.error}</option>
                <option value="sonstiges">{t.contact.subjectOptions.other}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                {t.contact.message} *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                placeholder={t.contact.messagePlaceholder}
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
                {t.contact.privacy} <Link href="#" className="text-emerald-400 hover:text-emerald-300 underline">{t.contact.privacyLink}</Link> {t.contact.privacyAgree} *
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#fbbf24] hover:bg-[#facc15] text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-amber-400/30"
            >
              {t.contact.send}
            </button>
          </form>

          <p className="text-slate-400 text-sm mt-4">
            * {t.contact.required}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {t.contact.faq}
        </h2>
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.contact.faq1Question}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.contact.faq1Answer}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.contact.faq2Question}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.contact.faq2Answer}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.contact.faq3Question}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.contact.faq3Answer}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.contact.faq4Question}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.contact.faq4Answer}
            </p>
          </div>
        </div>
      </section>

      {/* Back to Articles */}
      <section className="text-center">
        <p className="text-slate-300 mb-4">
          {t.contact.backToArticles}
        </p>
        <Link
          href="/artikel"
          className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline"
        >
          {t.contact.browseArticles}
        </Link>
      </section>
    </>
  )
}
