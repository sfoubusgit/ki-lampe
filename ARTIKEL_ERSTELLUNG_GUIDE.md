# Artikel-Erstellung Guide

## 📋 Wichtige Regeln für neue Artikel

### ✅ Datum automatisch setzen

**Beim Erstellen neuer Artikel IMMER das aktuelle Datum verwenden!**

#### Option 1: Automatisch (empfohlen)

Wenn du einen Artikel aus einem Paket erstellst, verwende dieses Datum-Format:

```yaml
---
date: '2025-12-08T10:00:00.000Z'
dateModified: '2025-12-08T10:00:00.000Z'
---
```

**Wichtig:** Ersetze `2025-12-08` mit dem **aktuellen Datum** (heute)!

#### Option 2: Script verwenden

Nach dem Erstellen eines Artikels, setze das Datum automatisch:

```bash
tsx scripts/set-article-date.ts <slug>
```

Beispiel:
```bash
tsx scripts/set-article-date.ts stable-diffusion-auf-cpu-nutzen-komplette-anleitung-ohne-gpu
```

#### Option 3: Alle Artikel aktualisieren

Falls du mehrere Artikel auf einmal aktualisieren möchtest:

```bash
# Nur Artikel ohne Datum
tsx scripts/set-article-date.ts --new-only

# Alle Artikel (Vorsicht!)
tsx scripts/set-article-date.ts --all
```

---

## 📝 Artikel-Erstellung Workflow

### Schritt 1: Artikel aus Paket erstellen

1. Öffne das Paket (z.B. `artikel_pakete/Paket 6/04_Hauptartikel.md`)
2. Kopiere den Inhalt
3. Erstelle neue Datei: `content/articles/<slug>.md`

### Schritt 2: Frontmatter hinzufügen

**WICHTIG:** Verwende IMMER das aktuelle Datum!

```yaml
---
image: '/images/artikel-bild.webp'
title: "Artikel Titel"
date: '2025-12-08T10:00:00.000Z'  # ← HEUTE!
dateModified: '2025-12-08T10:00:00.000Z'  # ← HEUTE!
excerpt: >-
  Kurze Beschreibung des Artikels
category: Praktisch
tags:
  - Tag 1
  - Tag 2
author: AI Content Team
seoKeywords:
  - keyword1
  - keyword2
---
```

### Schritt 3: Datum verifizieren

Nach dem Erstellen, prüfe das Datum:

```bash
# Prüfe Frontmatter
head -n 10 content/articles/<slug>.md
```

Oder setze es automatisch:

```bash
tsx scripts/set-article-date.ts <slug>
```

---

## 🔧 Datum-Format

**Korrektes Format:**
```yaml
date: '2025-12-08T10:00:00.000Z'
```

**Falsche Formate:**
```yaml
date: '2025-12-08'  # ❌ Fehlt Zeit
date: '28.01.2025'  # ❌ Falsches Format
date: 2025-12-08    # ❌ Keine Anführungszeichen
```

---

## ⚠️ Häufige Fehler

### ❌ Fehler 1: Altes Datum verwenden

**Problem:** Artikel zeigt Datum von vor Wochen/Monaten

**Lösung:** 
```bash
tsx scripts/set-article-date.ts <slug>
```

### ❌ Fehler 2: Datum vergessen

**Problem:** Artikel hat kein Datum im Frontmatter

**Lösung:**
1. Füge Datum manuell hinzu (aktuelles Datum!)
2. Oder: `tsx scripts/set-article-date.ts <slug>`

### ❌ Fehler 3: Falsches Datumsformat

**Problem:** Datum wird nicht korrekt angezeigt

**Lösung:** Verwende ISO-Format: `'2025-12-08T10:00:00.000Z'`

---

## 📅 Aktuelles Datum schnell ermitteln

### JavaScript/Node.js:
```javascript
new Date().toISOString()
// Ergebnis: '2025-12-08T10:00:00.000Z'
```

### Online:
- Google: "current date ISO"
- Oder: https://www.unixtimestamp.com/

### Terminal (PowerShell):
```powershell
Get-Date -Format "yyyy-MM-ddTHH:mm:ss.fffZ"
```

---

## ✅ Checkliste vor dem Commit

- [ ] Artikel hat `date` Feld im Frontmatter
- [ ] Datum ist das **aktuelle Datum** (heute)
- [ ] Datum ist im korrekten Format: `'YYYY-MM-DDTHH:mm:ss.fffZ'`
- [ ] `dateModified` ist gleich `date` (für neue Artikel)
- [ ] Artikel wurde lokal getestet
- [ ] Datum wurde verifiziert (Script oder manuell)

---

## 🚀 Quick Commands

```bash
# Datum für einen Artikel setzen
tsx scripts/set-article-date.ts <slug>

# Alle Artikel ohne Datum aktualisieren
tsx scripts/set-article-date.ts --new-only

# Prüfe Artikel-Datum
head -n 5 content/articles/<slug>.md | grep date
```

---

**Letzte Aktualisierung:** 2025-12-08
