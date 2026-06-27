---
title: "Flux.1 Dev mit ComfyUI installieren – Schritt-für-Schritt Anleitung (2026)"
description: "Vollständige Installation von Flux.1 Dev in ComfyUI Desktop – vom Download bis zum ersten Bild."
topic: KI-TOOLS
level: "BEGINNER"
readTime: "10 MIN"
image: "/images/comfyui-flux-hero.webp"
date: 2026-01-15
---

![Flux.1 Dev mit ComfyUI installieren – Schritt-für-Schritt Anleitung (2026)](/images/comfyui-flux-hero.webp)

# Flux.1 Dev mit ComfyUI installieren – Schritt-für-Schritt Anleitung (2026)

**Flux.1 Dev** gehört zu den leistungsfähigsten aktuellen Bildgenerationsmodellen und lässt sich hervorragend mit **ComfyUI** nutzen.  
Diese Anleitung führt dich vollständig durch die Installation und Einrichtung – vom Download bis zum ersten generierten Bild.

Der Artikel ist so aufgebaut, dass du jederzeit weißt, **wo du dich befindest, was als Nächstes kommt und warum ein Schritt notwendig ist**.

> 💡 **Tipp:** Hast du weniger als 12 GB VRAM? Nutze die **fp8**-Variante von Flux.1 Dev – deutlich weniger Speicherbedarf bei kaum sichtbarem Qualitätsverlust.

---

## Voraussetzungen

- Windows 10 oder Windows 11  
  (macOS funktioniert grundsätzlich ähnlich, Pfade unterscheiden sich)
- Mindestens **12 GB VRAM** empfohlen
- Stabile Internetverbindung  
  (mehrere Dateien sind mehrere Gigabyte groß)

> ⚠️ **Achtung:** Die Modelldateien sind zusammen über **20 GB** groß – prüfe vorher, ob genug Speicherplatz frei ist.

> 📌 **Hinweis:** ComfyUI Desktop und die portable Version teilen sich Modelle nicht automatisch. Lege die Dateien im Ordner der Version ab, die du tatsächlich nutzt.

[[CLOUD_CTA]]

---

## Download-Sektion (alle wichtigen Links gesammelt)

### ComfyUI Desktop App
https://www.comfy.org/download

### Flux Text Encoder
- `clip_l.safetensors`  
  https://huggingface.co/comfyanonymous/flux_text_encoders/blob/main/clip_l.safetensors
- `t5xxl_fp8_e4m3fn.safetensors` (empfohlen)  
  https://huggingface.co/comfyanonymous/flux_text_encoders/blob/main/t5xxl_fp8_e4m3fn.safetensors

### Flux VAE
- `ae.safetensors`  
  https://huggingface.co/SicariusSicariiStuff/FLUX.1-dev/blob/main/ae.safetensors

### Flux.1 Dev Hauptmodell
- `flux1-dev-fp8.safetensors`  
  https://huggingface.co/Kijai/flux-fp8/blob/main/flux1-dev-fp8.safetensors

### Offizielle Flux Workflows
https://comfyanonymous.github.io/ComfyUI_examples/flux/

---

## Schritt 1: ComfyUI Desktop App installieren

1. Öffne die offizielle Download-Seite:  
   https://www.comfy.org/download
2. Lade den **ComfyUI Desktop Installer** für Windows herunter.
3. Starte die heruntergeladene `.exe`-Datei per Doppelklick.
4. Folge dem Installationsassistenten:
   - Lizenzbedingungen akzeptieren  
   - Standard-Installationspfad verwenden  
   - Installation vollständig abschließen lassen  

Während dieses Vorgangs werden alle benötigten Komponenten automatisch eingerichtet.  
Die Installation kann je nach Internetgeschwindigkeit mehrere Minuten dauern.

Nach Abschluss findest du **ComfyUI** im Startmenü oder als Desktop-Verknüpfung.

---

## Schritt 2: ComfyUI zum ersten Mal starten

1. Starte die **ComfyUI Desktop App**.
2. Die Anwendung:
   - startet automatisch den internen Server
   - öffnet deinen Browser unter folgender Adresse:

