---
image: '/images/sd-cpu-artikel.webp'
title: "Stable Diffusion auf CPU nutzen: Komplette Anleitung ohne GPU"
date: '2025-01-28T10:00:00.000Z'
dateModified: '2025-01-28T10:00:00.000Z'
excerpt: >-
  Lerne, wie du Stable Diffusion auf einem normalen PC ohne GPU installierst und nutzt. Komplette Schritt-für-Schritt-Anleitung für Windows, Mac und Linux. KI-Bildgenerierung für alle zugänglich – keine teure Hardware nötig.
category: Praktisch
tags:
  - Stable Diffusion
  - KI-Bildgenerierung
  - CPU
  - Installation
  - Tutorial
  - WebUI
  - Künstliche Intelligenz
  - Bildgenerierung
author: AI Content Team
seoKeywords:
  - 'stable diffusion cpu'
  - 'stable diffusion ohne gpu'
  - 'stable diffusion installieren cpu'
  - 'stable diffusion webui cpu'
  - 'stable diffusion auf laptop'
  - 'stable diffusion ohne grafikkarte'
  - 'stable diffusion cpu anleitung'
  - 'stable diffusion webui ohne gpu'
---

## Einleitung

Markus sitzt vor seinem Laptop und schaut sich YouTube-Videos über KI-Bildgenerierung an. "Das sieht so cool aus!", denkt er. Aber dann liest er die Systemanforderungen: "NVIDIA GPU mit 8 GB VRAM empfohlen." Sein Laptop hat nur eine integrierte Grafikkarte. "Das funktioniert bei mir nicht", denkt er enttäuscht.

Aber das stimmt nicht! Stable Diffusion funktioniert auch auf CPU – auch wenn es etwas langsamer ist. In diesem Artikel zeige ich dir, wie du Stable Diffusion auf einem normalen PC ohne GPU installierst und nutzt. Alles, was du brauchst, ist ein PC mit Windows, Mac oder Linux – keine teure Hardware nötig.

**Warum das wichtig ist:** Nicht jeder kann sich eine High-End-GPU leisten. Stable Diffusion auf CPU macht KI-Bildgenerierung für alle zugänglich – auch wenn es 2-5 Minuten pro Bild dauert statt 10-30 Sekunden.

---

## 1. Warum Stable Diffusion auf CPU funktioniert (und warum es sinnvoll ist)

Stable Diffusion wurde ursprünglich für GPU entwickelt, aber moderne Versionen unterstützen auch CPU. Das bedeutet:

### ✅ Vorteile von CPU-Nutzung:
- **Keine teure GPU nötig**: Funktioniert auf jedem PC, auch Laptops
- **Einfacher Einstieg**: Keine Hardware-Upgrades nötig
- **Kostenlos**: Open Source, keine Cloud-Kosten
- **Vollständige Kontrolle**: Alle Daten bleiben lokal
- **Lernen möglich**: Perfekt zum Experimentieren und Lernen

### ⚠️ Nachteile (realistisch):
- **Langsamer**: CPU ist deutlich langsamer als GPU
  - GPU: 10-30 Sekunden pro Bild
  - CPU: 2-5 Minuten pro Bild
- **Mehr RAM nötig**: Mindestens 8 GB, besser 16 GB
- **Längere Generierungszeiten**: Geduld ist gefragt

**Die Realität**: CPU-Nutzung ist möglich und funktioniert gut für:
- ✅ Gelegentliche Nutzung
- ✅ Lernen und Experimentieren
- ✅ Kleine Projekte
- ✅ Wenn du keine GPU hast

**Nicht ideal für:**
- ❌ Massenproduktion (100+ Bilder pro Tag)
- ❌ Sehr große Bilder (1024x1024+)
- ❌ Komplexe Workflows mit vielen Iterationen

---

## 2. Systemanforderungen: Was du wirklich brauchst

