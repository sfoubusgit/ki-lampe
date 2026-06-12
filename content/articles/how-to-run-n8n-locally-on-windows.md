---
title: "Wie man n8n lokal unter Windows ausführt (Für Dummies)"
description: "Eine echte, anfängerfreundliche Schritt-für-Schritt-Anleitung, um n8n lokal unter Windows mit Docker auszuführen. Kein Linux, keine Domain, keine Serverkenntnisse erforderlich."
topic: "Automatisierung"
level: "BEGINNER"
readTime: "10 MIN"
image: "/images/n8n_run_locally_windows_tutorial_image.webp"
date: 2026-01-22
---

# Wie man n8n lokal unter Windows ausführt (Für Dummies)

Diese Anleitung ist für **absolute Einsteiger** geschrieben.

Sie setzt voraus:
- Du verwendest **Windows 10 oder Windows 11**
- Du hast **keine Vorkenntnisse** mit n8n, Docker oder Servern
- Du möchtest n8n einfach **lokal starten**, um es zu sehen und zu lernen

Kein Linux.  
Keine Domain.  
Kein Cloud-Setup.

---

## Was ist n8n (einfach erklärt)?

**n8n** ist ein Tool, mit dem du **Apps miteinander verbinden und Workflows automatisieren** kannst – über eine visuelle Oberfläche.

Du kannst es dir wie Zapier vorstellen, aber:
- Es läuft **auf deinem eigenen Computer**
- Es ist **kostenlos für private Nutzung**
- Du hast **volle Kontrolle** über deine Daten und Automatisierungen

### Beispiele für spätere Automatisierungen

- Wenn ein Formular abgeschickt wird → schicke dir selbst eine E-Mail  
- Jeden Tag → hole Daten aus einer API → speichere sie in einer Tabelle  
- Wenn ein Webhook aufgerufen wird → führe Logik aus → gib eine Antwort zurück  

Im Moment ist das Ziel einfach: **n8n zum Laufen bringen**.

---

## Der einfachste Weg unter Windows (empfohlen)

Wir verwenden **Docker Desktop**.

Warum diese Methode:
- Kein Programmieren notwendig
- Läuft zuverlässig unter Windows
- Leicht zurückzusetzen oder zu entfernen
- Die gängigste Einrichtung für Einsteiger

---

## Voraussetzungen

- **Betriebssystem**: Windows 10 oder Windows 11  
- **Internetverbindung**: für die Erstinstallation erforderlich  
- **Administratorrechte**: zum Installieren von Docker  

Mehr wird nicht benötigt.

---

## Teil 1 — Docker Desktop installieren (nur einmal)

### Schritt 1: Docker Desktop herunterladen

1. Öffne deinen Browser
2. Gehe zu:  
   https://www.docker.com/products/docker-desktop/
3. Klicke auf **Download for Windows**
4. Starte das Installationsprogramm

Während der Installation:
- Alle Standardoptionen aktiviert lassen
- WSL zulassen, falls Windows danach fragt
- Den Computer neu starten, wenn du dazu aufgefordert wirst

---

### Schritt 2: Prüfen, ob Docker läuft

Nach dem Neustart:
1. Öffne **Docker Desktop**
2. Warte, bis **Running** angezeigt wird
3. Das Docker-Symbol sollte sichtbar sein

Sobald Docker läuft, kannst du fortfahren.

---

## Teil 2 — n8n lokal starten

Das ist der wichtigste Schritt. Du brauchst nur **einen einzigen Befehl**.

### Schritt 3: PowerShell öffnen

1. Drücke die **Windows-Taste**
2. Tippe `powershell`
3. Drücke **Enter**

Ein blaues oder schwarzes Terminalfenster öffnet sich. Das ist normal.

---

### Schritt 4: n8n-Befehl ausführen

Kopiere den folgenden Befehl **exakt**:

`docker run -it --rm -p 5678:5678 n8nio/n8n`

Füge ihn in die PowerShell ein und drücke **Enter**.

#### Was passiert jetzt?

- Docker lädt n8n herunter (nur beim ersten Start)
- n8n startet automatisch
- Text läuft im Terminalfenster durch

Dieses Fenster **nicht schließen**.

---

## Teil 3 — n8n im Browser öffnen

### Schritt 5: n8n-Oberfläche öffnen

1. Öffne deinen Browser (Chrome, Edge, Firefox usw.)
2. Gehe zu:

`http://localhost:5678`

Du solltest nun den n8n-Einrichtungsbildschirm sehen.

---

## Ersteinrichtung

Die Ersteinrichtung ist kurz.

n8n bittet dich:
- Eine E-Mail-Adresse und ein Passwort zu erstellen
- Optional die Personalisierung zu überspringen
- **Community / Free** auszuwählen

Danach befindest du dich im n8n-Dashboard.

---

## Woran du erkennst, dass es funktioniert

Du solltest Folgendes sehen:
- Ein sauberes Dashboard
- Einen Button mit der Aufschrift **Create Workflow**
- Eine leere Arbeitsfläche für Nodes

Wenn du das siehst, war die Einrichtung erfolgreich.

---

## Wichtige Hinweise für Einsteiger

### Brauche ich eine Domain?

Nein.  
`localhost:5678` ist vollkommen ausreichend zum Lernen und Testen.

### Brauche ich Linux?

Nein.  
Docker kümmert sich im Hintergrund um alles.

### Ist n8n aus dem Internet erreichbar?

Nein.  
Diese n8n-Instanz ist nur auf deinem eigenen Computer verfügbar.

### Was passiert, wenn ich PowerShell schließe?

n8n wird beendet.

Das ist kein Problem. Du kannst es jederzeit neu starten.

---

## n8n sicher beenden

1. Gehe zum PowerShell-Fenster
2. Drücke **CTRL + C**

n8n wird sauber beendet.

---

## n8n später erneut starten

1. Öffne PowerShell
2. Führe denselben Befehl erneut aus:

`docker run -it --rm -p 5678:5678 n8nio/n8n`

Danach im Browser öffnen:

`http://localhost:5678`

---

## Empfohlene nächste Schritte

Sobald n8n lokal läuft:
1. Verstehen, was ein **Trigger** ist
2. Lernen, was **Nodes** machen
3. Einen ersten einfachen Workflow erstellen
4. Später mit Webhooks arbeiten