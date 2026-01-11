# 📧 Newsletter Setup Anleitung

Der Newsletter ist bereits implementiert und funktioniert im Demo-Modus. Um ihn vollständig einzurichten, musst du einen E-Mail-Service konfigurieren.

## 🎯 Optionen für Newsletter-Services

### Option 1: Mailchimp (Empfohlen für Start)

**Vorteile:**
- ✅ Kostenlos für bis zu 500 Kontakte
- ✅ Einfache Bedienung
- ✅ Bereits im Code integriert
- ✅ Automatische E-Mail-Verifizierung

**Nachteile:**
- ❌ Limitierte Funktionen im Free-Tier
- ❌ "Made with Mailchimp" Badge im Footer

**Setup-Schritte:**

1. **Account erstellen**
   - Gehe zu [mailchimp.com](https://mailchimp.com)
   - Erstelle einen kostenlosen Account

2. **Audience (Liste) erstellen**
   - Nach dem Login: Dashboard → Audience
   - Klicke auf "Create Audience"
   - Fülle die Informationen aus (Name, E-Mail, etc.)
   - Speichere

3. **API Key erstellen**
   - Gehe zu: Account → Extras → API Keys
   - Klicke auf "Create A Key"
   - Kopiere den API Key (Format: `xxxx-us1` oder ähnlich)

4. **Audience ID finden**
   - Gehe zu: Audience → Settings → Audience name and defaults
   - Die Audience ID findest du in der URL oder direkt auf der Seite (Format: `1234567890`)

5. **Umgebungsvariablen setzen**
   - Erstelle eine `.env.local` Datei im Root-Verzeichnis (falls nicht vorhanden)
   - Füge folgende Zeilen hinzu:
   ```
   MAILCHIMP_API_KEY=dein-api-key-hier
   MAILCHIMP_AUDIENCE_ID=deine-audience-id-hier
   ```

6. **Testen**
   - Starte den Dev-Server neu: `npm run dev`
   - Gehe auf die Website und teste die Newsletter-Anmeldung im Footer

---

### Option 2: Brevo (ehemals Sendinblue) - ⭐ EMPFOHLEN!

**Vorteile:**
- ✅ **300 E-Mails/Tag kostenlos** (mehr als Mailchimp!)
- ✅ **Einfacheres Dashboard** - kein Chaos wie bei Mailchimp!
- ✅ Keine Branding-Badges
- ✅ Transaktionale E-Mails inklusive
- ✅ Bessere Analytics
- ✅ Deutsche Server (DSGVO-konform)

**Nachteile:**
- ❌ Code muss angepasst werden (aber ich kann dir dabei helfen!)

**⚠️ Wenn Mailchimp zu kompliziert ist, empfehle ich Brevo!**

**Setup-Schritte:**

1. **Account erstellen**
   - Gehe zu [brevo.com](https://www.brevo.com)
   - Erstelle einen kostenlosen Account
   - Verifiziere deine E-Mail

2. **Kontaktliste erstellen**
   - Nach dem Login: Links im Menü → **"Contacts"** → **"Lists"**
   - Klicke auf **"Create a list"**
   - Gib einen Namen ein (z.B. "Newsletter Abonnenten")
   - Speichere

3. **API Key erstellen**
   - Gehe zu: **Settings** (Zahnrad-Symbol) → **API Keys**
   - Oder direkt: [https://app.brevo.com/settings/keys/api](https://app.brevo.com/settings/keys/api)
   - Klicke auf **"Generate a new API key"**
   - Gib einen Namen ein (z.B. "Website Newsletter")
   - **Kopiere den Key SOFORT** (du kannst ihn später nicht mehr sehen!)

4. **List ID finden**
   - Gehe zu: **Contacts** → **Lists**
   - Klicke auf deine Liste
   - Die **List ID** ist in der URL (nach `/lists/`) oder oben auf der Seite
   - Format: Eine Zahl wie `2` oder `5`

5. **Umgebungsvariablen setzen**
   - Erstelle eine `.env.local` Datei im Root-Verzeichnis (falls nicht vorhanden)
   - Füge folgende Zeilen hinzu:
   ```env
   BREVO_API_KEY=dein-api-key-hier
   BREVO_LIST_ID=deine-list-id-hier
   ```
   - **WICHTIG**: Ersetze die Platzhalter mit deinen echten Werten!
   - Beispiel:
   ```env
   BREVO_API_KEY=xkeysib-abc123def456...
   BREVO_LIST_ID=2
   ```

6. **Code ist bereits angepasst!** ✅
   - Die API-Route unterstützt jetzt Brevo
   - Du musst nur noch die Umgebungsvariablen setzen

7. **Testen**
   - Starte den Dev-Server neu: `npm run dev`
   - Gehe auf die Website und teste die Newsletter-Anmeldung im Footer
   - Prüfe in Brevo → Contacts → Lists → Deine Liste, ob die E-Mail dort ist

**Auf Vercel (für Produktion):**
1. Gehe zu deinem Vercel-Dashboard
2. Wähle dein Projekt aus
3. Gehe zu: **Settings** → **Environment Variables**
4. Füge folgende Variablen hinzu:
   - `BREVO_API_KEY` = dein API Key
   - `BREVO_LIST_ID` = deine List ID
5. Wähle für beide: **Production**, **Preview**, **Development**
6. Klicke auf **Save**
7. **WICHTIG**: Führe ein neues Deployment aus, damit die Variablen geladen werden!

---

### Option 3: Resend - Modern & Einfach

**Vorteile:**
- ✅ Sehr moderne API
- ✅ 3000 E-Mails/Monat kostenlos
- ✅ Sehr gute Developer Experience
- ✅ Schnelle Einrichtung

**Nachteile:**
- ❌ Bietet keine Newsletter-Management-Features (nur E-Mail-Versand)
- ❌ Du musst die E-Mails selbst speichern (z.B. in einer Datenbank)

---

## 🚀 Schnellstart: Mailchimp einrichten

**⚠️ WICHTIG:** Mailchimp hat sein Dashboard mehrfach geändert. Wenn du "Audience" nicht findest, versuche folgende Alternativen:

### Schritt 1: Mailchimp Account erstellen
1. Gehe zu [mailchimp.com](https://mailchimp.com/signup/)
2. Erstelle einen kostenlosen Account
3. Verifiziere deine E-Mail-Adresse

### Schritt 2: Audience/Liste erstellen

**Methode 1: Über das Dashboard**
- Suche nach "Audience" im linken Menü
- Oder suche nach "Contacts" oder "Lists"
- Falls vorhanden: Klicke auf "Create Audience" oder "Create List"

**Methode 2: Über den Onboarding-Flow**
- Nach dem Login wird oft ein Onboarding-Wizard angezeigt
- Folge den Schritten, um eine erste Audience/Liste zu erstellen

**Methode 3: Über das Menü**
- Klicke auf das Hamburger-Menü (☰) oben links
- Suche nach "Audience", "Contacts", "Lists" oder "Audiences"

**Wenn du die Audience erstellt hast:**
- Fülle die Informationen aus:
  - **Name**: "Newsletter Abonnenten" (oder was du möchtest)
  - **Default from email**: Deine E-Mail-Adresse
  - **Default from name**: "KI.LAMPE" (oder dein Blog-Name)
- Klicke auf "Save" oder "Create"

### Schritt 3: API Key erstellen

**Methode 1: Über Account-Einstellungen**
1. Klicke auf dein Profil-Bild oben rechts
2. Klicke auf **"Account"** oder **"Account & Billing"**
3. Suche nach **"Extras"** → **"API keys"**
4. Oder suche direkt nach **"API keys"** im Menü

**Methode 2: Direkter Link**
- Gehe direkt zu: [https://us1.admin.mailchimp.com/account/api/](https://us1.admin.mailchimp.com/account/api/)
  (Ersetze `us1` mit deinem Server-Prefix, z.B. `us2`, `us3`, etc.)

**Methode 3: Über die Suche**
- Verwende die Suchfunktion in Mailchimp (Lupe-Symbol)
- Suche nach "API keys" oder "API"

**Dann:**
1. Klicke auf **"Create A Key"** oder **"Generate API Key"**
2. Gib dem Key einen Namen (z.B. "Website Newsletter")
3. **Kopiere den Key SOFORT** (Format: `abc123def456-us1`)
   - ⚠️ **WICHTIG**: Du kannst ihn später nicht mehr sehen!

### Schritt 4: Audience ID finden

**Methode 1: Über Settings**
1. Gehe zu deiner Audience (wie in Schritt 2 gefunden)
2. Klicke auf **"Settings"** (oben rechts oder im Menü)
3. Klicke auf **"Audience name and defaults"** oder **"List name and defaults"**
4. Die **Audience ID** findest du:
   - In der URL (nach `/lists/`)
   - Oder oben auf der Seite als lange Zahl

**Methode 2: Über die URL**
1. Gehe zu deiner Audience
2. Schau in die Browser-URL
3. Die Audience ID ist der lange Code nach `/lists/`
   - Beispiel: `https://us1.admin.mailchimp.com/lists/members/?id=1234567890`
   - Die `1234567890` ist deine Audience ID

**Methode 3: Mit API-Test**
- Wenn du den API Key hast, kannst du die Audience ID über die API herausfinden
- Oder: Versuche einfach die Newsletter-Anmeldung - die Fehlermeldung zeigt dir oft die richtige ID

### Schritt 5: Umgebungsvariablen setzen

**Lokal (für Entwicklung):**

1. Erstelle eine `.env.local` Datei im Root-Verzeichnis (falls nicht vorhanden)
2. Füge folgende Zeilen hinzu:
   ```env
   MAILCHIMP_API_KEY=dein-api-key-hier
   MAILCHIMP_AUDIENCE_ID=deine-audience-id-hier
   ```
3. **WICHTIG**: Ersetze die Platzhalter mit deinen echten Werten!
   ```env
   MAILCHIMP_API_KEY=abc123def456-us1
   MAILCHIMP_AUDIENCE_ID=1234567890
   ```

**Auf Vercel (für Produktion):**

1. Gehe zu deinem Vercel-Dashboard
2. Wähle dein Projekt aus
3. Gehe zu: **Settings** → **Environment Variables**
4. Füge folgende Variablen hinzu:
   - `MAILCHIMP_API_KEY` = dein API Key
   - `MAILCHIMP_AUDIENCE_ID` = deine Audience ID
5. Wähle für beide: **Production**, **Preview**, **Development**
6. Klicke auf **Save**
7. **WICHTIG**: Führe ein neues Deployment aus, damit die Variablen geladen werden!

### Schritt 6: Testen

1. **Lokal testen:**
   ```bash
   npm run dev
   ```
2. Öffne [http://localhost:3000](http://localhost:3000)
3. Scrolle zum Footer
4. Gib deine E-Mail-Adresse ein
5. Klicke auf "Abonnieren"
6. Du solltest eine Erfolgsmeldung sehen
7. **WICHTIG**: Gehe zu Mailchimp → Audience → Alle Kontakte
   - Du solltest deine E-Mail dort sehen
   - Mailchimp sendet automatisch eine Bestätigungs-E-Mail!

### Schritt 7: Doppel-Opt-In deaktivieren (Optional)

Standardmäßig sendet Mailchimp eine Bestätigungs-E-Mail. Wenn du das nicht möchtest:

1. Gehe zu deiner Audience (wie in Schritt 2 gefunden)
2. Gehe zu **"Settings"** → **"List name and defaults"** oder **"Audience name and defaults"**
3. Scrolle zu **"Double opt-in"** oder **"Require subscribers to confirm"**
4. Deaktiviere die Option
5. Speichere

**⚠️ Hinweis**: Doppel-Opt-In ist in Deutschland eigentlich empfohlen für DSGVO-Compliance, aber nicht zwingend erforderlich.

---

## 💡 Alternative: Brevo (einfacher & empfohlen!)

**Wenn Mailchimp zu kompliziert ist**, empfehle ich **Brevo** (ehemals Sendinblue):

✅ **Einfacheres Dashboard**  
✅ **300 E-Mails/Tag kostenlos** (mehr als Mailchimp!)  
✅ **Keine Branding-Badges**  
✅ **Bessere Analytics**  
✅ **Deutsche Server** (DSGVO-konform)

**Nachteile:**
- ❌ Code muss angepasst werden (aber ich kann dir dabei helfen!)

Wenn du Brevo bevorzugst, sag mir Bescheid - ich kann den Code schnell anpassen! 🚀

---

## 🔍 Probleme beheben

### Fehler: "Ungültiger Mailchimp API Key Format"
- Stelle sicher, dass dein API Key das Format `xxxx-us1` hat (mit Bindestrich)
- Kopiere den Key nochmal aus Mailchimp

### Fehler: "Member Exists"
- Das ist eigentlich kein Fehler - die E-Mail ist bereits angemeldet
- Der Newsletter funktioniert trotzdem

### E-Mails kommen nicht an
- Prüfe den Spam-Ordner
- Prüfe in Mailchimp → Audience → Alle Kontakte, ob die E-Mail dort ist
- Stelle sicher, dass die E-Mail in Mailchimp als "subscribed" markiert ist

### Newsletter funktioniert lokal, aber nicht auf Vercel
- Stelle sicher, dass du die Environment Variables in Vercel gesetzt hast
- Führe ein neues Deployment aus
- Prüfe die Vercel Logs: Deployments → Dein Deployment → Functions → api/newsletter

### "Audience" nicht im Dashboard gefunden
- Mailchimp ändert das Interface regelmäßig
- Versuche stattdessen nach "Contacts", "Lists" oder "Audiences" zu suchen
- Oder nutze die Suchfunktion in Mailchimp
- **Alternative**: Wechsle zu Brevo (siehe oben) - das Dashboard ist einfacher!

---

## ✅ Checkliste

- [ ] Mailchimp Account erstellt
- [ ] Audience erstellt
- [ ] API Key erstellt und kopiert
- [ ] Audience ID gefunden
- [ ] `.env.local` erstellt mit den Variablen
- [ ] Lokal getestet - Newsletter-Anmeldung funktioniert
- [ ] E-Mail in Mailchimp → Audience → Alle Kontakte gesehen
- [ ] Environment Variables in Vercel gesetzt (wenn deployed)
- [ ] Neues Deployment auf Vercel durchgeführt
- [ ] Auf Produktions-Website getestet

---

## 📝 Nächste Schritte

Nachdem der Newsletter funktioniert:

1. **Newsletter-Templates erstellen** in Mailchimp
2. **Automatische Welcome-E-Mail** einrichten
3. **Regelmäßige Newsletter** planen (z.B. wöchentlich)
4. **Newsletter-Segmente** erstellen (z.B. nach Interesse)

Viel Erfolg! 🚀