### Minimale Anforderungen (funktioniert, aber langsam):
- **CPU**: 4 Kerne, 2.5 GHz (z.B. Intel i5-4xxx oder AMD Ryzen 5 2000)
- **RAM**: 8 GB (wird knapp, aber funktioniert)
- **Speicher**: 15 GB freier Platz (für Modelle und Installation)
- **Betriebssystem**: Windows 10/11, macOS 10.15+, oder Linux

**Erwartete Performance:** 3-8 Minuten pro Bild (512x512)

### Empfohlene Anforderungen (bessere Performance):
- **CPU**: 8+ Kerne, 3.0+ GHz (z.B. Intel i7-8xxx oder AMD Ryzen 7 3000+)
- **RAM**: 16 GB oder mehr (32 GB ideal)
- **SSD**: Für schnellere Modell-Ladezeiten
- **Betriebssystem**: Aktuelle Version

**Erwartete Performance:** 2-4 Minuten pro Bild (512x512)

### Was du NICHT brauchst:
- ❌ Dedizierte GPU (integrierte Grafikkarte reicht)
- ❌ High-End-Prozessor (normale CPU reicht)
- ❌ Teure Hardware
- ❌ Cloud-Abo

### Hardware-Check: Ist mein PC geeignet?

**Schnelltest:**
1. Öffne Task Manager (Windows) oder Activity Monitor (Mac)
2. Prüfe CPU: Mindestens 4 Kerne?
3. Prüfe RAM: Mindestens 8 GB?
4. Prüfe Speicher: Mindestens 15 GB frei?

Wenn alle drei "Ja" → Du kannst Stable Diffusion nutzen!

---

## 3. Installation: Schritt für Schritt (Windows)

### Schritt 1: Python installieren

1. **Gehe zu python.org**
2. **Lade Python 3.10.11 herunter** (nicht 3.12 – WebUI unterstützt es noch nicht vollständig)
3. **Wichtig:** Beim Installieren "Add Python to PATH" aktivieren!
4. **Installiere Python** (Standard-Einstellungen sind OK)
5. **Prüfe Installation:**
   - Öffne Command Prompt (Windows-Taste + R, tippe "cmd")
   - Tippe: `python --version`
   - Sollte zeigen: "Python 3.10.11" (oder ähnlich)

**Screenshot-Beschreibung:** Python-Installationsfenster mit "Add Python to PATH" aktiviert

### Schritt 2: Git installieren

1. **Gehe zu git-scm.com**
2. **Lade Git für Windows herunter**
3. **Installiere Git** (Standard-Einstellungen sind OK)
4. **Prüfe Installation:**
   - Öffne Command Prompt
   - Tippe: `git --version`
   - Sollte zeigen: "git version 2.x.x"

**Screenshot-Beschreibung:** Git-Installationsfenster

### Schritt 3: Stable Diffusion WebUI installieren

1. **Öffne Command Prompt**
2. **Navigiere zu einem Ordner:**
   ```
   cd C:\
   mkdir AI
   cd AI
   ```
3. **Klone das Repository:**
   ```
   git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
   ```
4. **Warte auf Download** (kann 5-10 Minuten dauern, je nach Internet)
5. **Prüfe:** Es sollte ein Ordner "stable-diffusion-webui" erstellt worden sein

**Screenshot-Beschreibung:** Command Prompt mit git clone Befehl und Fortschritt

### Schritt 4: Modelle herunterladen

1. **Gehe zu huggingface.co/models**
2. **Suche nach "runwayml/stable-diffusion-v1-5"**
3. **Klicke auf "Files and versions"**
4. **Lade "v1-5-pruned.safetensors" herunter** (ca. 4 GB)
5. **Lege die Datei in:**
   ```
   C:\AI\stable-diffusion-webui\models\Stable-diffusion\
   ```
6. **Erstelle den Ordner, falls er nicht existiert**

**Screenshot-Beschreibung:** Hugging Face Modell-Seite mit Download-Button

