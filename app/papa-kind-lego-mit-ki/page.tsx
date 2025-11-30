import Link from 'next/link'
import { BrandStory } from '@/components/BrandStory'
import { AffiliateProductBox } from '@/components/AffiliateProductBox'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Papa & Kind – LEGO bauen mit ChatGPT | KI-Lampe',
  description: 'Entdecke, wie du mit deinem Kind gemeinsam LEGO baust – ohne Anleitung, aber mit ChatGPT als kreativem Partner. Erschaffe nicht nur Modelle, sondern unvergessliche Erinnerungen.',
  keywords: [
    'LEGO bauen mit ChatGPT',
    'Papa Kind LEGO',
    'LEGO Anleitungen mit KI',
    'Papa Kind Basteln Ideen',
    'LEGO Ideen ohne Anleitung',
    'Gemeinsam mit Kindern bauen',
    'LEGO Kreativprojekte',
    'ChatGPT Kinder Projekte',
    'Papa-Kind-Zeit mit LEGO',
    'LEGO Bauideen für Familien',
  ],
  alternates: {
    canonical: 'https://ki-lampe.com/papa-kind-lego-mit-ki',
  },
  openGraph: {
    title: 'Papa & Kind – LEGO bauen mit ChatGPT | KI-Lampe',
    description: 'Aus Bausteinen werden Erinnerungen. Gemeinsam LEGO bauen mit ChatGPT – die perfekte Papa-Kind-Idee.',
    type: 'website',
    url: 'https://ki-lampe.com/papa-kind-lego-mit-ki',
  },
}

