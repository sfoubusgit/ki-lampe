import React from "react";

const PATHS: Record<string, React.ReactNode> = {
  image: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.6" /><path d="m21 15-4.5-4.5L5 21" /></>),
  music: (<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>),
  cloud: (<path d="M17.5 19a4.5 4.5 0 0 0 0-9h-1.3A7 7 0 1 0 9 19z" />),
  upscale: (<><path d="M3 16v5h5" /><path d="M21 8V3h-5" /><path d="M21 3 14 10" /><path d="m3 21 7-7" /></>),
  film: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" /></>),
  cog: (<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>),
  message: (<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" /></>),
  gamepad: (<><rect x="2" y="6" width="20" height="12" rx="5" /><path d="M6 12h4M8 10v4M15 12h.01M18 10h.01" /></>),
  grid: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
  wrench: (<path d="M15 7a4 4 0 0 0-5 5l-7 7 2 2 7-7a4 4 0 0 0 5-5l-3 3-2-2z" />),
  brush: (<><path d="M10 12 19 3a2 2 0 0 1 3 3l-9 9" /><path d="M7 14a3 3 0 0 0-3 3c0 1.3-1 2-2 2 1 1.2 2.5 2 4 2a4 4 0 0 0 4-4 3 3 0 0 0-3-3z" /></>),
  sparkle: (<path d="M12 3l2.2 6.6L21 12l-6.8 2.4L12 21l-2.2-6.6L3 12l6.8-2.4z" />),
};

export function ThemaIcon({ name, size = 30 }: { name: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name] || PATHS.image}
    </svg>
  );
}