**Alternative:** Nutze Civitai.com für andere Modelle (später)

### Schritt 5: WebUI starten (CPU-Modus)

1. **Öffne Command Prompt im WebUI-Ordner:**
   ```
   cd C:\AI\stable-diffusion-webui
   ```
2. **Führe aus:**
   ```
   webui.bat --use-cpu
   ```
3. **Warte auf Start** (beim ersten Mal kann es 5-10 Minuten dauern)
   - Du siehst viele Zeilen Text
   - Warte auf: "Running on local URL: http://127.0.0.1:7860"
4. **Öffne Browser:**
   - Gehe zu: `http://127.0.0.1:7860`
   - WebUI sollte sich öffnen

**Screenshot-Beschreibung:** WebUI im Browser geöffnet, Prompt-Eingabefeld sichtbar

**Wichtig:** Lasse das Command Prompt-Fenster offen! Wenn du es schließt, stoppt WebUI.

---

## 4. Installation: Mac & Linux (Kurzversion)

### Mac:
1. Installiere Python 3.10 (über Homebrew oder python.org)
2. Installiere Git (über Homebrew: `brew install git`)
3. Klone Repository: `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git`
4. Starte: `./webui.sh --use-cpu`

### Linux:
1. Installiere Python 3.10: `sudo apt install python3.10`
2. Installiere Git: `sudo apt install git`
3. Klone Repository: `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git`
4. Starte: `./webui.sh --use-cpu`

**Hinweis:** Für detaillierte Mac/Linux-Anleitung siehe offizielle WebUI-Dokumentation.

---

## 5. Optimierungen für bessere CPU-Performance

### ✅ Tipp 1: Reduziere Bildgröße

**Standard-Einstellungen:**
- **Empfohlen:** 512x512 Pixel
- **Vermeiden:** 1024x1024 (4x langsamer!)

**Warum:** Kleinere Bilder = weniger Berechnungen = schnellere Generierung

**In WebUI:**
- Gehe zu Einstellungen
- Setze "Width" auf 512
- Setze "Height" auf 512

### ✅ Tipp 2: Nutze weniger Sampling-Schritte

**Standard-Einstellungen:**
- **Empfohlen:** 20-30 Steps
- **Vermeiden:** 50+ Steps (nur minimal bessere Qualität)

**Warum:** Weniger Steps = schnellere Generierung, Qualität bleibt gut

**In WebUI:**
- Setze "Sampling steps" auf 25
- Teste verschiedene Werte (20, 25, 30)

### ✅ Tipp 3: Nutze effiziente Sampler

**Empfohlene Sampler (schnell + gut):**
- ✅ Euler a (schnell, gute Qualität)
- ✅ DPM++ 2M (schnell, sehr gute Qualität)
- ✅ LMS (schnell, stabile Ergebnisse)

**Vermeiden:**
- ❌ DPM++ 2M Karras (langsamer)
- ❌ DDIM (langsamer)

**In WebUI:**
- Wähle "Sampler" → "Euler a"

### ✅ Tipp 4: Schließe andere Programme

**Warum:** Mehr RAM = bessere Performance

**Vor dem Start:**
- Schließe Browser-Tabs (außer WebUI)
- Schließe andere Programme
- Prüfe RAM-Nutzung (Task Manager)

**Ziel:** Mindestens 8 GB RAM frei für Stable Diffusion

### ✅ Tipp 5: Nutze CPU-Optimierungen

**In WebUI-Einstellungen:**

1. Gehe zu "Settings" → "Optimizations"
2. Aktiviere:
   - ✅ "Low VRAM mode" (auch für CPU nützlich)
   - ✅ "Always load all models to RAM" (wenn genug RAM)
3. Speichere Einstellungen

### ✅ Tipp 6: Nutze optimierte Modelle

**Empfohlene Modelle (effizient):**
- Stable Diffusion 1.5 (4 GB) - Basis-Modell
- Stable Diffusion 1.4 (4 GB) - Alternative

