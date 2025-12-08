# 🔧 Troubleshooting Guide

## Problem: Seite lädt nicht / hängt beim Laden

### Lösung 1: Browser-Cache leeren
1. **Chrome/Edge:** `Ctrl+Shift+R` (Windows) oder `Cmd+Shift+R` (Mac)
2. **Firefox:** `Ctrl+F5` oder `Cmd+Shift+R`
3. **Safari:** `Cmd+Option+R`

### Lösung 2: Server neu starten
```bash
# Stoppe alle Server
pkill -f "next dev"

# Starte neu
cd /Users/sinafoudehi/Desktop/ai_blog
PORT=3001 npm run dev
```

### Lösung 3: Port prüfen
```bash
# Prüfe, ob Port 3001 frei ist
lsof -ti:3001

# Falls belegt, beende Prozess
kill -9 $(lsof -ti:3001)
```

### Lösung 4: Browser-Konsole prüfen
1. Öffne Browser-Entwicklertools: `F12` oder `Cmd+Option+I`
2. Gehe zu "Console" Tab
3. Prüfe auf Fehlermeldungen

### Lösung 5: Node Modules neu installieren
```bash
cd /Users/sinafoudehi/Desktop/ai_blog
rm -rf node_modules .next
npm install
npm run dev
```

---

## Problem: Artikel-Seiten laden langsam

### Ursache
Das Markdown-Processing kann bei großen Artikeln langsam sein.

### Lösung
- Timeout wurde bereits implementiert (5 Sekunden)
- Fallback auf einfaches HTML, falls Processing fehlschlägt
- Server sollte jetzt stabiler laufen

---

## Problem: Bilder werden nicht angezeigt

### Lösung
1. Prüfe, ob Bilder in Frontmatter vorhanden sind:
   ```bash
   grep "image:" content/articles/*.md | head -5
   ```

2. Prüfe Unsplash-URLs im Browser direkt

3. Falls nötig, Bilder neu hinzufügen:
   ```bash
   npm run add:images
   ```

---

## Problem: TypeScript-Fehler

### Lösung
```bash
# Prüfe Fehler
npm run build

# Falls Fehler, prüfe:
# - tsconfig.json
# - Type-Definitionen
```

---

## Server-Status prüfen

```bash
# Prüfe, ob Server läuft
curl http://localhost:3001

# Prüfe Prozesse
ps aux | grep "next dev"

# Prüfe Port
lsof -ti:3001
```

---

## Häufige Probleme

### 1. Port bereits belegt
```bash
# Lösung: Anderen Port verwenden
PORT=3002 npm run dev
```

### 2. Node Version
```bash
# Prüfe Node Version (sollte 18+ sein)
node --version

# Falls nicht, aktualisiere Node
```

### 3. Dependencies fehlen
```bash
# Lösung: Neu installieren
npm install
```

---

## Debug-Modus

```bash
# Starte mit mehr Logging
DEBUG=* npm run dev

# Oder nur Next.js Debug
NODE_OPTIONS='--inspect' npm run dev
```

---

## Kontakt & Hilfe

Falls Probleme weiterhin bestehen:
1. Prüfe Browser-Konsole (F12)
2. Prüfe Server-Logs im Terminal
3. Prüfe Network-Tab im Browser (F12 → Network)

