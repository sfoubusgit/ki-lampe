"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { CloudGpuCTA } from "./CloudGpuCTA";

interface MarkdownContentProps {
  content: string;
  /** Pillar accent colour for headings / callouts / code labels. */
  accent?: string;
}

function isLocalImage(src: string | undefined): boolean {
  if (!src) return false;
  return src.startsWith("/") && !src.startsWith("//");
}

/** Plain text of arbitrary React children (for heading ids). */
function childText(children: any): string {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(childText).join("");
  if (children.props) return childText(children.props.children);
  return "";
}

/** Slug that matches the one used by the Table of Contents. */
export function headingSlug(s: string): string {
  return s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

/** Detect a callout from the leading emoji/keyword of a blockquote. */
function detectCallout(text: string, accent: string): { icon: string; label: string; color: string } | null {
  const t = text.trim();
  if (/^(💡|🎯)/.test(t) || /^\**\s*(tipp?|tip)\b/i.test(t)) return { icon: "💡", label: "Tipp", color: accent };
  if (/^(⚠|⚠️|🚨)/.test(t) || /^\**\s*(warnung|warning|achtung)\b/i.test(t)) return { icon: "⚠️", label: "Achtung", color: "#e0a23a" };
  if (/^(🧪)/.test(t) || /^\**\s*(test|ausprobieren)\b/i.test(t)) return { icon: "🧪", label: "Ausprobieren", color: "#14b8a6" };
  if (/^(🔑)/.test(t) || /^\**\s*(key|kernpunkt|merke)\b/i.test(t)) return { icon: "🔑", label: "Merke", color: accent };
  if (/^(📌|🧭|📐|ℹ️|ℹ)/.test(t) || /^\**\s*(hinweis|note|info)\b/i.test(t)) return { icon: "📌", label: "Hinweis", color: "#8b5cf6" };
  return null;
}

function CodeBlock({ lang, text }: { lang: string; text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative my-6 group">
      <div className="absolute right-2 top-2 z-10 flex items-center gap-2">
        {lang && <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/40">{lang}</span>}
        <button
          onClick={() => { navigator.clipboard?.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
          className="text-[11px] font-mono px-2 py-1 rounded border border-foreground/15 bg-background/60 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          {copied ? "✓ kopiert" : "Kopieren"}
        </button>
      </div>
      <pre className="!mt-0"><code className={lang ? `language-${lang}` : undefined}>{text}</code></pre>
    </div>
  );
}

// Editorial design tokens. The H2 bar / H3 dash use a CSS var so they flip in dark mode;
// the callout colour is a fixed gold hex (hexA() needs a hex to compute the tint).
const ED_BAR = "var(--ed-gold-2)";
const ED_FONT = "var(--font-fraunces), Georgia, serif";
const ED_CALLOUT_GOLD = "#c19a3c";

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: () => null,
        h2: ({ children }) => {
          const id = headingSlug(childText(children));
          return (
            <h2 id={id} className="scroll-mt-28" style={{ fontFamily: ED_FONT, fontWeight: 600, color: "var(--color-foreground)", borderLeft: `3px solid ${ED_BAR}`, paddingLeft: "0.5em" }}>
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const id = headingSlug(childText(children));
          return (
            <h3 id={id} className="scroll-mt-28" style={{ fontFamily: ED_FONT, fontWeight: 600, color: "var(--color-foreground)" }}>
              <span style={{ color: ED_BAR, marginRight: "0.4em" }}>—</span>{children}
            </h3>
          );
        },
        h4: ({ node, ...props }) => <h4 {...props} />,
        // Images sit in their own <div> (with Next/Image); markdown wraps them in
        // <p>, and <div> inside <p> is invalid HTML → hydration error. Unwrap
        // image-only paragraphs so the image renders at block level.
        p: ({ node, children }: any) => {
          const kids = (node?.children || []).filter((c: any) => !(c.type === "text" && !String(c.value || "").trim()));
          if (kids.length === 1 && kids[0].tagName === "img") return <>{children}</>;
          // Marker → designed affiliate card. Write [[CLOUD_CTA]] on its own line in any article.
          if (childText(children).trim() === "[[CLOUD_CTA]]") return <CloudGpuCTA />;
          return <p>{children}</p>;
        },
        // Override <pre> (the block-code wrapper) so the copy-button lives at the top
        // level — never a <div> nested inside <pre> (that causes hydration mismatch).
        pre: ({ children }: any) => {
          const el = Array.isArray(children) ? children[0] : children;
          const cls = (el && el.props && el.props.className) || "";
          const text = childText(el && el.props ? el.props.children : "");
          return <CodeBlock lang={cls.replace("language-", "")} text={text.replace(/\n$/, "")} />;
        },
        code: ({ className, children, ...props }: any) => <code className={className} {...props}>{children}</code>,
        blockquote: ({ children }) => {
          const c = detectCallout(childText(children), ED_CALLOUT_GOLD);
          if (!c) return <blockquote>{children}</blockquote>;
          return (
            <div className="my-6 rounded-lg p-4 pl-5" style={{ borderLeft: `4px solid ${c.color}`, background: hexA(c.color, 0.08) }}>
              <div className="flex items-center gap-2 mb-1 font-semibold" style={{ color: c.color }}>
                <span>{c.icon}</span><span className="text-sm uppercase tracking-wide">{c.label}</span>
              </div>
              <div className="callout-body [&>p]:my-1 [&>p:last-child]:mb-0">{children}</div>
            </div>
          );
        },
        img: ({ node, src, alt, ...props }: any) => {
          if (isLocalImage(src)) {
            return (
              <div className="relative w-full my-8 desktop:my-10">
                <Image src={src} alt={alt || ""} width={1200} height={600} className="w-full h-auto rounded-sm border border-foreground/10" style={{ objectFit: "contain" }} />
              </div>
            );
          }
          return <img src={src} alt={alt || ""} className="w-full h-auto rounded-sm border border-foreground/10 my-8 desktop:my-10" {...props} />;
        },
        table: ({ node, ...props }) => <table {...props} />,
        thead: ({ node, ...props }) => <thead {...props} />,
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => <tr {...props} />,
        th: ({ node, ...props }) => <th {...props} />,
        td: ({ node, ...props }) => <td {...props} />,
        hr: ({ node, ...props }) => <hr {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