**Vermeiden:**
- ❌ Sehr große Modelle (8 GB+) - zu langsam auf CPU
- ❌ SDXL (6 GB) - funktioniert, aber sehr langsam

---

## 6. Erste Bilder erstellen: Schritt für Schritt

### Schritt 1: WebUI öffnen

1. Stelle sicher, dass WebUI läuft (Command Prompt offen)
2. Öffne Browser: `http://127.0.0.1:7860`
3. WebUI sollte sich öffnen

**Screenshot-Beschreibung:** WebUI-Hauptseite mit Prompt-Eingabefeld

### Schritt 2: Einstellungen anpassen (für CPU)

1. **Klicke auf "Settings"** (oben)
2. **Setze folgende Werte:**
   - Width: 512
   - Height: 512
   - Sampling Steps: 25
   - Sampler: Euler a
   - Batch Count: 1 (für CPU)
3. **Klicke auf "Apply settings"**

### Schritt 3: Ersten Prompt eingeben

**Einfacher Prompt zum Testen:**
```
a beautiful landscape, sunset, mountains, photorealistic
```

**Tippe Prompt ein:**
1. Klicke in das große Textfeld (oben)
2. Tippe deinen Prompt
3. Optional: Negative Prompt (was du NICHT willst):
   ```
   blurry, low quality, distorted
   ```

### Schritt 4: Bild generieren

1. **Klicke auf "Generate"** (großer Button)
2. **Warte auf Generierung:**
   - Du siehst Fortschritt in der Konsole
   - "Generating..." erscheint
   - **Dauer:** 2-5 Minuten auf CPU
3. **Ergebnis wird angezeigt:**
   - Bild erscheint im Browser
   - Du kannst es speichern (Download-Button)

**Screenshot-Beschreibung:** WebUI während der Generierung, Fortschrittsanzeige sichtbar

### Schritt 5: Experimentieren

**Teste verschiedene Prompts:**
- "a cat wearing sunglasses, cyberpunk style"
- "futuristic city at night, neon lights, rain"
- "portrait of a robot, detailed, cinematic"

**Passe Einstellungen an:**
- Mehr Steps = bessere Qualität, aber langsamer
- Andere Sampler = andere Ergebnisse
- Verschiedene Bildgrößen = verschiedene Aspekte

---

## 7. Cloud-Alternativen (wenn CPU zu langsam ist)

### Option 1: RunPod / Vast.ai (GPU-Miete)

**Wie es funktioniert:**
- Miete GPU-Cloud-Server (ab ~0,20€/Stunde)
- Nutze Stable Diffusion dort
- Lade Ergebnisse herunter

**Vorteile:**
- ✅ Sehr schnell (GPU-Performance)
- ✅ Keine lokale Hardware nötig
- ✅ Bezahle nur, wenn du nutzt

**Nachteile:**
- ❌ Kosten (bei häufiger Nutzung)
- ❌ Internet nötig
- ❌ Daten in Cloud

### Option 2: Replicate / Hugging Face Spaces

**Wie es funktioniert:**
- Nutze Stable Diffusion in Browser
- Keine Installation nötig
- Bezahle pro Bild (oder kostenlos mit Limits)

**Vorteile:**
- ✅ Keine Installation
- ✅ Funktioniert sofort
- ✅ Oft kostenlos (mit Limits)

**Nachteile:**
- ❌ Kosten bei häufiger Nutzung
- ❌ Weniger Kontrolle
- ❌ Internet nötig

### Vergleich: CPU vs. Cloud

| Aspekt | CPU (Lokal) | Cloud (GPU) |
|--------|------------|-------------|
| **Geschwindigkeit** | 2-5 Min/Bild | 10-30 Sek/Bild |
| **Kosten** | Kostenlos | Ab 0,20€/Stunde |
| **Installation** | Benötigt | Keine |
| **Internet** | Nicht nötig | Nötig |
| **Daten** | Lokal | In Cloud |
| **Kontrolle** | Vollständig | Begrenzt |