export default function PapaKindLegoPage() {
  return (
    <main className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="py-24 px-4 border-b border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Aus Bausteinen werden <span className="text-emerald-400">Erinnerungen</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Papa & Kind – gemeinsam mit <span className="text-emerald-400 font-semibold">LEGO & ChatGPT</span>
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Entdecke, wie du mit deinem Kind gemeinsam LEGO baust – ohne Anleitung, aber mit ChatGPT als kreativem Partner. 
            Erschaffe nicht nur Modelle, sondern unvergessliche Erinnerungen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/artikel/ki-lego-objekte-bauen"
              className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-0.5"
            >
              Jetzt erste Bauidee mit ChatGPT generieren
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <BrandStory />
      </section>

      {/* Warum LEGO + KI */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Warum LEGO + KI das perfekte <span className="text-emerald-400">Papa-Kind-Hobby</span> ist
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">🧱</div>
            <h3 className="text-xl font-bold text-white mb-3">Unbegrenzte Kreativität</h3>
            <p className="text-slate-300 leading-relaxed">
              Keine festen Anleitungen – ChatGPT generiert Ideen für alles, was euch einfällt. Von Raumschiffen bis Drachen, alles ist möglich.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold text-white mb-3">Sinnvolle Bildschirmzeit</h3>
            <p className="text-slate-300 leading-relaxed">
              Die KI ist Werkzeug, nicht Unterhaltung. Die meiste Zeit verbringt ihr ohne Bildschirm – mit den Händen, den Steinen und euch.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Gemeinsame Erfolge</h3>
            <p className="text-slate-300 leading-relaxed">
              Jedes fertige Modell ist ein gemeinsamer Triumph. Ihr baut nicht nur Modelle – ihr baut Erinnerungen.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-white mb-3">Lernprozess fördern</h3>
            <p className="text-slate-300 leading-relaxed">
              Dein Kind lernt, Ideen zu formulieren, Probleme zu lösen und kreativ zu denken – alles spielerisch.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">⏰</div>
            <h3 className="text-xl font-bold text-white mb-3">Flexible Zeitgestaltung</h3>
            <p className="text-slate-300 leading-relaxed">
              Von 30 Minuten bis 2 Stunden – passt sich eurem Zeitplan an. Perfekt für Abende nach der Arbeit.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold text-white mb-3">Stärkt die Bindung</h3>
            <p className="text-slate-300 leading-relaxed">
              Gemeinsam bauen, lachen, scheitern und neu versuchen – das schafft Verbindung, die bleibt.
            </p>
          </div>
        </div>
      </section>

      {/* So funktioniert es */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-slate-800/50 rounded-2xl my-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            So funktioniert es
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Thema gemeinsam auswählen</h3>
              <p className="text-slate-300 leading-relaxed">
                Setzt euch zusammen und überlegt: Was soll gebaut werden? Lass dein Kind die Idee beschreiben – ein Raumschiff, ein Drachen, eine Feuerwehrbasis.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Mit ChatGPT Ideen generieren</h3>
              <p className="text-slate-300 leading-relaxed">
                Öffne ChatGPT und frage nach einer kindgerechten Schritt-für-Schritt-Anleitung. ChatGPT liefert Ideen, Empfehlungen und Tipps.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Zusammen bauen</h3>
              <p className="text-slate-300 leading-relaxed">
                Baut gemeinsam. Lies die Schritte vor, lass dein Kind die Steine suchen. Wenn etwas nicht passt: Lacht darüber und versucht es neu.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              4
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Spielen und Geschichten erfinden</h3>
              <p className="text-slate-300 leading-relaxed">
                Wenn das Modell fertig ist, fragt ChatGPT nach einer Geschichte. So wird aus dem Modell ein Abenteuer.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              5
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Erinnerungen schaffen</h3>
              <p className="text-slate-300 leading-relaxed">
                Feiert jeden Erfolg. Macht Fotos. Erzählt die Geschichte vor dem Schlafengehen. Das Modell bleibt, die Erinnerung bleibt für immer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEGO-Empfehlungen */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Unsere LEGO-Empfehlungen für euch
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Für kreative Projekte mit ChatGPT eignen sich besonders Sets mit vielen verschiedenen Steinen. 
            Classic Sets sind ideal, weil sie keine feste Anleitung haben – perfekt für ChatGPT-Ideen!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <AffiliateProductBox
            title="LEGO Classic 10715 – Kreativ-Bauset Fahrzeuge"
            description="Perfektes Set für Papa-Kind-Projekte mit ChatGPT. Ideal für kreative KI-LEGO-Bauideen. Viele verschiedene Steine, keine feste Anleitung – maximale Kreativität."
            affiliateUrl="https://amzn.to/489ykSJ"
            imageSrc="/images/lego-classic-box.webp"
            imageAlt="LEGO Classic 10715 Kreativ-Bauset Fahrzeuge"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Häufige Fragen
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">
              Brauche ich bestimmte LEGO-Sets?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Nein!</strong> Jedes LEGO-Set funktioniert. Classic Sets sind ideal, weil sie viele verschiedene Steine enthalten. Aber auch aus vorhandenen Sets könnt ihr kreative Projekte umsetzen.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">
              Ist das für kleine Kinder geeignet?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Ja, ab etwa 4-5 Jahren.</strong> Für jüngere Kinder: Einfache Prompts verwenden ("Baue ein Auto") und beim Bauen helfen. Ältere Kinder können selbstständiger arbeiten.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">
              Was, wenn ChatGPT eine komplizierte Anleitung gibt?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Einfach anpassen!</strong> Sag ChatGPT: "Das ist zu kompliziert. Kannst du es einfacher machen?" oder "Wir haben nicht so viele Steine. Geht es auch mit weniger?"
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">
              Wie lange dauert so ein Projekt?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">30 Minuten bis 2 Stunden</strong> – je nach Komplexität. Wichtig: Nicht hetzen. Die Zeit zusammen ist wichtiger als das fertige Modell.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-3">
              Was, wenn das Modell nicht so wird wie geplant?
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-emerald-400">Das ist völlig okay!</strong> Es geht um den Prozess, nicht um Perfektion. Lacht darüber, versucht es neu oder baut einfach etwas anderes daraus.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-emerald-500/20 to-slate-800 rounded-2xl p-12 border border-emerald-500/30">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Bereit für euer erstes Abenteuer?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Nimm dir heute Abend 30 Minuten Zeit. Frag dein Kind, was es bauen möchte. Öffne ChatGPT. 
            Und beginnt euer erstes gemeinsames KI-LEGO-Abenteuer.
          </p>
          <Link
            href="/artikel/ki-lego-objekte-bauen"
            className="inline-block px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-0.5"
          >
            Jetzt erste Bauidee mit ChatGPT generieren
          </Link>
        </div>
      </section>
    </main>
  )
}

