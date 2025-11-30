# ⚡ Quick Setup - In 10 Minuten fertig!

## 🎯 Was du brauchst

- ✅ Google Account
- ✅ 10 Minuten Zeit
- ✅ Terminal geöffnet

---

## 📊 Schritt 1: Google Analytics (5 Min)

### 1.1 Account erstellen
```
1. Gehe zu: https://analytics.google.com
2. Klicke: "Messung starten"
3. Fülle Formular aus
4. Erstelle Property für deine Website
```

### 1.2 Measurement ID kopieren
```
1. Kopiere die ID (Format: G-XXXXXXXXXX)
2. Führe aus: npm run setup:analytics
3. Wähle "j" für Google Analytics
4. Füge deine ID ein
```

### 1.3 Testen
```
1. Server neu starten: npm run dev
2. Öffne: http://localhost:3001
3. Prüfe Analytics → Echtzeit
4. ✅ Fertig!
```

---

## 🔍 Schritt 2: Google Search Console (5 Min)

### 2.1 Property hinzufügen
```
1. Gehe zu: https://search.google.com/search-console
2. Klicke: "Property hinzufügen"
3. Wähle: "URL-Präfix"
4. URL eingeben: https://deine-domain.com
```

### 2.2 Verifizieren
```
1. Wähle: "HTML-Tag" Methode
2. Kopiere den "content"-Wert
3. Führe aus: npm run setup:analytics
4. Wähle "j" für Search Console
5. Wähle "html"
6. Füge Code ein
```

### 2.3 Sitemap einreichen
```
1. Server neu starten
2. In Search Console: "Verifizieren"
3. Gehe zu: "Sitemaps"
4. Eingeben: sitemap.xml
5. ✅ Fertig!
```

---

## ✅ Checklist

- [ ] Google Analytics ID in `.env` (`NEXT_PUBLIC_GA_ID`)
- [ ] Google Verification Code in `.env` (`GOOGLE_VERIFICATION`)
- [ ] Server neu gestartet
- [ ] Analytics getestet (Echtzeit)
- [ ] Search Console verifiziert
- [ ] Sitemap eingereicht

---

## 🚀 Nächste Schritte

Nach dem Setup:

1. **Warte 1-2 Wochen** auf Search Console Daten
2. **Generiere Artikel:** `npm run generate "Keyword"`
3. **SEO-Analyse:** `npm run seo:analyze`
4. **Interne Links:** `npm run seo:internal-links`

**Viel Erfolg! 🎉**