**Empfehlung:**
- **Für Lernen/Experimentieren:** CPU (lokal)
- **Für Produktion/Massen:** Cloud (GPU)

---

## 8. Häufige Probleme und Lösungen

### Problem 1: "Out of Memory" / "RAM-Fehler"

**Symptome:**
- WebUI stürzt ab
- Fehlermeldung über RAM
- System wird langsam

**Lösungen:**
1. **Reduziere Bildgröße:**
   - Nutze 512x512 statt 768x768
2. **Schließe andere Programme:**
   - Task Manager öffnen
   - Programme mit hohem RAM-Verbrauch schließen
3. **Nutze weniger Steps:**
   - 20 statt 30 Steps
4. **Wenn nichts hilft:**
   - Nutze Cloud-Alternative
   - Oder: RAM aufrüsten (16 GB empfohlen)

---

### Problem 2: Sehr langsame Generierung (10+ Minuten)

**Symptome:**
- Ein Bild dauert sehr lange
- System scheint "eingefroren"

**Lösungen:**
1. **Prüfe CPU-Auslastung:**
   - Task Manager → CPU
   - Sollte bei 80-100% sein (normal)
2. **Reduziere Bildgröße:**
   - 512x512 ist optimal
3. **Nutze weniger Steps:**
   - 20-25 Steps reichen meist
4. **Prüfe andere Programme:**
   - Schließe CPU-intensive Programme
5. **Realistische Erwartungen:**
   - 2-5 Minuten pro Bild ist normal auf CPU
   - GPU ist 10-20x schneller

---

### Problem 3: WebUI startet nicht

**Symptome:**
- Fehlermeldung beim Start
- WebUI öffnet sich nicht
- Browser zeigt Fehler

**Lösungen:**
1. **Prüfe Python:**
   - Command Prompt: `python --version`
   - Sollte 3.10.x zeigen
   - Falls nicht: Python neu installieren
2. **Prüfe Git:**
   - Command Prompt: `git --version`
   - Falls Fehler: Git installieren
3. **Prüfe Internet:**
   - WebUI lädt beim ersten Start Dateien
   - Internet muss funktionieren
4. **Lösche und neu installieren:**
   - Lösche "stable-diffusion-webui" Ordner
   - Starte Installation neu

---

### Problem 4: Modelle werden nicht geladen

**Symptome:**
- WebUI startet, aber keine Modelle verfügbar
- Fehlermeldung "No models found"

**Lösungen:**
1. **Prüfe Modell-Ordner:**
   - Gehe zu: `stable-diffusion-webui/models/Stable-diffusion/`
   - Sollte .safetensors oder .ckpt Dateien enthalten
2. **Prüfe Dateiformat:**
   - Modelle müssen .safetensors oder .ckpt sein
   - Nicht .pt oder andere Formate
3. **Lade Modell neu herunter:**
   - Von huggingface.co
   - Lege in richtigen Ordner

---

### Problem 5: Bilder sehen schlecht aus

**Symptome:**
- Bilder sind verschwommen
- Artefakte sichtbar
- Unrealistische Ergebnisse

**Lösungen:**
1. **Erhöhe Steps:**
   - Teste 30, 40, 50 Steps
   - Mehr Steps = bessere Qualität (aber langsamer)
2. **Nutze besseren Sampler:**
   - DPM++ 2M statt Euler a
3. **Verbessere Prompts:**
   - Sei spezifischer
   - Nutze Qualitäts-Wörter: "high quality", "detailed", "photorealistic"
4. **Nutze Negative Prompts:**
   - "blurry, low quality, distorted, artifacts"

---

## 9. Häufige Fragen (FAQ)

