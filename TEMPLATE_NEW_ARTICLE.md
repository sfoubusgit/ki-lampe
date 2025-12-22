# Template für neue Artikel

## ⚠️ WICHTIG: Bevor du einen neuen Artikel erstellst!

**IMMER zuerst das aktuelle Datum abrufen!**

Führe diesen Befehl aus, um das aktuelle Datum zu erhalten:

```powershell
powershell -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'"
```

Oder verwende das Script, um das Datum automatisch zu setzen, nachdem der Artikel erstellt wurde:

```bash
tsx scripts/set-article-date.ts <slug>
```

---

## Template-Frontmatter

Verwende dieses Template beim Erstellen neuer Artikel. **Ersetze `<AKTUELLES_DATUM>` mit dem aktuellen Datum!**

```yaml
---
image: 'https://images.unsplash.com/photo-XXXXX?w=1200&h=630&fit=crop'
title: "Dein Artikel Titel"
date: '<AKTUELLES_DATUM>'  # ← ERSTES: Datum mit Befehl oben abrufen!
dateModified: '<AKTUELLES_DATUM>'  # ← Gleiches Datum wie date
excerpt: >-
  Kurze Beschreibung des Artikels (1-2 Sätze)
category: News  # Oder: Praktisch, KI & Kreativität, etc.
tags:
  - Tag1
  - Tag2
  - Tag3
author: AI Content Team
seoKeywords:
  - 'Keyword 1'
  - 'Keyword 2'
  - 'Keyword 3'
---

⚠️ **WICHTIG:** KEIN H1-Titel (# Titel) im Content verwenden! Der Titel wird automatisch aus dem Frontmatter als H1 gerendert.

Dein Artikel-Inhalt hier beginnt direkt mit dem Text oder mit H2-Überschriften (##)...
```

---

## Workflow für neue Artikel

1. **Datum abrufen** (zuerst!):
   ```powershell
   powershell -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'"
   ```

2. **Artikel erstellen** mit dem Template oben

3. **Datum setzen** (alternativ, falls Schritt 1 vergessen wurde):
   ```bash
   tsx scripts/set-article-date.ts <slug>
   ```

---

## Aktuelles Datum (für Referenz)

**Heute:** 2025-12-18

⚠️ **Hinweis:** Dieses Datum kann veraltet sein! Verwende immer den Befehl oben, um das aktuelle Datum zu erhalten.

---

## Für AI-Assistenten (Cursor/Auto)

**WICHTIG:** Wenn du einen neuen Artikel erstellst:

1. **FÜHRE ZUERST DIESEN BEFEHL AUS**, um das aktuelle Datum zu erhalten:
   ```
   powershell -Command "Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'"
   ```

2. **Verwende dieses Datum** im Frontmatter des Artikels

3. **ODER:** Erstelle den Artikel und setze dann das Datum mit:
   ```
   tsx scripts/set-article-date.ts <slug>
   ```

**NIEMALS** ein Datum raten oder aus einem alten Artikel kopieren!

