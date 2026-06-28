"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/language";
import { CoverCard } from "@/components/CoverCard";
import type { ArticleLite } from "@/lib/themen";

/**
 * Home/browse grid: search + Thema filter pills + the universal card grid.
 * Filters the (both-language) article list down to the active language.
 */
export function ArticleBrowser({
  articles,
  pills,
}: {
  articles: ArticleLite[];
  pills: { slug: string; name: string }[];
}) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(""); // thema slug or "" = all

  const t = language === "en"
    ? { kicker: "All guides", search: "Search guides — e.g. „Flux“, „RunPod“, „Upscaling“…", all: "All", empty: "No guides found." }
    : { kicker: "Alle Anleitungen", search: "Anleitungen durchsuchen — z. B. „Flux“, „RunPod“, „Upscaling“…", all: "Alle", empty: "Keine Anleitungen gefunden." };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        a.language === language &&
        (!active || a.themen.includes(active)) &&
        (!q || a.title.toLowerCase().includes(q))
    );
  }, [articles, language, active, query]);

  return (
    <div>
      <div className="th-sec">{t.kicker}</div>
      <div className="th-searchbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <input className="th-search" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="th-pills">
        <button className={`th-pill ${active === "" ? "on" : ""}`} onClick={() => setActive("")}>
          <span className="th-pd" />{t.all}
        </button>
        {pills.map((p) => (
          <button key={p.slug} className={`th-pill ${active === p.slug ? "on" : ""}`} onClick={() => setActive(p.slug)}>
            {p.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="th-empty">{t.empty}</p>
      ) : (
        <div className="kl-grid">
          {visible.map((a) => (
            <CoverCard
              key={`${a.language}-${a.slug}`}
              href={`/article/${a.slug}`}
              image={a.image}
              title={a.title}
              category={a.category}
              parent={a.parent}
              dateLabel={a.dateLabel}
              readTime={a.readTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}
