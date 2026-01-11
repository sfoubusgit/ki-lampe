# 📧 Brevo Newsletter Setup für Vercel (Production)

## 🎯 Problem
Der Newsletter funktioniert nicht auf **ki-lampe.com**, weil die Brevo-Umgebungsvariablen in Vercel fehlen.

## ✅ Lösung: Environment Variables in Vercel hinzufügen

### Schritt 1: Vercel Dashboard öffnen

1. Gehe zu: **https://vercel.com/dashboard**
2. Wähle dein Projekt aus (wahrscheinlich `ki-lampe` oder ähnlich)
3. Klicke auf **Settings** (Einstellungen)

### Schritt 2: Environment Variables hinzufügen

1. Klicke auf **Environment Variables** im linken Menü
2. Füge folgende Variablen hinzu:

#### Variable 1: BREVO_API_KEY
- **Key:** `BREVO_API_KEY`
- **Value:** `[DEIN_BREVO_API_KEY]` (z.B. `xkeysib-...`)
  - **WICHTIG:** Ersetze `[DEIN_BREVO_API_KEY]` mit deinem echten API Key!
  - Findest du in: Brevo Dashboard → Settings → API Keys
- **Environment:** Wähle alle aus:
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Klicke auf **Save**

#### Variable 2: BREVO_LIST_ID
- **Key:** `BREVO_LIST_ID`
- **Value:** `3`
- **Environment:** Wähle alle aus:
  - ✅ Production
  - ✅ Preview
  - ✅ Development
- Klicke auf **Save**

### Schritt 3: Neues Deployment auslösen

**WICHTIG:** Nach dem Hinzufügen der Environment Variables muss ein neues Deployment erstellt werden!

#### Option A: Automatisches Redeploy (Empfohlen)

1. Gehe zum Tab **Deployments**
2. Klicke auf die **drei Punkte (⋯)** beim neuesten Deployment
3. Wähle **Redeploy**
4. Bestätige das Redeploy
5. Warte 2-3 Minuten, bis das Deployment fertig ist

#### Option B: Neues Deployment via Git Push

1. Mache eine kleine Änderung (z.B. in einer Markdown-Datei)
2. Committe und pushe zu GitHub:
   ```bash
   git add .
   git commit -m "Trigger deployment for Brevo env vars"
   git push
   ```
3. Vercel erstellt automatisch ein neues Deployment

### Schritt 4: Testen

1. Gehe zu **ki-lampe.com**
2. Scrolle zum Footer
3. Gib deine E-Mail ein: `s.foudehi@gmail.com`
4. Klicke auf "Abonnieren"
5. Du solltest sehen: **"Vielen Dank für Ihre Anmeldung!"** (OHNE "Demo-Modus")
6. Prüfe in Brevo:
   - Gehe zu: https://app.brevo.com/contacts/lists
   - Öffne deine Liste (ID: 3)
   - Die E-Mail sollte dort erscheinen

## 🔍 Troubleshooting

### Problem: Immer noch "Demo-Modus"

**Lösung:**
1. Prüfe, ob die Environment Variables wirklich gesetzt sind:
   - Vercel Dashboard → Settings → Environment Variables
   - Stelle sicher, dass beide Variablen vorhanden sind
2. Stelle sicher, dass ein **neues Deployment** erstellt wurde (nach dem Hinzufügen der Variablen)
3. Warte 2-3 Minuten nach dem Deployment
4. Teste erneut

### Problem: E-Mail erscheint nicht in Brevo

**Lösung:**
1. Prüfe die Vercel Logs:
   - Vercel Dashboard → Deployments → Neuestes Deployment → Functions
   - Klicke auf `/api/newsletter`
   - Prüfe die Logs auf Fehler
2. Prüfe, ob der API Key korrekt ist
3. Prüfe, ob die List ID korrekt ist (sollte `3` sein)

### Problem: "Brevo Fehler" in den Logs

**Lösung:**
1. Prüfe die Vercel Function Logs (siehe oben)
2. Die Logs zeigen jetzt detaillierte Fehlermeldungen
3. Häufige Probleme:
   - Falscher API Key → Erstelle einen neuen in Brevo
   - Falsche List ID → Prüfe in Brevo Dashboard
   - API Key hat keine Berechtigung → Prüfe Brevo Settings

## ✅ Checkliste

- [ ] BREVO_API_KEY in Vercel hinzugefügt
- [ ] BREVO_LIST_ID in Vercel hinzugefügt
- [ ] Beide Variablen für Production, Preview und Development aktiviert
- [ ] Neues Deployment erstellt (Redeploy)
- [ ] Deployment erfolgreich abgeschlossen
- [ ] Newsletter auf ki-lampe.com getestet
- [ ] E-Mail erscheint in Brevo Liste

## 📝 Notizen

- **API Key:** Findest du in Brevo Dashboard → Settings → API Keys
- **List ID:** `3`
- **Brevo Dashboard:** https://app.brevo.com
- **Vercel Dashboard:** https://vercel.com/dashboard

**⚠️ WICHTIG:** Speichere deinen API Key NIE in Git-Repository-Dateien! Verwende immer Environment Variables.
