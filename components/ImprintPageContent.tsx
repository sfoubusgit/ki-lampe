'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function ImprintPageContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          <span className="text-emerald-400">{t.imprint.title}</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          {t.imprint.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.imprint.responsibleTitle}
          </h2>
          <div className="space-y-3 text-slate-300">
            <p className="text-lg font-semibold text-white">{t.imprint.name}</p>
            <p>{t.imprint.address}</p>
            <p>{t.imprint.city}</p>
            <p>{t.imprint.country}</p>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.imprint.contact}
          </h2>
          <div className="space-y-2 text-slate-300">
            <p>
              <span className="font-semibold text-white">{t.imprint.email}</span>{' '}
              <a
                href={`mailto:${t.imprint.emailValue}`}
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {t.imprint.emailValue}
              </a>
            </p>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.imprint.disclaimer}
          </h2>

          <div className="space-y-6 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.imprint.contentTitle}
              </h3>
              <p className="leading-relaxed">{t.imprint.contentText}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.imprint.linksTitle}
              </h3>
              <p className="leading-relaxed">{t.imprint.linksText}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.imprint.copyright}
              </h3>
              <p className="leading-relaxed">{t.imprint.copyrightText}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
