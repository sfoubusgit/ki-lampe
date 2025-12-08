/**
 * Brand-Story-Komponente für Papa-Kind-LEGO+ChatGPT
 * 
 * Diese Komponente erzählt die emotionale Geschichte, wie Papas und ihre Kinder
 * gemeinsam LEGO mit ChatGPT bauen und dabei nicht nur Modelle, sondern Erinnerungen schaffen.
 */

export function BrandStory({ className = '' }: { className?: string }) {
  return (
    <section className={`bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 md:p-12 my-12 border border-emerald-500/20 shadow-xl ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Aus Bausteinen werden <span className="text-emerald-400">Erinnerungen</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6 text-slate-200 text-lg leading-relaxed">
          <p className="text-xl md:text-2xl text-white font-medium">
            Papa kommt nach der Arbeit nach Hause. Das Kind wartet schon mit leuchtenden Augen: &quot;Papa, können wir LEGO bauen?&quot;
          </p>

          <p>
            Statt einfach nur die Anleitung aus dem Karton zu holen, entsteht etwas Besonderes: Ein gemeinsames Abenteuer mit <strong className="text-emerald-400">ChatGPT</strong>.
          </p>

          <p>
            Das Kind beschreibt, was gebaut werden soll – ein Raumschiff, ein Drachen, eine Feuerwehrbasis. <strong className="text-emerald-400">ChatGPT</strong> liefert Ideen, Schritt-für-Schritt-Anleitungen und sogar Geschichten dazu.
          </p>

          <p>
            Zusammen bauen Papa und Kind nicht nur Modelle. Sie bauen <strong className="text-emerald-400">Erinnerungen</strong>. Sie lachen über Fehlversuche, feiern Erfolge und entdecken gemeinsam neue Welten aus bunten Steinen.
          </p>

          <div className="bg-slate-900/50 rounded-xl p-6 mt-8 border-l-4 border-emerald-500">
            <p className="text-white font-semibold text-lg mb-2">
              💡 KI-Lampe ist der Ort, an dem moderne Papas Inspiration, Anleitungen und Ideen finden.
            </p>
            <p className="text-slate-300">
              Hier geht es um <strong className="text-emerald-400">Papa-Kind-Bindung</strong>, <strong className="text-emerald-400">Kreativität</strong> und sinnvolle Bildschirmzeit, die euch näher zusammenbringt.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

