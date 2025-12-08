# 🚀 Schnellstart-Anleitung

Diese Anleitung führt dich Schritt für Schritt durch die Einrichtung deines AI-Blogs.

## Schritt 1: Dependencies installieren

```bash
npm install
```

## Schritt 2: Umgebungsvariablen konfigurieren

1. Erstelle eine `.env` Datei im Root-Verzeichnis
2. Kopiere die folgenden Variablen und fülle sie aus:

```env
# WICHTIG: OpenAI API Key (erforderlich für Content-Generierung)
OPENAI_API_KEY=sk-your-key-here

# Blog Basis-Konfiguration
BLOG_URL=https://yourblog.com
BLOG_NAME=Mein AI Blog
BLOG_DESCRIPTION=Ein automatisiertes Blog-System für Traffic und Revenue

# AdSense (optional, später einrichten)
GOOGLE_ADSENSE_CLIENT_ID=

# Content Generation Einstellungen
AUTO_POST_ENABLED=false
POST_INTERVAL_HOURS=24
MIN_WORD_COUNT=1500
MAX_ARTICLES_PER_DAY=3

# Standard-Werte
DEFAULT_AUTHOR=AI Content Team
DEFAULT_CATEGORY=Technology
```

## Schritt 3: OpenAI API Key erhalten

1. Gehe zu [platform.openai.com](https://platform.openai.com)
2. Erstelle einen Account oder logge dich ein
3. Gehe zu API Keys
4. Erstelle einen neuen API Key
5. Kopiere den Key in deine `.env` Datei

**Wichtig**: Ein API Key kostet Geld pro Nutzung. Überprüfe die Preise auf der OpenAI Website.

## Schritt 4: Entwicklungsserver starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

Du solltest jetzt die Homepage sehen. Es gibt bereits einen Beispielartikel.

## Schritt 5: Ersten Artikel generieren

```bash
npm run generate "Machine Learning Grundlagen"
```

Dies erstellt einen neuen Artikel im `content/articles/` Verzeichnis.

**Hinweis**: Die Generierung kann 2-5 Minuten dauern, da GPT-4 verwendet wird.

## Schritt 6: Artikel überprüfen

1. Öffne `content/articles/` im Datei-Explorer
2. Suche die neu generierte `.md` Datei
3. Überprüfe den Inhalt
4. Aktualisiere die Seite im Browser, um den neuen Artikel zu sehen

## Schritt 7: Automatischen Scheduler einrichten (Optional)

Für automatische Content-Generierung:

1. Setze in `.env`: `AUTO_POST_ENABLED=true`
2. Starte den Scheduler:

```bash
npm run schedule
```

Der Scheduler läuft kontinuierlich und generiert Artikel basierend auf deinen Einstellungen.

**Für Produktion**: Nutze PM2 oder einen Cron-Job:

```bash
# Mit PM2
npm install -g pm2
pm2 start npm --name "blog-scheduler" -- run schedule
pm2 save
```

## Schritt 8: Google AdSense einrichten

1. Gehe zu [Google AdSense](https://www.google.com/adsense/)
2. Erstelle einen Account
3. Füge deine Website hinzu
4. Verifiziere deine Website
5. Nach der Genehmigung (kann 1-2 Tage dauern):
   - Erstelle Ad Units
   - Kopiere deine Publisher ID (ca-pub-...)
   - Füge sie in `.env` ein: `GOOGLE_ADSENSE_CLIENT_ID=ca-pub-...`
   - Aktualisiere die Ad Slot IDs in den Komponenten

## Schritt 9: Deployment vorbereiten

### Option A: Vercel (Empfohlen)

1. Installiere Vercel CLI:
```bash
npm i -g vercel
```

2. Login:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Füge Umgebungsvariablen in Vercel Dashboard hinzu

### Option B: Netlify

1. Erstelle Account auf [netlify.com](https://netlify.com)
2. Verbinde dein GitHub Repository
3. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Füge Umgebungsvariablen hinzu

## Schritt 10: SEO-Optimierung

1. **Google Search Console**:
   - Füge deine Domain hinzu
   - Verifiziere mit HTML-Tag oder DNS
   - Reiche Sitemap ein: `https://yourblog.com/sitemap.xml`

2. **Sitemap prüfen**:
   - Öffne `https://yourblog.com/sitemap.xml`
   - Stelle sicher, dass alle Artikel gelistet sind

3. **RSS Feed**:
   - RSS Feed ist verfügbar unter `/rss.xml`
   - Nutze ihn für Content-Syndication

## Häufige Probleme

### "OPENAI_API_KEY is not set"
- Überprüfe, ob die `.env` Datei existiert
- Stelle sicher, dass der Key korrekt eingetragen ist
- Starte den Dev-Server neu nach Änderungen

### Artikel werden nicht angezeigt
- Überprüfe, ob Markdown-Dateien in `content/articles/` existieren
- Prüfe die Frontmatter-Syntax in den `.md` Dateien
- Stelle sicher, dass der Dateiname mit dem Slug übereinstimmt

### AdSense zeigt keine Ads
- Warte auf AdSense-Genehmigung (24-48h)
- Überprüfe Cookie-Consent (Ads laden erst nach Akzeptanz)
- Stelle sicher, dass Ad Slot IDs korrekt sind

## Nächste Schritte

1. ✅ Generiere mehr Artikel mit verschiedenen Keywords
2. ✅ Passe das Design an deine Marke an
3. ✅ Richte weitere Ad-Netzwerke ein (Ezoic, Mediavine)
4. ✅ Überwache Performance mit Google Analytics
5. ✅ Optimiere basierend auf Traffic-Daten

## Support

Bei Problemen:
1. Überprüfe die README.md für detaillierte Dokumentation
2. Schaue in die Troubleshooting-Sektion
3. Überprüfe die Console für Fehlermeldungen

Viel Erfolg! 🚀

