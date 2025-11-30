import { notFound } from "next/navigation";
import { getHeroImage } from "@/lib/getHeroImage";
import { getArticle, getAllArticles } from "@/lib/articles";
import { formatDate } from "@/lib/utils";
import { ArticleImage } from "@/components/ArticleImage";
import type { Metadata } from "next";
import { AdSidebar } from "@/components/AdSidebar";

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

  return {
    title: article.title,
    description: article.excerpt || "",
    alternates: {
      canonical: `https://ki-lampe.com/artikel/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt || "",
      images: [hero], // OG Bild
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

  // Prefer explicitly defined image from frontmatter, fallback to slug-based lookup
  let hero = article.image || getHeroImage(slug);
  
  // If no image found, use a gradient placeholder that matches the blog theme
  if (!hero) {
    // Create a data URI for a gradient placeholder
    hero = `data:image/svg+xml,${encodeURIComponent(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#1e293b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#064e3b;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="48" fill="#10b981" text-anchor="middle" dominant-baseline="middle" opacity="0.3">KI-Lampe</text>
      </svg>
    `)}`;
  }
  
  // Check if this is the Lego article that should have sidebar ads
  const showSidebar = slug === "ki-lego-objekte-bauen";

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

          {/* ARTIKEL-INHALT */}
          <div
            className="prose prose-invert prose-emerald max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        {/* SIDEBAR WITH AFFILIATE ADS (only for Lego article) */}
        {showSidebar && (
          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Empfohlene Produkte</h2>
              <AdSidebar
                adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
                adSlot="1234567897"
              />
              <AdSidebar
                adClient={process.env.GOOGLE_ADSENSE_CLIENT_ID}
                adSlot="1234567898"
              />
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
