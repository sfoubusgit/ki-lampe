'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export function AboutPageContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {t.about.title.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-emerald-400">{t.about.title.split(' ').slice(-1)[0]}</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          {t.about.subtitle}
        </p>
      </div>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.about.mission}
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            {t.about.missionText1}
          </p>
          <p className="text-slate-300 leading-relaxed">
            {t.about.missionText2}
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {t.about.whatWeDo}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="text-emerald-400 text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t.about.whatWeDo1Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.whatWeDo1Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="text-emerald-400 text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t.about.whatWeDo2Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.whatWeDo2Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="text-emerald-400 text-3xl mb-3">📰</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t.about.whatWeDo3Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.whatWeDo3Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <div className="text-emerald-400 text-3xl mb-3">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {t.about.whatWeDo4Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.whatWeDo4Text}
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {t.about.values}
        </h2>
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.about.value1Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.value1Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.about.value2Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.value2Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.about.value3Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.value3Text}
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
            <h3 className="text-lg font-bold text-emerald-400 mb-2">
              {t.about.value4Title}
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {t.about.value4Text}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/20 p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {t.about.ctaTitle}
        </h2>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          {t.about.ctaText}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/artikel"
            className="inline-block px-6 py-3 bg-[#fbbf24] hover:bg-[#facc15] text-slate-950 font-semibold rounded-lg transition-all shadow-lg shadow-amber-400/30"
          >
            {t.about.ctaArticles}
          </Link>
          <Link
            href="/news"
            className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-all border border-slate-700"
          >
            {t.about.ctaNews}
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-12 text-center">
        <p className="text-slate-300 mb-4">
          {t.about.contactCta}
        </p>
        <Link
          href="/kontakt"
          className="inline-block text-emerald-400 hover:text-emerald-300 font-semibold transition-colors underline"
        >
          {t.about.contactLink}
        </Link>
      </section>
    </>
  )
}
