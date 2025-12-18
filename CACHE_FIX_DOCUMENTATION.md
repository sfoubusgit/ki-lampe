# Cache-Fix: Artikel werden sofort nach Datum-Update angezeigt

## Problem behoben

**Vorher:** Wenn das Datum eines Artikels geändert wurde, wurde der Artikel nicht sofort in der Übersicht mit dem neuen Datum angezeigt, weil der Cache noch die alten Daten enthielt.

**Jetzt:** Der Cache wird automatisch invalidiert, wenn sich Artikel-Dateien ändern (basierend auf Datei-Modifikationszeiten).

## Wie es funktioniert

### Intelligente Cache-Invalidierung

Der Artikel-Cache in `lib/articles.ts` wird jetzt auf zwei Arten invalidiiert:

1. **Zeit-basiert:** Cache läuft nach 30 Sekunden ab
2. **Datei-basiert:** Cache wird invalidiert, wenn sich eine Artikel-Datei ändert (basierend auf `mtime`)

### Implementierung

Die Funktion `hasArticlesChanged()` prüft:
- Ob sich die Modifikationszeit einer Artikel-Datei geändert hat
- Ob neue Dateien hinzugefügt wurden
- Ob Dateien gelöscht wurden

Wenn Änderungen erkannt werden, wird der Cache automatisch neu geladen.

## Was bedeutet das für dich?

### ✅ Sofortige Updates

Wenn du das Datum eines Artikels änderst:
1. Die Datei wird gespeichert (neue Modifikationszeit)
2. Beim nächsten Seitenaufruf wird der Cache neu geladen
3. Der Artikel erscheint sofort mit dem neuen Datum in der Übersicht

### ⚠️ Server-Neustart

Wenn der Next.js-Dev-Server läuft und du Änderungen machst:
- Die Änderungen sollten innerhalb von 30 Sekunden sichtbar sein
- Oder starte den Server neu für sofortige Updates: `npm run dev`

### 📝 Workflow

1. **Datum ändern** (manuell oder mit Script):
   ```bash
   tsx scripts/set-article-date.ts <slug>
   ```

2. **Artikel erscheint sofort** mit neuem Datum in:
   - Homepage ("Aktuelle Artikel")
   - Artikel-Übersicht (`/artikel`)
   - News-Seite (`/news`)
   - Alle anderen Listen

## Technische Details

### Cache-Konfiguration

```typescript
const CACHE_DURATION = 30 * 1000 // 30 Sekunden
```

### Cache-Invalidierung

- **Automatisch:** Bei Datei-Änderungen
- **Manuell:** `clearArticlesCache()` Funktion verfügbar
- **Zeit-basiert:** Nach 30 Sekunden

### Datei-Modifikationszeiten-Tracking

Der Cache speichert die Modifikationszeit jeder Artikel-Datei:
- Beim ersten Laden werden alle Mod-Zeiten gespeichert
- Bei jedem Cache-Check werden die aktuellen Mod-Zeiten verglichen
- Bei Unterschieden wird der Cache invalidiert

## Für Entwickler

### Cache manuell leeren

```typescript
import { clearArticlesCache } from '@/lib/articles'

// Cache leeren
clearArticlesCache()
```

### Cache-Status prüfen

Die Cache-Logik ist in `lib/articles.ts` implementiert. Die Funktion `hasArticlesChanged()` prüft automatisch, ob Dateien geändert wurden.

## Bekannte Einschränkungen

1. **Next.js Build-Cache:** Im Produktions-Build kann Next.js zusätzlich cachen. Nutze `revalidate = 0` für dynamische Seiten (bereits implementiert in `app/page.tsx`).

2. **30-Sekunden-Delay:** Im schlimmsten Fall kann es bis zu 30 Sekunden dauern, bis Änderungen sichtbar sind (wenn keine Datei-Änderung erkannt wird).

3. **Server-Neustart:** Für sofortige Updates im Development-Modus kann ein Server-Neustart erforderlich sein.

## Zusammenfassung

✅ **Problem gelöst:** Artikel-Daten werden sofort aktualisiert, wenn sich Dateien ändern

✅ **Intelligenter Cache:** Kombiniert Zeit- und Datei-basierte Invalidierung

✅ **Sofortige Updates:** Änderungen sind innerhalb von Sekunden sichtbar

✅ **Automatisch:** Keine manuellen Schritte erforderlich

---

**Geändert am:** 2025-12-18  
**Datei:** `lib/articles.ts`

