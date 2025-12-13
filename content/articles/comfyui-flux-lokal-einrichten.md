---
title: "ComfyUI + FLUX lokal einrichten – Eine geführte Anleitung"
date: '2025-12-13T17:10:00.000Z'
dateModified: '2025-12-13T17:10:00.000Z'
excerpt: "Lerne, wie du ComfyUI installierst und Stable Diffusion FLUX lokal nutzt. Geführte Anleitung mit direkten Downloads & Workflow."
category: KI-Bildgenerierung
tags:
  - ComfyUI
  - FLUX
  - Stable Diffusion
  - KI-Bildgenerierung
  - Lokale Installation
  - Tutorial
author: AI Content Team
seoKeywords:
  - 'ComfyUI installieren'
  - 'FLUX lokal nutzen'
  - 'Stable Diffusion FLUX'
  - 'ComfyUI FLUX Tutorial'
  - 'FLUX Workflow ComfyUI'
image: >-
  /images/comfyui-flux-lokal-einrichten/flux-tutorial-image-webp.webp
---

# ComfyUI + FLUX lokal einrichten – Eine geführte Anleitung

**Stable Diffusion FLUX lokal nutzen – ohne Cloud, ohne Abo, mit voller Kontrolle:**

In dieser Anleitung lernst du, wie du ComfyUI installierst und FLUX Schritt für Schritt lokal einrichtest.

Alle benötigten Dateien sind direkt verlinkt, die Einrichtung ist geführt aufgebaut und eignet sich auch für Einsteiger.

## Ziel dieses Tutorials:

➡️ ComfyUI installieren

➡️ FLUX Modell herunterladen

➡️ FLUX lokal in ComfyUI nutzen

➡️ Erstes Bild erfolgreich generieren

---

## Voraussetzungen für ComfyUI & FLUX

Bevor du startest, prüfe bitte kurz:

- **Betriebssystem**: Windows 10 oder 11
- **GPU**: NVIDIA-Grafikkarte
- **VRAM**: mindestens 8 GB (empfohlen: 16 GB)

Wenn das zutrifft, kannst du FLUX lokal ausführen.

---

## 1) ComfyUI installieren (Windows, lokal)

### 1.1 ComfyUI Download

👉 **ComfyUI Windows Portable (ZIP):**

https://github.com/comfyanonymous/ComfyUI/releases/latest/download/ComfyUI_windows_portable.zip

Dieser Download enthält bereits alles Nötige, um ComfyUI lokal zu starten.

### 1.2 ComfyUI entpacken

Entpacke den ZIP-Ordner nach:

```
C:\ComfyUI
```

### 1.3 ComfyUI starten

1. Öffne `C:\ComfyUI`
2. Starte: `run_nvidia_gpu.bat`
3. ComfyUI öffnet sich automatisch im Browser unter: `http://127.0.0.1:8188`

👉 **ComfyUI ist jetzt erfolgreich installiert.**

---

## 2) Stable Diffusion FLUX herunterladen

Für FLUX benötigst du drei Modell-Komponenten.

Alle Dateien sind direkt verlinkt.

### 2.1 FLUX Hauptmodell (empfohlen: FP8)

👉 **FLUX 1 Dev FP8:**

https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/flux1-dev-fp8.safetensors

**Speicherort:**

```
C:\ComfyUI\models\checkpoints
```

### 2.2 Text-Encoder für FLUX

👉 **CLIP-L:**

https://huggingface.co/comfyanonymous/clip_l/resolve/main/clip_l.safetensors

👉 **T5 XXL FP8:**

https://huggingface.co/comfyanonymous/t5xxl_fp8_e4m3fn/resolve/main/t5xxl_fp8_e4m3fn.safetensors

**Speicherort:**

```
C:\ComfyUI\models\clip
```

### 2.3 VAE für FLUX

👉 **FLUX VAE (ae.safetensors):**

https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/ae.safetensors

**Speicherort:**

```
C:\ComfyUI\models\vae
```

---

## 3) ComfyUI neu starten

Damit ComfyUI die FLUX-Modelle erkennt:

1. ComfyUI schließen
2. Schwarzes Konsolenfenster schließen
3. `run_nvidia_gpu.bat` erneut starten

---

## 4) FLUX Workflow für ComfyUI laden

👉 **FLUX 1 Dev – ComfyUI Workflow (JSON):**

https://openart.ai/workflows/antelove19ai/flux-1---dev---basic/ldumwSmUimyJ1x2NDCQd

So lädst du den Workflow:

1. Datei herunterladen
2. Per Drag & Drop in das ComfyUI-Browserfenster ziehen

👉 **Der FLUX-Workflow ist jetzt geladen.**

---

## 5) FLUX Prompt einfügen

Klicke auf den Prompt-Node und füge ein:

```
cinematic portrait of a futuristic architect,
soft lighting, ultra-detailed,
realistic skin texture, 35mm photography,
shallow depth of field
```

---

## 6) Empfohlene FLUX Einstellungen

| Einstellung | Wert |
|-------------|------|
| Steps | 25 |
| CFG | 4.5 |
| Seed | -1 |
| Batch Size | 1 |
| Auflösung | 1024 × 1024 |

Diese Werte sind stabil und einsteigerfreundlich.

---

## 7) Bild mit FLUX generieren

👉 **Klicke auf Queue Prompt**

Nach wenigen Sekunden wird dein erstes FLUX-Bild lokal generiert.

---

## 8) Wo werden die Bilder gespeichert?

Alle Bilder findest du hier:

```
C:\ComfyUI\output
```

---

## 9) Häufige Fehler & Lösungen

### CUDA / Out of Memory Fehler

- Auflösung auf 768 × 768 reduzieren
- Erneut Queue Prompt klicken

### FLUX Modell wird nicht angezeigt

- Ordnerpfade prüfen
- ComfyUI neu starten

---

## Fazit: FLUX lokal mit ComfyUI nutzen

Mit dieser Anleitung hast du gelernt:

- wie du ComfyUI installierst
- wie du Stable Diffusion FLUX lokal einrichtest
- wie du FLUX in ComfyUI nutzt

Du hast jetzt eine kontrollierte, lokale KI-Bildgenerierung, ohne Abhängigkeit von Cloud-Diensten.

---

## ❓ FAQ (für Google Snippets)

### Was ist FLUX in Stable Diffusion?

FLUX ist ein modernes Bildmodell mit besonders hoher Detailtreue und starker Prompt-Verarbeitung.

### Kann man FLUX lokal nutzen?

Ja, mit ComfyUI lässt sich FLUX vollständig lokal auf dem eigenen Rechner ausführen.

### Welche GPU wird für FLUX benötigt?

Empfohlen wird eine NVIDIA-GPU mit mindestens 8 GB VRAM.

