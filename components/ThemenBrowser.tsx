"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ThemaIcon } from "@/components/ThemaIcon";
import type { ArticleLite } from "@/lib/themen";

export interface ThemaCard {
  slug: string;
  name: string;
  icon: string;
  parent: "ki" | "game" | "kunst";
  count: number;
  hasPage: boolean; // count >= MIN_THEMA
}

const GRADS = ["g1", "g2", "g3", "g6", "g4", "g5"];

export function ThemenBrowser({
  themen,
  articles,
}: {
  themen: ThemaCard[];
  articles: ArticleLite[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(""); // thema slug or "" = Alle

  const featured = useMemo(
    () => themen.filter((t) => t.hasPage).sort((a, b) => b.count - a.count).slice(0, 8),
    [themen]
  );
  const pills = useMemo(
    () => themen.filter((t) => t.count > 0).sort((a, b) => b.count - a.count),
    [themen]
  );
  const nameOf = useMemo(() => Object.fromEntries(themen.map((t) => [t.slug, t.name])), [themen]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (!active || a.themen.includes(active)) &&
        (!q || a.title.toLowerCase().includes(q))
    );
  }, [articles, active, query]);

  return (
    <div>
      {/* Beliebte Themen */}
      <div className="th-sec">Beliebte Themen</div>
      <div className="th-qrow">
        {featured.map((t) => (
          <Link key={t.slug} href={`/themen/${t.slug}`} className={`th-qcard ${t.parent}`}>
            <span className="th-ico"><ThemaIcon name={t.icon} size={26} /></span>
            <div className="th-tname">{t.name}</div>
            <div className="th-tcount"><span className="th-ld" />{t.count} Artikel</div>
          </Link>
        ))}
      </div>

      {/* Browse */}
      <div className="th-sec">Alle Anleitungen</div>
      <div className="th-searchbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        <input
          className="th-search"
          placeholder="Anleitungen durchsuchen — z. B. „Flux“, „RunPod“, „Upscaling“…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="th-pills">
        <button className={`th-pill ${active === "" ? "on" : ""}`} onClick={() => setActive("")}>
          <span className="th-pd" />Alle
        </button>
        {pills.map((t) => (
          <button
            key={t.slug}
            className={`th-pill ${active === t.slug ? "on" : ""}`}
            onClick={() => setActive(t.slug)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="th-empty">Keine Anleitungen gefunden.</p>
      ) : (
        <div className="th-agrid">
          {visible.map((a, i) => (
            <Link key={a.slug} href={`/article/${a.slug}`} className="th-acard">
              <div className="th-thumb">
                {a.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="th-g" src={a.image} alt="" loading="lazy" />
                ) : (
                  <div className={`th-g ${GRADS[i % GRADS.length]}`} />
                )}
                {a.themen[0] && <span className="th-tag">{nameOf[a.themen[0]] || a.themen[0]}</span>}
              </div>
              <div className="th-abody">
                <div className="th-atitle">{a.title}</div>
                <div className="th-adate">{[a.dateLabel, a.readTime].filter(Boolean).join(" · ")}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
