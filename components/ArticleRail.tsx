"use client";

import { useEffect, useMemo, useState } from "react";
import { headingSlug } from "@/components/MarkdownContent";

type Heading = { level: number; text: string; id: string };

function extractHeadings(md: string): Heading[] {
  const noCode = md.replace(/```[\s\S]*?```/g, "");
  const out: Heading[] = [];
  for (const line of noCode.split("\n")) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) {
      const text = m[2].replace(/[*_`[\]]/g, "").trim();
      out.push({ level: m[1].length, text, id: headingSlug(text) });
    }
  }
  return out;
}

/**
 * Sticky reading-companion rail: an editorial "Inhalt" TOC with glowing lamp-dot
 * section markers + reading progress, and one tasteful "Empfohlen" sidebar ad.
 */
export function ArticleRail({ content }: { content: string }) {
  const headings = useMemo(() => extractHeadings(content), [content]);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px" }
    );
    els.forEach((e) => obs.observe(e));
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [headings]);

  return (
    <div>
      {headings.length >= 3 && (
        <nav className="ed-toc">
          <div className="ed-toc-head">Inhalt</div>
          <div className="ed-toc-progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <ul>
            {headings.map((h) => (
              <li key={h.id} className={`${h.level === 3 ? "sub" : ""} ${active === h.id ? "on" : ""}`}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="ed-railad">
        <div className="ed-railad-label">Empfohlen</div>
        <a className="ed-railad-card" href="https://runpod.io?ref=jo7pk601" target="_blank" rel="sponsored noopener noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/runpod-logo-white.svg" alt="RunPod" />
          <div className="ed-railad-text">
            Keine starke GPU? Führe ComfyUI in der Cloud aus — ab <b>0,50&nbsp;€/h</b>.
          </div>
          <span className="ed-railad-btn">RunPod testen →</span>
        </a>
      </div>
    </div>
  );
}
