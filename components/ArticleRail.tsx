/**
 * Sticky sidebar — a stack of visual image-cards (full-bleed image + gradient + overlaid
 * title/pitch/button), in the editorial/lamp identity. No text TOC.
 */
type Card = {
  img: string;
  label: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  external?: boolean;
  accent?: string;
};

const CARDS: Card[] = [
  {
    img: "/sidebar/runpod.webp",
    label: "Empfohlen",
    title: "ComfyUI in der Cloud",
    text: "Keine starke GPU? Miete eine — ab 0,50 €/h.",
    cta: "RunPod testen",
    href: "https://runpod.io?ref=jo7pk601",
    external: true,
    accent: "#7c5cff",
  },
  {
    img: "/sidebar/lamp.webp",
    label: "KI-Lampe",
    title: "Mehr KI-Tutorials",
    text: "Alle Anleitungen, Tools & Guides entdecken.",
    cta: "Entdecken",
    href: "/",
    accent: "#c9972f",
  },
];

export function ArticleRail() {
  return (
    <div className="ed-rail">
      {CARDS.map((c, i) => (
        <a
          key={i}
          className="ed-card"
          href={c.href}
          {...(c.external ? { target: "_blank", rel: "sponsored noopener noreferrer" } : {})}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ed-card-img" src={c.img} alt="" loading="lazy" />
          <div className="ed-card-overlay">
            <div className="ed-card-label">{c.label}</div>
            <div className="ed-card-title">{c.title}</div>
            <div className="ed-card-text">{c.text}</div>
            <span className="ed-card-btn" style={{ background: c.accent }}>
              {c.cta} →
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
