---
image: '/images/flux_esrgan_artikel_upscale_hero_image.webp'
title: "ComfyUI Workflow einrichten: Flux-Bilder automatisch mit Real-ESRGAN 4× hochskalieren"
date: '2026-01-06T15:03:56.090Z'
dateModified: '2026-01-06T15:03:56.090Z'
excerpt: >-
  Dieses Tutorial erklärt Schritt für Schritt, wie ein fertiger ComfyUI-Workflow genutzt wird, um mit Flux Bilder zu erzeugen und diese automatisch mit Real-ESRGAN auf die vierfache Auflösung zu skalieren – ohne Vorkenntnisse.
category: Tutorials
tags:
  - ComfyUI
  - Flux
  - Real-ESRGAN
author: AI Content Team
seoKeywords:
  - 'ComfyUI Workflow Flux'
  - 'Real-ESRGAN ComfyUI'
  - 'KI Bilder hochskalieren'
---

## Was du nach diesem Tutorial kannst

Wenn du diesen Artikel Schritt für Schritt befolgst, hast du am Ende:

- ComfyUI korrekt vorbereitet
- einen fertigen Workflow importiert
- Bilder werden automatisch erzeugt und anschließend 4× hochskaliert
- keine Programmierung
- keine Vorkenntnisse erforderlich

👉 Du musst nichts verstehen, nur die Schritte ausführen.

## Wichtige Voraussetzung: ComfyUI

Dieser Workflow funktioniert ausschließlich in ComfyUI.

Falls du ComfyUI noch nicht installiert hast, lies zuerst dieses Tutorial auf KI-LAMPE:

👉 ComfyUI installieren – Schritt für Schritt:
https://ki-lampe.com/comfyui-installieren

⛔ Ohne ComfyUI kannst du diesen Workflow nicht nutzen.

## Benötigte Dateien (Download)

Du brauchst genau drei Dateien.
Bitte lade alle drei herunter, bevor du weitermachst.

### 1️⃣ ComfyUI Workflow (Flux + Real-ESRGAN)

[📥 Download Workflow](https://ki-lampe.com/workflows/FLUX_SCHNELL_WORKFLOW_UPSCALE_RealESRGAN_4x.json)

**Was ist das?**
Ein fertig eingerichteter ComfyUI-Workflow, der:

- ein Bild mit Flux erzeugt
- dieses Bild danach automatisch mit Real-ESRGAN 4× hochskaliert

### 2️⃣ Real-ESRGAN Upscaling-Modell (4×)

[📥 Download Real-ESRGAN Modell](https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth)

**Was macht diese Datei?**
Sie vergrößert dein Bild, ohne es neu zu generieren.

### 3️⃣ Flux-Bildmodell (FLUX.1 Schnell – FP8)

[📥 Download Flux Modell](https://huggingface.co/black-forest-labs/FLUX.1-schnell)

**Was ist das?**
Das KI-Modell, mit dem ComfyUI das Bild erzeugt.

**So lädst du die Datei herunter:**
1. Öffne den Link oben (offizielles Repository)
2. Klicke auf "Files and versions"
3. Suche die Datei `flux1-schnell.safetensors`
4. Klicke auf das Download-Icon neben der Datei

![Hugging Face Download](/images/flux_schnell_download_markiert.webp)

## Schritt 1: Dateien richtig in ComfyUI ablegen

⚠️ Dieser Schritt ist entscheidend.
Liegen die Dateien im falschen Ordner, funktioniert nichts.

### 🔹 Flux-Modell ablegen

**Datei:**

```
flux1-schnell-fp8.safetensors
```

**So gehst du vor**

1. Öffne den Ordner, in dem ComfyUI installiert ist
2. Öffne dort den Ordner:

```
ComfyUI/models/flux
```

**Falls der Ordner flux nicht existiert:**

- erstelle ihn manuell
- Kopiere die Datei hinein

✅ **Ergebnis:**

```
ComfyUI/models/flux/flux1-schnell-fp8.safetensors
```

![Flux Checkpoint Verzeichnis](/images/checkpoint_verzeichnis_location.webp)

### 🔹 Real-ESRGAN Modell ablegen (sehr wichtig)

**Datei:**

```
RealESRGAN_x4plus.pth
```

**So gehst du vor**

1. Öffne im ComfyUI-Ordner diesen Pfad:

```
ComfyUI/models/upscale_models
```

👉 **Beispiel (kann bei dir anders aussehen):**

```
ComfyUI\models\upscale_models
```

2. Kopiere die Datei genau in diesen Ordner

✅ **Ergebnis:**

```
ComfyUI/models/upscale_models/RealESRGAN_x4plus.pth
```

![Real-ESRGAN Modell Verzeichnis](/images/upscale_model_esrgan_location.webp)

⛔ **Achtung:**
Liegt das Modell nicht in upscale_models,
erscheint es nicht in ComfyUI.

## Schritt 2: Workflow in ComfyUI importieren

1. Starte ComfyUI
2. Öffne ComfyUI im Browser
3. Rechtsklick → Load / Import Workflow
4. Wähle diese Datei:

```
FLUX_SCHNELL_WORKFLOW_UPSCALE_RealESRGAN_4x.json
```

👉 Du siehst jetzt mehrere verbundene Kästen (Nodes).
👉 Nichts ändern. Nichts löschen.

![ComfyUI Workflow](/images/ComfyUI_Workflow_FLUX_Schnell_Upscale_ESRGAN.webp)

## Schritt 3: Prüfen, ob ComfyUI die Modelle findet

### ✔ Flux-Node

**Modell:**

```
flux1-schnell-fp8.safetensors
```

muss ausgewählt sein

### ✔ Upscale-Node

**Modell:**

```
RealESRGAN_x4plus.pth
```

muss auswählbar sein

**Wenn ein Modell fehlt → Datei liegt im falschen Ordner.**

## Schritt 4: Workflow starten

1. Gib einen einfachen Prompt ein
   (z. B. „a realistic portrait photo")
2. Klicke auf Queue Prompt
3. Warte

**Woran erkennst du, dass alles funktioniert?**

- Das Bild wird zuerst normal erzeugt
- danach startet ein zweiter Verarbeitungsschritt
- das Ergebnisbild ist:
  - deutlich größer
  - sichtbar schärfer

👉 Das ist das Real-ESRGAN-Upscaling.

## Häufige Fehler (kurz & eindeutig)

**Upscale passiert nicht**
→ Modell liegt nicht in upscale_models

**Flux-Modell fehlt**
→ Datei liegt nicht in models/flux

**Alles sehr langsam**
→ Normal, Upscaling braucht viel Rechenleistung

## Fazit

Dieser ComfyUI-Workflow mit Flux und Real-ESRGAN ist eine stabile Standardlösung:

- keine Spielerei
- keine Theorie
- kein Basteln

Einmal korrekt eingerichtet, erzeugt ComfyUI automatisch größere und schärfere Bilder – reproduzierbar und zuverlässig.

Wenn du jeden Schritt genau befolgt hast, funktioniert der Workflow auch ohne technisches Vorwissen.

