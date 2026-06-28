import { getAllArticles, type ArticleMetadata } from "@/lib/content";

/**
 * Themen (niches) — the subcategory system.
 * Each article is auto-assigned to one or more Themen via a keyword map over its
 * title + topic + description + slug, so no manual per-article tagging is needed.
 */
export type Parent = "ki" | "game" | "kunst";

export interface Thema {
  slug: string;
  name: string;
  icon: string; // key into ThemaIcon
  parent: Parent;
  blurb: string;
  keywords: string[];
}

export const PARENTS: Record<Parent, { name: string }> = {
  ki: { name: "KI & Tools" },
  game: { name: "Game Design" },
  kunst: { name: "Kunst & KI" },
};

export const THEMEN: Thema[] = [
  { slug: "bildgenerierung", name: "Bildgenerierung", icon: "image", parent: "ki",
    blurb: "ComfyUI, Flux, SDXL & Stable Diffusion — Anleitungen, Workflows und Tools für KI-Bilder.",
    keywords: ["comfyui", "flux", "stable diffusion", "sdxl", "automatic1111", "a1111", "forge", "img2img", "txt2img", "lora", "ideogram", "krea", "diffusion"] },
  { slug: "ki-musik", name: "KI-Musik & Audio", icon: "music", parent: "ki",
    blurb: "Songs, Soundtracks und Sprachsynthese mit KI erstellen.",
    keywords: ["musik", "audio", "song", "soundtrack", "mozart", "musicgpt", "suno", "voice", "sprachsynth", "vibe voice", "stimme"] },
  { slug: "cloud-gpu", name: "Cloud & GPU", icon: "cloud", parent: "ki",
    blurb: "KI-Modelle in der Cloud ausführen — RunPod, GPUs und lokale Setups.",
    keywords: ["runpod", "gpu", "cloud", "vram", "grafikkarte", "vast", "rechenleistung"] },
  { slug: "upscaling", name: "Upscaling", icon: "upscale", parent: "ki",
    blurb: "Bilder hochskalieren und in der Qualität verbessern.",
    keywords: ["upscal", "esrgan", "hochskal", "hochskalieren"] },
  { slug: "ki-video", name: "KI-Video", icon: "film", parent: "ki",
    blurb: "Video- und Animationsgenerierung mit KI.",
    keywords: ["ki-video", "wan 2", "animation", "video-to", "motion transfer", "runway", "kling"] },
  { slug: "automatisierung", name: "Automatisierung", icon: "cog", parent: "ki",
    blurb: "Workflows automatisieren — n8n & Co.",
    keywords: ["n8n", "automatisier", "zapier"] },
  { slug: "text-ki", name: "Text & Chatbots", icon: "message", parent: "ki",
    blurb: "ChatGPT, LLMs und Text-KI im Einsatz.",
    keywords: ["chatgpt", "llm", "chatbot", "sprachmodell", "lego"] },
  { slug: "ki-gesellschaft", name: "KI & Gesellschaft", icon: "globe", parent: "ki",
    blurb: "KI in Wirtschaft, Medien und Kultur — Einordnungen und Meinung.",
    keywords: ["investi", "wirtschaft", "milliarden", "openai", "nvidia", "microsoft", "disney", "gesellschaft", "medien", "zukunft", "star wars", "obi-wan", "ethik"] },
  { slug: "gaming-kultur", name: "Gaming-Kultur", icon: "gamepad", parent: "game",
    blurb: "Nintendo, Zelda, Kirby & die Kultur hinter den Spielen.",
    keywords: ["kirby", "zelda", "gamecube", "nintendo", "smash", "pikmin", "link", "mario"] },
  { slug: "game-design", name: "Game-Design", icon: "grid", parent: "game",
    blurb: "Mechaniken, Design-Prinzipien und wie Spiele funktionieren.",
    keywords: ["game design", "game-design", "mechanik", "z-targeting", "platform fighter", "spielmechanik", "level design"] },
  { slug: "game-engines", name: "Engines & Tools", icon: "wrench", parent: "game",
    blurb: "Godot, Unity & Co. — Engines und Werkzeuge für Spiele.",
    keywords: ["godot", "unity", "unreal", "engine"] },
  { slug: "ki-kunst", name: "KI-Kunst", icon: "brush", parent: "kunst",
    blurb: "KI-Kunst, Stile und kreative Techniken.",
    keywords: ["kunst", "hintergrundtextur", "fan art", "ästhetik", "textur"] },
  { slug: "kreativitaet", name: "Kreativität & KI", icon: "sparkle", parent: "kunst",
    blurb: "KI als kreatives Werkzeug — Inspiration und Methoden.",
    keywords: ["kreativ", "künstler", "inspiration"] },
];

/** Niches need at least this many articles before they get a public page/card (thin-content guard). */
export const MIN_THEMA = 3;

/** getAllArticles() reads every content source (DE + EN dirs), so it can return the same
 *  article twice. Dedup by slug + title, keeping the first (DE) occurrence. */
function uniqueArticles(): ArticleMetadata[] {
  const seenSlug = new Set<string>();
  const seenTitle = new Set<string>();
  const out: ArticleMetadata[] = [];
  for (const a of getAllArticles()) {
    const t = a.title.trim().toLowerCase();
    if (seenSlug.has(a.slug) || (t && seenTitle.has(t))) continue;
    seenSlug.add(a.slug);
    if (t) seenTitle.add(t);
    out.push(a);
  }
  return out;
}

function hay(a: ArticleMetadata): string {
  return `${a.title} ${a.topic || ""} ${a.description || ""} ${a.slug}`.toLowerCase();
}

/** Slugs of all Themen an article belongs to (multi-tag). */
export function themenOfArticle(a: ArticleMetadata): string[] {
  const h = hay(a);
  return THEMEN.filter((t) => t.keywords.some((k) => h.includes(k))).map((t) => t.slug);
}

export function getThema(slug: string): Thema | null {
  return THEMEN.find((t) => t.slug === slug) || null;
}

export function getArticlesByThema(slug: string): ArticleMetadata[] {
  return uniqueArticles()
    .filter((a) => themenOfArticle(a).includes(slug))
    .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0));
}

/** Article count per Thema slug. */
export function themaCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const t of THEMEN) counts[t.slug] = 0;
  for (const a of uniqueArticles()) {
    for (const s of themenOfArticle(a)) counts[s] = (counts[s] || 0) + 1;
  }
  return counts;
}

export interface ArticleLite {
  slug: string;
  title: string;
  image?: string;
  readTime?: string;
  dateLabel: string;
  themen: string[];
}

/** All articles in a lightweight, client-passable shape (with their Themen tags). */
export function allArticlesLite(): ArticleLite[] {
  return uniqueArticles()
    .slice()
    .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))
    .map((a) => ({
      slug: a.slug,
      title: a.title,
      image: a.image,
      readTime: a.readTime,
      dateLabel: a.date
        ? a.date.toLocaleDateString("de-DE", { day: "2-digit", month: "short", year: "numeric" })
        : "",
      themen: themenOfArticle(a),
    }));
}