### Funktioniert Stable Diffusion wirklich auf CPU?
**Antwort:** Ja, absolut! Es ist langsamer als GPU (2-5 Minuten statt 10-30 Sekunden), aber funktioniert. Für Lernen und gelegentliche Nutzung ist es völlig ausreichend.

### Wie lange dauert die Generierung auf CPU?
**Antwort:** Das hängt von deiner Hardware ab:
- **Schwache CPU (4 Kerne):** 4-8 Minuten pro Bild (512x512)
- **Mittlere CPU (8 Kerne):** 2-4 Minuten pro Bild
- **Starke CPU (12+ Kerne):** 1-3 Minuten pro Bild

### Brauche ich wirklich keine GPU?
**Antwort:** Nein, GPU ist nicht nötig. CPU funktioniert auch, nur langsamer. Wenn du aber viele Bilder erstellen willst, ist GPU empfehlenswert.

### Kann ich auch größere Bilder erstellen (1024x1024)?
**Antwort:** Technisch ja, aber es dauert sehr lange (10-20 Minuten). Empfohlen: 512x512 für CPU. Größere Bilder später mit Upscaling-Tools vergrößern.

### Welches Betriebssystem ist am besten?
**Antwort:** Alle funktionieren:
- **Windows:** Am einfachsten, beste Dokumentation
- **Mac:** Funktioniert, aber etwas langsamer (M1/M2 besser)
- **Linux:** Funktioniert gut, für Fortgeschrittene

### Kann ich Modelle von Civitai nutzen?
**Antwort:** Ja! Lade Modelle von Civitai.com herunter und lege sie in den `models/Stable-diffusion/` Ordner. WebUI erkennt sie automatisch.

### Was, wenn ich mehr Performance will?
**Antwort:** Optionen:
1. RAM aufrüsten (16 GB → 32 GB)
2. Bessere CPU (mehr Kerne, höhere Frequenz)
3. Cloud-GPU mieten (RunPod, Vast.ai)
4. GPU kaufen (wenn Budget vorhanden)

### Ist CPU-Nutzung kostenlos?
**Antwort:** Ja, komplett kostenlos! Du zahlst nur für:
- Strom (PC läuft länger)
- Internet (für Download beim ersten Start)
- Keine Software-Kosten, keine Cloud-Kosten

---

## Zusammenfassung: So startest du mit Stable Diffusion auf CPU

1. **Prüfe deine Hardware**: Mindestens 8 GB RAM, 4 CPU-Kerne
2. **Installiere Python 3.10**: Wichtig: "Add to PATH" aktivieren
3. **Installiere Git**: Für Repository-Download
4. **Klone WebUI**: `git clone` Befehl ausführen
5. **Lade Modell herunter**: Von Hugging Face (4 GB)
6. **Starte WebUI**: Mit `--use-cpu` Flag
7. **Öffne Browser**: `http://127.0.0.1:7860`
8. **Erstelle erste Bilder**: Beginne mit 512x512, 25 Steps
9. **Optimiere**: Experimentiere mit Einstellungen
10. **Geduld haben**: CPU ist langsamer, aber funktioniert!

**Das Wichtigste**: Stable Diffusion auf CPU zu nutzen ist möglich und macht KI-Bildgenerierung für alle zugänglich. Du brauchst keine teure GPU, um zu starten. Es dauert etwas länger, aber für Lernen und gelegentliche Nutzung ist es völlig ausreichend.

Wenn du später mehr Performance brauchst, kannst du immer noch auf Cloud-Lösungen umsteigen oder eine GPU kaufen. Aber für den Einstieg ist CPU perfekt!

---

## Verwandte Artikel

- ["Home-Office Produktivität mit KI: So steigerst du deine Effizienz"](/artikel/home-office-produktivitaet-mit-ki-so-steigerst-du-deine-effizienz)
- ["KI für Content-Erstellung: Professionelle Texte mit ChatGPT erstellen"](/artikel/ki-content-erstellung-professionelle-texte-mit-chatgpt-erstellen)
