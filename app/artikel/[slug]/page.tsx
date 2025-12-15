import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getHeroImage } from "@/lib/getHeroImage";
import { getArticle, getAllArticles, getRelatedArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { ArticleImage } from "@/components/ArticleImage";
import { AffiliateProductBox } from "@/components/AffiliateProductBox";
import NewsletterLeadMagnet from "@/components/NewsletterLeadMagnet";
import { BrandStory } from "@/components/BrandStory";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

// SEO: Dynamische Meta-Daten pro Artikel
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Ensure params are available
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Artikel nicht gefunden",
    };
  }

  let hero = article.image || getHeroImage(slug);
  // Use placeholder if no image found (for OpenGraph)
  if (!hero) {
    // For OpenGraph, use a simple placeholder URL
    hero = `https://via.placeholder.com/1200x630/0f172a/10b981?text=KI-Lampe`;
  }

  // SEO: Spezielle Meta-Daten für LEGO-Artikel
  const isLegoArticle = slug === 'ki-lego-objekte-bauen';
  const seoKeywords = article.seoKeywords || [];
  
  return {
    title: article.title,
    description: article.excerpt || "",
    keywords: seoKeywords.length > 0 ? seoKeywords : undefined,
    alternates: {
      canonical: `https://ki-lampe.com/artikel/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: [hero], // OG Bild
      type: 'article',
      ...(isLegoArticle && {
        // Zusätzliche OG-Daten für LEGO-Artikel
        url: `https://ki-lampe.com/artikel/${slug}`,
      }),
    },
  };
}

