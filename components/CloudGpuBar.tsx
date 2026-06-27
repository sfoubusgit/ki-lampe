"use client";

import { useEffect, useState } from "react";

/**
 * CloudGpuBar — a slim, dismissible sticky bar promoting the RunPod affiliate.
 * Rendered on article pages (where GPU-intent readers are). Remembers dismissal in localStorage.
 */
export function CloudGpuBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(localStorage.getItem("rp_bar_dismissed") !== "1");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const dismiss = () => {
    try {
      localStorage.setItem("rp_bar_dismissed", "1");
    } catch {}
    setShow(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "linear-gradient(90deg,#14121d 0%,#241d3d 100%)",
        borderTop: "1px solid rgba(139,92,246,0.4)",
        boxShadow: "0 -8px 30px -12px rgba(0,0,0,0.5)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-2.5 flex items-center gap-3 flex-wrap justify-center desktop:justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/runpod-logo-white.svg" alt="RunPod" className="h-4 w-auto shrink-0" />
          <span className="text-sm truncate" style={{ color: "rgba(255,255,255,0.85)" }}>
            Keine starke GPU? Führe KI-Modelle in der Cloud aus – ab ~0,50&nbsp;€/h.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://runpod.io?ref=jo7pk601"
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="rounded-md px-3.5 py-1.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "#7c5cff", color: "#ffffff" }}
          >
            RunPod testen →
          </a>
          <button
            onClick={dismiss}
            aria-label="Schließen"
            className="px-2 py-1 text-lg leading-none transition-opacity hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
