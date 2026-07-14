/**
 * Keyword tags (client-safe — pure data, NO fs, so both the client footer panel and the server
 * keyword page can import it).
 *
 * Each keyword is a REAL topic that appears in the articles; `match` lists the lowercase substrings
 * tested against an article's title + description + topic + body. The list is hand-curated so every
 * keyword resolves to at least one article — no dead links, no empty pages. When adding a keyword,
 * make sure it actually matches content (see /keyword/[slug]).
 */
export interface KeywordDef {
  label: string;
  slug: string;
  match: string[];
}

export function keywordSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function def(label: string, match: string[]): KeywordDef {
  return { label, slug: keywordSlug(label), match };
}

// Order: AI tools first (the blog's core), then art/creative, then games/design.
export const KEYWORDS: KeywordDef[] = [
  def("Stable Diffusion", ["stable diffusion"]),
  def("ComfyUI", ["comfyui"]),
  def("Flux", ["flux"]),
  def("Flux Kontext", ["flux kontext"]),
  def("Automatic1111", ["automatic1111", "a1111"]),
  def("RunPod", ["runpod"]),
  def("ChatGPT", ["chatgpt"]),
  def("OpenAI", ["openai"]),
  def("NVIDIA", ["nvidia"]),
  def("Microsoft", ["microsoft"]),
  def("LoRA", ["lora"]),
  def("Anime", ["anime"]),
  def("Ghibli", ["ghibli"]),
  def("Prompts", ["prompt"]),
  def("Upscaling", ["upscal", "hochskal"]),
  def("Real-ESRGAN", ["esrgan"]),
  def("n8n", ["n8n"]),
  def("MusicGPT", ["musicgpt"]),
  def("Mozart AI", ["mozart"]),
  def("Vibe Voice", ["vibe voice"]),
  def("GPU", ["gpu"]),
  def("Godot", ["godot"]),
  def("Game Design", ["game design", "game-design"]),
  def("Platform Fighter", ["platform fighter"]),
  def("Smash Bros", ["smash"]),
  def("Kirby", ["kirby"]),
  def("Zelda", ["zelda"]),
  def("Star Wars", ["star wars", "obi-wan", "kenobi"]),
  def("GameCube", ["gamecube"]),
  def("Pikmin", ["pikmin"]),
  def("Disney", ["disney"]),
];

export function keywordBySlug(slug: string): KeywordDef | undefined {
  return KEYWORDS.find((k) => k.slug === slug);
}
