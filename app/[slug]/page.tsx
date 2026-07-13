import { notFound, permanentRedirect } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlugAndLanguage } from "@/lib/content";

/**
 * Bare-slug safety net.
 *
 * The canonical article route is /article/<slug>. Historically (pre-redesign) and in a few
 * hand-written internal links, articles were referenced at the root: /<slug>. Those bare URLs
 * would otherwise 404. This catch-all permanently redirects any root-level path that resolves
 * to a real article to /article/<slug>, and 404s everything else.
 *
 * Static route segments (/about, /news, /article, /keyword, ...) take priority over this dynamic
 * segment, so this only ever handles otherwise-unmatched single-segment paths.
 */
export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

interface BareSlugProps {
  params: { slug: string };
}

export default function BareSlugRedirect({ params }: BareSlugProps) {
  const article =
    getArticleBySlugAndLanguage(params.slug, "de") ||
    getArticleBySlugAndLanguage(params.slug, "en");
  if (!article) notFound();
  permanentRedirect(`/article/${params.slug}`);
}
