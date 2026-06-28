import { getArticleBySlugAndLanguage } from "@/lib/content";
import { firstThemaOf } from "@/lib/themen";
import { CoverCard } from "@/components/CoverCard";

/**
 * Internal render harness (not linked, noindex). Renders ONE article's cover
 * card at a fixed width so the bake script (studio/bake_cards.mjs) can screenshot
 * it into a static titled cover raster. ?slug=<slug>&lang=de|en&w=<px>
 */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default function CardRender({
  searchParams,
}: {
  searchParams: { slug?: string; lang?: string; w?: string };
}) {
  const slug = searchParams.slug || "";
  const lang = (searchParams.lang === "en" ? "en" : "de") as "de" | "en";
  const width = Math.max(280, Math.min(900, parseInt(searchParams.w || "360", 10) || 360));

  const a =
    getArticleBySlugAndLanguage(slug, lang) ||
    getArticleBySlugAndLanguage(slug, lang === "en" ? "de" : "en");
  const m = a?.metadata;
  const { category, parent } = m ? firstThemaOf(m) : {};
  const dateLabel = m?.date
    ? m.date.toLocaleDateString(lang === "en" ? "en-US" : "de-DE", { day: "2-digit", month: "short", year: "numeric" })
    : "";

  return (
    <div
      className="dark"
      style={{ background: "#0a0c12", margin: 0, padding: 0, display: "flex", justifyContent: "flex-start" }}
    >
      {/* Hide the global fixed chrome (sidebar + mobile hamburger) so it can't overlap the card screenshot */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            ".fixed{display:none !important}" +
            "#cardwrap .kl-card{border-radius:0 !important;border:0 !important;background:#151824 !important}",
        }}
      />
      <div id="cardwrap" style={{ width }}>
        <CoverCard
          href="#"
          image={m?.image}
          title={m?.title || slug}
          category={category}
          parent={parent}
          dateLabel={dateLabel}
          readTime={m?.readTime}
        />
      </div>
    </div>
  );
}
