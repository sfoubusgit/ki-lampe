# Schritt 4: Erster Artikel-Entwurf (V1)

# Stable Diffusion auf CPU nutzen: Komplette Anleitung ohne GPU

## Einleitung

Du möchtest KI-Bilder mit Stable Diffusion erstellen, aber dein PC hat keine High-End-GPU? Viele denken, dass Stable Diffusion nur mit teurer Grafikkarte funktioniert – aber das stimmt nicht. Mit den richtigen Einstellungen und Optimierungen kannst du Stable Diffusion auch auf CPU nutzen.

In diesem Artikel zeige ich dir, wie du Stable Diffusion auf einem normalen PC ohne GPU installierst und nutzt. Alles, was du brauchst, ist ein PC mit Windows, Mac oder Linux – keine teure Hardware nötig.

---

## 1. Warum Stable Diffusion auf CPU funktioniert

Stable Diffusion wurde ursprünglich für GPU entwickelt, aber moderne Versionen unterstützen auch CPU. Das bedeutet:

### Vorteile von CPU-Nutzung:
- **Keine teure GPU nötig**: Funktioniert auf jedem PC
- **Einfacher Einstieg**: Keine Hardware-Upgrades nötig
- **Kostenlos**: Open Source, keine Cloud-Kosten

### Nachteile:
- **Langsamer**: CPU ist deutlich langsamer als GPU
- **Mehr RAM nötig**: Mindestens 8 GB, besser 16 GB
- **Längere Generierungszeiten**: 2-5 Minuten pro Bild statt 10-30 Sekunden

**Die Realität**: CPU-Nutzung ist möglich, aber langsamer. Für gelegentliche Nutzung oder zum Lernen ist es aber völlig ausreichend.

---

## 2. Systemanforderungen für Stable Diffusion auf CPU

### Minimale Anforderungen:
- **CPU**: 4 Kerne, 2.5 GHz (z.B. Intel i5 oder AMD Ryzen 5)
- **RAM**: 8 GB (16 GB empfohlen)
- **Speicher**: 10 GB freier Platz
- **Betriebssystem**: Windows 10/11, macOS, oder Linux

### Empfohlene Anforderungen:
- **CPU**: 8+ Kerne, 3.0+ GHz
- **RAM**: 16 GB oder mehr
- **SSD**: Für schnellere Modell-Ladezeiten

### Was du NICHT brauchst:
- ❌ Dedizierte GPU
- ❌ High-End-Prozessor
- ❌ Teure Hardware

---

## 3. Installation: Schritt für Schritt

### Schritt 1: Python installieren

1. Gehe zu python.org
2. Lade Python 3.10 oder 3.11 herunter
3. Installiere Python (wichtig: "Add Python to PATH" aktivieren)
4. Prüfe Installation: Öffne Terminal, tippe `python --version`

### Schritt 2: Git installieren

1. Gehe zu git-scm.com
2. Lade Git herunter
3. Installiere Git (Standard-Einstellungen sind OK)

### Schritt 3: Stable Diffusion WebUI installieren

1. Öffne Terminal/Command Prompt
2. Navigiere zu einem Ordner (z.B. `cd C:\AI`)
3. Klone das Repository:
   ```
   git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
   ```
4. Warte auf Download (kann einige Minuten dauern)

### Schritt 4: Modelle herunterladen

1. Gehe zu huggingface.co/models
2. Suche nach "Stable Diffusion"
3. Lade ein Modell herunter (z.B. "stable-diffusion-v1-5")
4. Lege die Datei in den Ordner: `stable-diffusion-webui/models/Stable-diffusion/`

### Schritt 5: WebUI starten

1. Öffne Terminal im WebUI-Ordner
2. Führe aus: `webui.bat` (Windows) oder `./webui.sh` (Mac/Linux)
3. Warte auf Start (kann 2-5 Minuten dauern beim ersten Mal)
4. Öffne Browser: `http://127.0.0.1:7860`

---

## 4. Optimierungen für bessere CPU-Performance

### Tipp 1: Reduziere Bildgröße
- Standard: 512x512 statt 1024x1024
- Spart Rechenzeit deutlich

### Tipp 2: Nutze weniger Sampling-Schritte
- Standard: 20-30 Steps statt 50+
- Gute Ergebnisse auch mit weniger Steps

### Tipp 3: Nutze optimierte Modelle
- Modelle wie "Stable Diffusion 1.5" sind effizienter
- Vermeide sehr große Modelle

### Tipp 4: Schließe andere Programme
- Mehr RAM = bessere Performance
- Schließe Browser-Tabs, andere Apps

### Tipp 5: Nutze CPU-Optimierungen
- In WebUI: Einstellungen → Optimierungen
- Aktiviere "Low VRAM" Modus (auch für CPU nützlich)

---

## 5. Erste Bilder erstellen

### Schritt 1: Prompt eingeben
1. Öffne WebUI im Browser
2. Tippe einen Prompt ein (z.B. "a beautiful landscape, sunset, mountains")
3. Wähle Einstellungen:
   - Steps: 20
   - Size: 512x512
   - Sampler: Euler a

### Schritt 2: Bild generieren
1. Klicke auf "Generate"
2. Warte auf Generierung (2-5 Minuten auf CPU)
3. Ergebnis wird angezeigt

### Schritt 3: Optimieren
1. Experimentiere mit verschiedenen Prompts
2. Passe Steps an (mehr = besser, aber langsamer)
3. Teste verschiedene Sampler

---

## 6. Häufige Probleme und Lösungen

### Problem 1: "Out of Memory"
**Lösung:** Reduziere Bildgröße, schließe andere Programme, nutze weniger Steps

### Problem 2: Sehr langsame Generierung
**Lösung:** Das ist normal auf CPU. Nutze kleinere Bilder, weniger Steps.

### Problem 3: WebUI startet nicht
**Lösung:** Prüfe Python-Installation, stelle sicher, dass Git installiert ist

### Problem 4: Modelle werden nicht geladen
**Lösung:** Prüfe, ob Modell-Dateien im richtigen Ordner sind

---

## Zusammenfassung

Stable Diffusion auf CPU zu nutzen ist möglich, auch wenn es langsamer ist als mit GPU. Mit den richtigen Einstellungen und Optimierungen kannst du trotzdem gute Ergebnisse erzielen – ohne teure Hardware.

**Das Wichtigste**: Du brauchst keine GPU, um mit KI-Bildgenerierung zu starten. CPU funktioniert auch, nur etwas langsamer. Für den Einstieg und gelegentliche Nutzung ist es völlig ausreichend.

---

## Bildgenerierung (1920 × 1280)

**Bild-Prompt:**  
`Modern anime-tech style illustration, warm colors (orange, cyan, violet), person using Stable Diffusion on laptop without GPU, digital interface elements showing CPU usage and image generation, neon light effects, holographic design elements displaying "Stable Diffusion", "CPU", "No GPU Needed", friendly anime-style character, cinematic composition, 1920x1280, high detail, warm and inspiring atmosphere, technological yet accessible`