```
http://127.0.0.1:8188
```

Falls sich kein Browserfenster öffnet, kopiere die Adresse manuell in Chrome, Edge oder Firefox.

Du solltest nun die ComfyUI-Oberfläche sehen.  
Auf der rechten Seite befindet sich bereits der **Manager-Button**.

---

## Schritt 3: Modellordner öffnen

Damit ComfyUI die Flux-Modelle korrekt erkennt, müssen sie in die vorgesehenen Ordner kopiert werden.

Öffne den Windows-Explorer und navigiere zu:

```
C:\Users\DeinName\AppData\Local\Programs\ComfyUI\models
```

Falls der Ordner schwer zu finden ist, kannst du im Explorer einfach nach **ComfyUI** suchen.

---

## Schritt 4: Ordnerstruktur prüfen

Stelle sicher, dass folgende Unterordner existieren.  
Falls sie fehlen, kannst du sie einfach manuell anlegen.

Pflichtordner:

- `clip`
- `vae`
- `diffusion_models`

Alternative für das Hauptmodell:

- `unet`

---

## Schritt 5: Flux-Modelle herunterladen und einordnen

### Text Encoder → `models/clip/`

Ordner:

```
models/clip/
```

Dateien:

- `clip_l.safetensors`
- `t5xxl_fp8_e4m3fn.safetensors`

---

### VAE → `models/vae/`

Ordner:

```
models/vae/
```

Datei:

- `ae.safetensors`

---

### Hauptmodell → `models/diffusion_models/`

Ordner:

```
models/diffusion_models/
```

Datei:

- `flux1-dev-fp8.safetensors`

Sobald alle Dateien korrekt kopiert wurden, **ComfyUI einmal neu starten**, damit die Modelle erkannt werden.

---

## Schritt 6: Flux Workflow laden

1. Öffne die offiziellen Flux-Beispiele:  
   https://comfyanonymous.github.io/ComfyUI_examples/flux/
2. Wähle einen **Flux Dev Text-zu-Bild Workflow**.
3. Ziehe das Beispielbild oder die JSON-Datei per Drag-and-Drop in die ComfyUI-Arbeitsfläche.

Der komplette Workflow wird automatisch geladen.

---

## Schritt 7: Workflow korrekt einstellen

Überprüfe die wichtigsten Nodes im Workflow:

### Diffusion Model Loader

Modell:

- `flux1-dev-fp8.safetensors`

Einstellung:

- `weight_dtype`: `fp8` (falls auswählbar)

---

### CLIP / DualCLIP Loader

- `clip_l.safetensors`
- `t5xxl_fp8_e4m3fn.safetensors`

---

### VAE Loader

- `ae.safetensors`

---

### Empfohlene Grundeinstellungen

- Steps: **20–50**
- Guidance: **ca. 3.5**
- CFG: **1.0**

Mit **natürlich formulierten, detaillierten Prompts** erzielt Flux besonders gute Ergebnisse.

---

## Schritt 8: Bild generieren

1. Prompt eingeben
2. Auf **Queue Prompt** klicken
3. Das Bild wird berechnet und im Output-Fenster angezeigt

Beim ersten Durchlauf kann die Berechnung etwas länger dauern, da die Modelle zunächst in den Grafikspeicher geladen werden.

---

## Hinweise und Tipps

- Die Desktop-App hält ComfyUI automatisch aktuell
- Fehlende Nodes lassen sich über den **Manager** installieren
- FP8-Modelle sind ideal für Grafikkarten mit 12–16 GB VRAM
- Wenn ein Modell nicht auswählbar ist, ComfyUI neu starten
- Große Modelle profitieren deutlich von SSD-Speicher

---

## Fazit

Mit der ComfyUI Desktop App lässt sich **Flux.1 Dev** stabil, sauber und reproduzierbar einrichten.  
Nach der einmaligen Einrichtung steht einer effizienten Arbeit mit hochwertigen Bildgenerierungen nichts mehr im Weg.
