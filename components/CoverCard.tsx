import Link from "next/link";

/**
 * The universal KI-Lampe article card: art-only cover image with a live CSS
 * overlay (category pill + KI•LAMPE wordmark over a scrim), then the title +
 * date · read-time below. One component for every listing (home, themen, category).
 *
 * Covers are ART-ONLY (no baked text). The locked generation recipe lives in the
 * HQ studio: studio/kilampe_covers/ (recipe.py + prompts.json). See docs/cover-images.md.
 */
export function CoverCard({
  href,
  image,
  title,
  category,
  parent,
  dateLabel,
  readTime,
}: {
  href: string;
  image?: string;
  title: string;
  category?: string;
  parent?: "ki" | "game" | "kunst";
  dateLabel?: string;
  readTime?: string;
}) {
  const meta = [dateLabel, readTime].filter(Boolean).join(" · ");
  return (
    <Link href={href} className="kl-card">
      <div className="kl-thumb">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="kl-img" src={image} alt="" loading="lazy" />
        ) : (
          <div className={`kl-img kl-fallback ${parent || "ki"}`} />
        )}
        <div className="kl-scrim" />
        {category && <span className="kl-cat">{category}</span>}
        <span className="kl-wm">KI<span className="kl-ld" />LAMPE</span>
      </div>
      <div className="kl-body">
        <h3 className="kl-title">{title}</h3>
        {meta && <div className="kl-meta">{meta}</div>}
      </div>
    </Link>
  );
}
