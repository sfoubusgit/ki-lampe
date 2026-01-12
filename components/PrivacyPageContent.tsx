'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export function PrivacyPageContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          <span className="text-emerald-400">{t.privacy.title}</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          {t.privacy.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <p className="text-slate-300 leading-relaxed mb-6">
            {t.privacy.introduction}
          </p>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.dataController}
          </h2>
          <div className="space-y-3 text-slate-300">
            <p className="font-semibold text-white mb-2">{t.privacy.dataControllerTitle}</p>
            <p className="text-lg font-semibold text-white">{t.privacy.dataControllerName}</p>
            <p>{t.privacy.dataControllerAddress}</p>
            <p>
              <a
                href={`mailto:${t.privacy.dataControllerEmail.replace('Email: ', '')}`}
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {t.privacy.dataControllerEmail}
              </a>
            </p>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.dataCollection}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.privacy.dataCollectionTitle}
              </h3>
              <p className="leading-relaxed">{t.privacy.dataCollectionText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.cookies}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.privacy.cookiesTitle}
              </h3>
              <p className="leading-relaxed">{t.privacy.cookiesText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.newsletter}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.privacy.newsletterTitle}
              </h3>
              <p className="leading-relaxed">{t.privacy.newsletterText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.rights}
          </h2>
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {t.privacy.rightsTitle}
              </h3>
              <p className="leading-relaxed">{t.privacy.rightsText}</p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-slate-800/50 rounded-xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-emerald-400 mb-6">
            {t.privacy.contact}
          </h2>
          <p className="text-slate-300 leading-relaxed">
            {t.privacy.contactText}
          </p>
        </section>
      </div>
    </>
  )
}
