# Header-Komponente - Dokumentation

## Übersicht

Der neue Glassmorphism-Header (`components/Header.tsx`) ist ein moderner, transparenter Header mit futuristischem Design, der über dem Hero-Background liegt.

## Features

- ✅ **Glassmorphism-Effekt**: Transparenter Hintergrund mit `backdrop-blur-xl`
- ✅ **Sticky Header**: Bleibt beim Scrollen sichtbar
- ✅ **Active-Link-Erkennung**: Automatische Hervorhebung der aktiven Seite
- ✅ **Responsive Design**: Desktop, Tablet, Mobile
- ✅ **Mobile Hamburger-Menü**: Vollflächiges Glass-Sheet-Menü
- ✅ **Suchfeld**: Integrierte Suche mit Live-Ergebnissen
- ✅ **CTA-Button**: "Artikel entdecken" Button

## Dateien

- `components/Header.tsx` - Hauptkomponente
- `components/HeaderSearchBar.tsx` - Kompakte Suchleiste für den Header
- `app/layout.tsx` - Integration im Layout

## Anpassungen

### Navigation-Links ändern

In `components/Header.tsx`, Zeile 29-34:

```tsx
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/artikel', label: 'Artikel' },
  { href: '/ueber', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
]
```

Einfach Links hinzufügen, entfernen oder ändern.

### Logo-Text ändern

In `components/Header.tsx`, Zeile 64-68:

```tsx
<span className="font-black text-xl md:text-2xl tracking-tight leading-none">
  <span className="text-white">KI</span>
  <span className="text-cyan-400">.</span>
  <span className="text-emerald-400">LAMPE</span>
</span>
```

- `KI` - Normaler Text (weiß)
- `.` - Punkt (cyan)
- `LAMPE` - Akzentfarbe (emerald)

### Farben anpassen

#### Header-Hintergrund
Zeile 48:
```tsx
className="... bg-slate-900/40 backdrop-blur-xl border-b border-cyan-500/10 ..."
```

- `bg-slate-900/40` - Hintergrund-Transparenz (40% Opacity)
- `border-cyan-500/10` - Border-Farbe (10% Opacity)

#### Glow-Effekt
Zeile 48:
```tsx
shadow-[0_0_40px_rgba(34,211,238,0.15)]
```

Ändere die RGB-Werte `(34,211,238)` für andere Farben:
- Cyan: `(34,211,238)`
- Emerald: `(16,185,129)`
- Amber: `(251,191,36)`

#### Aktive Links
Zeile 84:
```tsx
'text-white bg-cyan-500/15'
```

- `bg-cyan-500/15` - Hintergrund für aktive Links

#### CTA-Button
Zeile 105:
```tsx
className="... bg-emerald-500 hover:bg-emerald-400 ..."
```

Ändere `emerald-500` zu anderen Farben (z.B. `cyan-500`, `blue-500`).

### Glühbirnen-Badge anpassen

Zeile 58-61:
```tsx
<div className="relative">
  <div className="absolute inset-0 bg-amber-400 rounded-full blur-sm opacity-60 ..." />
  <div className="relative w-2 h-2 bg-amber-400 rounded-full" />
</div>
```

- `bg-amber-400` - Farbe des Badges
- `w-2 h-2` - Größe des Badges
- `opacity-60` - Glow-Intensität

### CTA-Button-Text ändern

Desktop (Zeile 107):
```tsx
Artikel entdecken
```

Mobile (Zeile 214):
```tsx
Artikel entdecken
```

### Suchfeld anpassen

Die Suchfeld-Komponente ist in `components/HeaderSearchBar.tsx`.

Breite ändern (Zeile 69):
```tsx
<div className="relative w-64">
```

Placeholder-Text (Zeile 78):
```tsx
placeholder="Artikel suchen..."
```

### Mobile Menü anpassen

Breite des Mobile-Menüs (Zeile 173):
```tsx
className="... w-full max-w-sm ..."
```

Hintergrund-Transparenz (Zeile 173):
```tsx
className="... bg-slate-950/80 backdrop-blur-2xl ..."
```

## Technische Details

### Active-Link-Erkennung

Die Komponente nutzt `usePathname()` von Next.js, um die aktuelle Route zu erkennen:

```tsx
const isActive = (href: string) => {
  if (href === '/') {
    return pathname === '/'
  }
  return pathname.startsWith(href)
}
```

### Mobile Menü

- Automatisches Schließen bei Route-Wechsel
- Body-Scroll wird blockiert, wenn Menü offen ist
- Backdrop-Blur für Glass-Effekt
- Slide-in Animation von rechts

### Z-Index

- Header: `z-40`
- Mobile Menü: `z-50`
- Search Dropdown: `z-50` (in HeaderSearchBar)

## Browser-Kompatibilität

- ✅ Chrome/Edge (neueste Versionen)
- ✅ Firefox (neueste Versionen)
- ✅ Safari (neueste Versionen)
- ⚠️ Ältere Browser: `backdrop-blur` wird möglicherweise nicht unterstützt (fällt auf soliden Hintergrund zurück)

## Performance

- Client-Side Rendering (`'use client'`)
- Optimierte Animationen mit CSS Transitions
- Keine unnötigen Re-Renders
- Lazy Loading der Search-Ergebnisse

## Accessibility

- ✅ Semantisches HTML (`<header>`, `<nav>`)
- ✅ ARIA-Labels für Buttons
- ✅ Keyboard-Navigation unterstützt
- ✅ Screen-Reader-freundlich

## Troubleshooting

### Header ist nicht transparent

Stelle sicher, dass der Hintergrund der Seite dunkel ist. Der Header ist für dunkle Hero-Bilder optimiert.

### Mobile Menü öffnet sich nicht

Prüfe, ob `'use client'` am Anfang der Datei steht.

### Active-Link funktioniert nicht

Stelle sicher, dass `usePathname()` korrekt importiert ist:
```tsx
import { usePathname } from 'next/navigation'
```

### Suchfeld zeigt keine Ergebnisse

Prüfe, ob die API-Route `/api/search` existiert und funktioniert.

---

*Erstellt: Glassmorphism-Header für KI.LAMPE Blog*

