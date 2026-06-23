import type { MetadataRoute } from "next";
import { getAllArticleSlugs, CATEGORIES } from "@/lib/content";

const BASE = "https://ki-lampe.com";

// Sitemap for the v2 design — lists every current URL so Google re-indexes the new
// /article/<slug>, /category/<slug> and static pages (the old sitemap pointed at dead /artikel paths).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = ["", "/news", "/about", "/imprint", "/privacy", "/terms"];
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));

  for (const category of CATEGORIES) {
    entries.push({
      url: `${BASE}/category/${category}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  for (const slug of getAllArticleSlugs()) {
    entries.push({
      url: `${BASE}/article/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
