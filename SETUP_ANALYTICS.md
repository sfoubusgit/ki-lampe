# 📊 Google Analytics & Search Console Setup

## 🎯 Übersicht

Dieses Setup hilft dir dabei:
- ✅ Traffic zu messen (Google Analytics)
- ✅ SEO-Performance zu tracken (Search Console)
- ✅ Keywords zu optimieren
- ✅ Rankings zu überwachen

**Zeitaufwand:** 30-45 Minuten

---

## 📊 Teil 1: Google Analytics Setup

### Schritt 1: Account erstellen

1. Gehe zu: **https://analytics.google.com**
2. Klicke auf **"Messung starten"** oder **"Konto erstellen"**
3. Fülle die Formulare aus:
   - **Kontoname:** z.B. "Mein AI Blog"
   - **Property-Name:** z.B. "AI Blog Website"
   - **Zeitzone:** Wähle deine Zeitzone
   - **Währung:** EUR (oder deine Währung)

### Schritt 2: Property konfigurieren

1. Wähle **"Website"** als Plattform
2. Gib deine **Website-URL** ein (z.B. `https://deine-domain.com`)
3. Wähle eine **Kategorie** (z.B. "Technologie")
4. Klicke auf **"Erstellen"**

### Schritt 3: Measurement ID kopieren

1. Nach dem Erstellen siehst du deine **Measurement ID**
2. Format: **G-XXXXXXXXXX** (z.B. `G-ABC123XYZ`)
3. **Kopiere diese ID**

### Schritt 4: In dein Projekt einfügen

**Option A: Automatisch (empfohlen)**
```bash
npm run setup:analytics
```

**Option B: Manuell**
1. Öffne die `.env` Datei
2. Füge hinzu:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Ersetze `G-XXXXXXXXXX` mit deiner Measurement ID

### Schritt 5: Server neu starten

```bash
# Stoppe den Server (Ctrl+C)
# Starte neu:
npm run dev
```

### Schritt 6: Testen

1. Öffne deine Website im Browser
2. Gehe zu Google Analytics → **Berichte** → **Echtzeit**
3. Du solltest deinen Besuch sehen (kann 1-2 Minuten dauern)

**✅ Fertig!** Google Analytics ist jetzt aktiv.

---

## 🔍 Teil 2: Google Search Console Setup

### Schritt 1: Property hinzufügen

1. Gehe zu: **https://search.google.com/search-console**
2. Klicke auf **"Property hinzufügen"**
3. Wähle **"URL-Präfix"** (nicht Domain)
4. Gib deine Website-URL ein: `https://deine-domain.com`
5. Klicke auf **"Weiter"**

### Schritt 2: Verifizierung

**Option A: HTML-Tag (einfachste Methode, für lokale Entwicklung)**

1. Google zeigt dir einen HTML-Tag:
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
2. **Kopiere nur den "content"-Wert** (die Zeichenkette nach `content="`)
3. Führe aus:
   ```bash
   npm run setup:analytics
   ```
   Oder manuell in `.env`:
   ```env
   GOOGLE_VERIFICATION=ABC123XYZ...
   ```
4. Server neu starten
5. Klicke in Search Console auf **"Verifizieren"**

**Option B: DNS-Verifizierung (für Produktion empfohlen)**

1. Google zeigt dir einen DNS-Eintrag
2. Gehe zu deinem DNS-Provider (z.B. Cloudflare, Namecheap)
3. Füge den TXT-Eintrag hinzu
4. Warte 24-48 Stunden auf DNS-Propagierung
5. Klicke in Search Console auf **"Verifizieren"**

### Schritt 3: Sitemap einreichen

1. Nach erfolgreicher Verifizierung:
2. Gehe zu **"Sitemaps"** im linken Menü
3. Gib ein: `sitemap.xml`
4. Klicke auf **"Einreichen"**

**✅ Fertig!** Search Console ist jetzt aktiv.

---

## 🚀 Automatisches Setup (Empfohlen)

Führe einfach aus:

```bash
npm run setup:analytics
```

Das Script führt dich durch:
- ✅ Google Analytics Setup
- ✅ Google Search Console Setup
- ✅ Automatisches Eintragen in `.env`

---

## 📋 Checklist

### Google Analytics
- [ ] Account erstellt
- [ ] Property konfiguriert
- [ ] Measurement ID kopiert
- [ ] In `.env` eingetragen (`NEXT_PUBLIC_GA_ID`)
- [ ] Server neu gestartet
- [ ] Echtzeit-Daten getestet

### Google Search Console
- [ ] Property hinzugefügt
- [ ] Verifiziert (HTML-Tag oder DNS)
- [ ] Sitemap eingereicht (`sitemap.xml`)
- [ ] Verification Code in `.env` (`GOOGLE_VERIFICATION`)

---

## ⏱️ Wann erscheinen Daten?

### Google Analytics
- **Echtzeit:** Sofort (1-2 Minuten Verzögerung)
- **Standard-Berichte:** 24-48 Stunden

### Google Search Console
- **Erste Daten:** 1-2 Wochen nach Setup
- **Vollständige Daten:** 2-4 Wochen

---

## 🎯 Nächste Schritte

Nach dem Setup:

1. **Warte 1-2 Wochen** auf erste Search Console Daten
2. **Analysiere Keywords** in Search Console
3. **Optimiere Artikel** basierend auf Daten
4. **Tracke Rankings** für wichtige Keywords
5. **Nutze Analytics** um Top-Artikel zu identifizieren

---

## ❓ Häufige Probleme

### Problem: Analytics zeigt keine Daten
**Lösung:**
- Prüfe, ob `NEXT_PUBLIC_GA_ID` in `.env` steht
- Server neu gestartet?
- Browser-Cache leeren
- Warte 24-48 Stunden

### Problem: Search Console Verifizierung schlägt fehl
**Lösung:**
- Prüfe, ob `GOOGLE_VERIFICATION` in `.env` steht
- Server neu gestartet?
- Bei DNS: Warte 24-48 Stunden
- Prüfe, ob der Meta-Tag im HTML erscheint

### Problem: Sitemap wird nicht gefunden
**Lösung:**
- Prüfe: `https://deine-domain.com/sitemap.xml`
- Sollte XML-Format zeigen
- Warte 1-2 Tage nach Einreichung

---

## 📞 Hilfe

Bei Problemen:
1. Prüfe die `.env` Datei
2. Prüfe die Browser-Konsole (F12)
3. Warte 24-48 Stunden (Daten brauchen Zeit)
4. Siehe `TRAFFIC_STRATEGY.md` für mehr Details

**Viel Erfolg! 🚀**

