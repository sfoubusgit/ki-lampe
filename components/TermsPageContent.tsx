'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function TermsPageContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          <span className="text-emerald-400">{t.terms.title}</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          {t.terms.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.scope}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.scopeTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.scopeText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.services}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.servicesTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.servicesText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.userObligations}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.userObligationsTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.userObligationsText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.liability}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.liabilityTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.liabilityText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.property}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.propertyTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.propertyText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.changes}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.changesTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.changesText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.terms.final}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.terms.finalTitle}
              </h3>
              <p className="leading-relaxed">{t.terms.finalText}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
