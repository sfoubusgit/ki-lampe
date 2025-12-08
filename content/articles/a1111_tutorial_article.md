---
image: "/images/stable_diffusion_a1111_tutorial_hero.jpg"
title: "Tutorial: Automatic1111 Stable Diffusion installieren (Schritt-für-Schritt Anleitung)"
description: "In diesem Tutorial lernst du, wie du Automatic1111 Stable Diffusion unter Windows installierst – inklusive Voraussetzungen, Fehlerbehebung und Tipps für beste Ergebnisse."
date: "2025-02-15"
tags:
  - tutorial
  - stable diffusion
  - automatic1111
  - bildgenerierung
category: "KI Tools"
author: "AI Content Team"
readingTime: "8 Minuten"
---

# Tutorial: Automatic1111 Stable Diffusion installieren (2025)

Stable Diffusion ist eines der beliebtesten KI-Modelle zur Bildgenerierung – und Automatic1111 (A1111) ist die am weitesten verbreitete Web-Oberfläche dafür.

In diesem Schritt-für-Schritt-Tutorial zeige ich dir genau, wie du A1111 installierst – ohne Vorwissen und ohne technische Hürden.

---

## ⭐ Was du in diesem Tutorial lernst

- Was Automatic1111 ist  
- Voraussetzungen  
- Installation  
- Modelle hinzufügen  
- Fehlerbehebung  
- Performance-Tipps  

---

# 1. Was ist Automatic1111?

Automatic1111 ist eine lokal laufende WebUI für Stable Diffusion.  
Sie bietet:

- einfache Bedienung  
- mächtige Features  
- volle Hardware-Kontrolle  
- riesige Plugin-Auswahl (ControlNet, LoRA, Upscaler usw.)

---

# 2. Voraussetzungen

- Windows 10 oder 11  
- NVIDIA-Grafikkarte  
  - Minimum: 6 GB VRAM  
  - Optimal: 8–12 GB  
- Aktuelle NVIDIA-Treiber  
- 10–20 GB freier Speicher  

Treiber: https://www.nvidia.com/Download/index.aspx

---

# 3. Installation unter Windows

## Schritt 1: Automatic1111 herunterladen

1. Gehe zu: https://github.com/AUTOMATIC1111/stable-diffusion-webui  
2. Klicke auf **Code → Download ZIP**  
3. Entpacke alles nach:  
   `C:\stable-diffusion-webui\`

---

## Schritt 2: Modell hinzufügen

Du brauchst mindestens ein **Stable-Diffusion-Modell** (Checkpoint).

Empfohlene Modelle:

- SDXL Base  
- Realistic Vision  
- Juggernaut XL  

### So fügst du ein Modell hinzu

1. Lade ein Modell von civitai.com herunter.  
2. Lege die Datei mit der Endung `.safetensors` in diesen Ordner:
C:\stable-diffusion-webui\models\Stable-diffusion\


---

## Schritt 3: WebUI starten

1. Öffne den entpackten Ordner.  
2. Starte `webui-user.bat`.

Der Installer:

- richtet Python ein  
- lädt nötige Abhängigkeiten  
- startet die WebUI  

Danach öffnet sich automatisch:

http://127.0.0.1:7860

---

# 4. Die wichtigsten Bereiche der WebUI

### txt2img  
Text → Bild

### img2img  
Bild → Variation

### Extras  
Upscaling, Restauration

### Extensions  
Plugins wie ControlNet

---

# 5. Fehlerbehebung

## Problem: „Torch not compiled with CUDA“
→ GPU wird nicht erkannt  
→ NVIDIA-Treiber aktualisieren  
→ Python- oder CUDA-Version passt nicht

---

## Problem: WebUI schließt sofort
→ Modell im falschen Ordner  

Richtig:

models/Stable-diffusion/NAME.safetensors

yaml
Code kopieren

---

## Problem: Sehr langsam
- Xformers aktivieren  
- Kleinere Auflösung  
- `--medvram` für wenig VRAM  

---

# 6. Bonus: Performance optimieren

### Xformers aktivieren  
In `webui-user.bat`:

set COMMANDLINE_ARGS=--xformers

yaml
Code kopieren

### FP16 aktivieren  
Weniger VRAM-Verbrauch.

### ControlNet sparsam installieren  
Erhöht VRAM-Bedarf.

---

# Fazit

Du weißt jetzt:

- wie man Automatic1111 installiert  
- wie Modelle hinzugefügt werden  
- wie die WebUI gestartet wird  
- wie typische Fehler gelöst werden  

Jetzt kannst du eigene KI-Bilder generieren.  
Wenn du weitere Tutorials wie ControlNet, ComfyUI oder SDXL möchtest – sag einfach Bescheid!
