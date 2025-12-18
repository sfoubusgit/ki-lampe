# 🚨 WICHTIG: Anweisungen für neue Artikel

## Beim Erstellen eines neuen Artikels IMMER:

### 1. Aktuelles Datum abrufen (ZUERST!)

**Führe diesen Befehl aus, bevor du den Artikel erstellst:**

```powershell
powershell -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'"
```

**Kopiere das Ergebnis und verwende es im Frontmatter!**

### 2. Artikel mit korrektem Datum erstellen

Verwende das Template aus `TEMPLATE_NEW_ARTICLE.md` und setze das Datum, das du in Schritt 1 erhalten hast.

### 3. ODER: Datum nachträglich setzen

Falls du das Datum vergessen hast, kannst du es nachträglich setzen:

```bash
tsx scripts/set-article-date.ts <slug>
```

---

## Format für das Datum

**Korrekt:**
```yaml
date: '2025-12-18T10:00:00Z'
dateModified: '2025-12-18T10:00:00Z'
```

**Falsch:**
```yaml
date: '2025-01-15T10:00:00Z'  # ❌ Altes Datum
date: '2025-12-18'  # ❌ Fehlt Zeit
date: 2025-12-18T10:00:00Z  # ❌ Fehlen Anführungszeichen
```

---

## Für AI-Assistenten (Cursor)

**Diese Datei wird beim Erstellen neuer Artikel automatisch gelesen.**

Wenn du einen neuen Artikel erstellst:

### Option 1: Helper-Script verwenden (EMPFOHLEN)

Verwende das Script `scripts/create-article.ts`, das automatisch das aktuelle Datum setzt:

```bash
tsx scripts/create-article.ts "mein-artikel-slug" "Mein Artikel Titel"
```

### Option 2: Manuell mit korrektem Datum

1. **Rufe zuerst das aktuelle Datum ab** mit dem Befehl oben
2. **Verwende dieses Datum** im Frontmatter
3. **ODER:** Nutze das Script `scripts/set-article-date.ts` nach dem Erstellen

**NIEMALS ein Datum erraten oder aus einem alten Artikel kopieren!**

---

**Letzte Aktualisierung:** 2025-12-18