// Für Static Generation: alle Slugs vorab generieren
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  console.log(`Rendering article for slug: ${slug}`);

  const article = await getArticle(slug);

  if (!article) {
    console.log(`Article not found for slug: ${slug}`);
    return notFound();
  }

  // Get related articles for sidebar
  const relatedArticles = await getRelatedArticles(slug, article.category, article.tags, 3);

  // Prefer explicitly defined image from frontmatter, fallback to slug-based lookup
  let hero = article.image || getHeroImage(slug);
  
  // If no image found, use a gradient placeholder that matches the blog theme
  if (!hero) {
    // Create a data URI for a gradient placeholder
    const svgContent = [
      '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">',
      '<defs>',
      '<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">',
      '<stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />',
      '<stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />',
      '<stop offset="100%" style="stop-color:#064e3b;stop-opacity:1" />',
      '</linearGradient>',
      '</defs>',
      '<rect width="1200" height="630" fill="url(#grad)"/>',
      '<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="#10b981" text-anchor="middle" dominant-baseline="middle" opacity="0.3">KI-Lampe</text>',
      '</svg>'
    ].join('');
    hero = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }
  
  // Show sidebar with affiliate box for all articles
  const showSidebar = true;

  return (
    <main className="min-h-screen bg-slate-900">
      <div className={`max-w-7xl mx-auto px-4 py-16 ${showSidebar ? 'grid grid-cols-1 lg:grid-cols-12 gap-8' : ''}`}>
        {/* MAIN CONTENT */}
        <article className={showSidebar ? "lg:col-span-8" : "max-w-4xl mx-auto"}>

          {/* HERO BILD */}
          <div className="relative w-full h-auto mb-12 rounded-2xl overflow-hidden shadow-lg shadow-black/30">
            <ArticleImage
              src={hero}
              alt={article.title}
              className="rounded-2xl"
              width={1200}
              height={630}
              priority
            />
          </div>

          {/* TITEL */}
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {article.title}
          </h1>

          {/* META-DATEN */}
          <div className="flex items-center text-slate-400 mb-10 text-sm font-medium">
            <time dateTime={article.date}>{formatDate(article.date)}</time>

            {article.category && (
              <>
                <span className="mx-2">•</span>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30">
                  {article.category}
                </span>
              </>
            )}
          </div>

          {/* BRAND-STORY für LEGO-Artikel */}
          {slug === 'ki-lego-objekte-bauen' && (
            <div className="mb-10">
              <BrandStory />
            </div>
          )}

          {/* ARTIKEL-INHALT */}
          <div
            className="prose prose-invert prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

	{slug === 'ki-als-werkzeug-kuenstler' && (
  <section className="mt-28 pt-16 pb-8 bg-gradient-to-br from-emerald-900/20 to-slate-900/30 rounded-3xl shadow-xl mb-16">
    <div className="max-w-4xl mx-auto px-4">
      <div className="max-w-2xl mx-auto -mt-6 relative z-10">
        <div className="bg-slate-800/90 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6">
          
          {/* DOWNLOAD FORMULAR OBEN */}
          <NewsletterLeadMagnet leadSlug="10-ki-prompts-grafiktablett" />
          
          {/* BESCHREIBUNG UNTEN */}
          <div className="text-center p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
            <h3 className="text-lg font-bold text-emerald-300 mb-3">📄 Was du bekommst:</h3>
            <ul className="text-left text-slate-300 text-sm space-y-1 max-w-md mx-auto">
              <li>• <span className="font-bold text-emerald-200">10 Schritt-für-Schritt KI-Prompts</span></li>
              <li>• Speziell für Wacom/iPad Künstler</li>
              <li>• <span className="font-bold text-emerald-200">Von grober Skizze → Artstation-Ready</span></li>
              <li>• Detaillierte Anleitungen + Pro-Tipps</li>
            </ul>
            <p className="text-xs text-slate-400 mt-4 font-medium">100% kostenlos – nur deine E-Mail!</p>
          </div>
          
        </div>
      </div>
    </div>
  </section>
)}

          {/* VERWANDTE ARTIKEL - Unter dem Artikel */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-slate-700">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                Verwandte <span className="text-emerald-400">Artikel</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/artikel/${related.slug}`}
                    className="group bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {related.image && (
                      <div className="relative overflow-hidden h-40 bg-slate-700">
                        <Image
                          src={related.image}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs text-slate-400 mb-2 font-medium">
                        {formatDate(related.date)}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                        {related.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* SIDEBAR CONTAINER */}
        {showSidebar && (
          <aside className="w-full md:w-80 lg:w-72 xl:w-64 shrink-0 lg:col-span-4">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto space-y-10 pr-2 sidebar-scrollbar">
              
              {/* Spezielle Sidebar für KI-als-Werkzeug-Artikel */}
              {slug === 'ki-als-werkzeug-kuenstler' ? (
                <>
                  {/* AFFILIATE PRODUKTE - Grafiktabletts */}
                  <section>
                    <h3 className="text-lg font-semibold mb-4 text-white">🎨 Empfohlene Grafiktabletts</h3>
                    <div className="space-y-6">
                      {/* Empfohlen */}
                      <AffiliateProductBox
                        title="Wacom One (Medium)"
                        description="Natürliches Zeichengefühl – perfekt für digitale Künstler. Hohe Druckempfindlichkeit und professionelle Qualität für KI-Workflows."
                        affiliateUrl="https://amzn.to/4auakLo"
                        imageSrc="/images/wacom_one.webp"
                        imageAlt="Wacom One Medium Grafiktablett"
                        className="max-w-full"
                      />
                      
                      {/* Budget-Option */}
                      <AffiliateProductBox
                        title="XP-Pen Artist 12 (2nd Gen)"
                        description="Budgetfreundliches Display-Tablet mit starkem Farbraum. Ideal für Einsteiger, die KI-Generierungen transformieren möchten."
                        affiliateUrl="https://amzn.to/4pbixbW"
                        imageSrc="/images/XP-Pen_artist_12.webp"
                        imageAlt="XP-Pen Artist 12 Grafiktablett"
                        className="max-w-full"
                      />
                      
                      {/* Profi-Option */}
                      <AffiliateProductBox
                        title="Huion Kamvas 13"
                        description="Profi-Stifttechnologie – ideal für präzises Überarbeiten. Premium-Features für fortgeschrittene Künstler mit KI-Workflows."
                        affiliateUrl="https://amzn.to/3Maj8fB"
                        imageSrc="/images/Huion_Kamvas_13.webp"
                        imageAlt="Huion Kamvas 13 Grafiktablett"
                        className="max-w-full"
                      />
                    </div>
                  </section>

                  {/* PINTEREST WIDGET (optional) */}
                  <section>
                    <div className="mt-8">
                      {/* Optionales Pinterest Widget */}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  {/* LEGO-Box NUR für den spezifischen LEGO-Artikel anzeigen */}
                  {slug === 'ki-lego-objekte-bauen' && (
                    <section>
                      <h2 className="text-xl font-bold text-white mb-4">Empfohlene Produkte</h2>
                      <AffiliateProductBox
                        title="LEGO Classic 10715 – Kreativ-Bauset Fahrzeuge"
                        description="Perfektes Set für Papa-Kind-Projekte mit ChatGPT. Ideal für kreative KI-LEGO-Bauideen. Viele verschiedene Steine, keine feste Anleitung – maximale Kreativität."
                        affiliateUrl="https://amzn.to/489ykSJ"
                        imageSrc="/images/lego-classic-box.webp"
                        imageAlt="LEGO Classic 10715 Kreativ-Bauset Fahrzeuge"
                        className="max-w-full"
                      />
                    </section>
                  )}
                  {/* Für alle anderen Artikel: keine Produktbox in der Sidebar */}
                </>
              )}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
