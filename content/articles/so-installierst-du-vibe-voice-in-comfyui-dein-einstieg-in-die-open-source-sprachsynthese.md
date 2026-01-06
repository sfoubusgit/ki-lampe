---
title: "So installierst du Vibe Voice in ComfyUI – dein Einstieg in die Open-Source Sprachsynthese"
date: '2025-12-21T17:22:10.516Z'
dateModified: '2025-12-21T17:22:10.516Z'
excerpt: >-
  Lerne, wie du Vibe Voice von Microsoft in ComfyUI installierst und lokal nutzt. Schritt-für-Schritt-Anleitung für realistische KI-Stimmen ohne Cloud-Limitierungen.
category: Praktisch
tags:
  - Vibe Voice
  - ComfyUI
  - Text-to-Speech
  - TTS
  - Sprachsynthese
  - Tutorial
  - Lokale Installation
  - Open Source
author: AI Content Team
seoKeywords:
  - 'Vibe Voice installieren'
  - 'ComfyUI Vibe Voice'
  - 'Text-to-Speech lokal'
  - 'Vibe Voice Tutorial'
  - 'Microsoft Vibe Voice'
  - 'KI Sprachsynthese'
  - 'Vibe Voice ComfyUI Setup'
image: >-
  /images/vibe_voice_guide_hero_image/vibevoice_installation_guide_hero_image_final.png
---

Die künstliche Stimme wird immer realistischer – und mit Vibe Voice bekommst du eines der spannendsten Open-Source-Projekte im Bereich Text-to-Speech (TTS) direkt auf deinen Rechner. Entwickelt von Microsoft, kann Vibe Voice Stimmen nicht nur natürlich klingen lassen, sondern sogar mehrere Sprecher*innen, Emotionen und Akzente realistisch nachbilden. In Kombination mit ComfyUI, der modularen Oberfläche für KI-Modelle, lässt sich diese Technologie bequem lokal nutzen – ganz ohne Cloud-Limitierungen.

In diesem Artikel zeige ich dir Schritt für Schritt, wie du Vibe Voice in ComfyUI installierst und lokal betreibst – inklusive aller Modelle und Zusatzdateien.

## 1. Voraussetzungen

Vor der Installation benötigst du:

- **ComfyUI** ist bereits auf deinem Computer installiert.
- Eine **CUDA-kompatible GPU** (z. B. NVIDIA) sorgt für beste Performance.
- **Git** ist installiert, um Repositories zu klonen.

Falls du ComfyUI noch nicht besitzt, bekommst du es hier:
🔗 https://github.com/comfyanonymous/ComfyUI

## 2. Vibe Voice Node in ComfyUI installieren

1. Öffne deinen ComfyUI-Installationsordner.
2. Wechsle in den Ordner:
   ```
   ComfyUI/custom_nodes
   ```
3. Öffne dort die Eingabeaufforderung (einfach in die Pfadleiste klicken und cmd eingeben).
4. Führe folgenden Befehl aus:
   ```bash
   git clone https://github.com/EnemyXNET/vibe-voice-comfyui
   ```
5. Nach dem Klonen ComfyUI neu starten.
6. Der Vibe Voice Node wird beim Start automatisch installiert.

## 3. Modell-Dateien herunterladen

Damit Vibe Voice funktioniert, musst du das eigentliche Sprachmodell herunterladen.

### a) Modell von Hugging Face laden

1. Besuche:
   🔗 https://huggingface.co/microsoft/VibeVoice-1.5B
2. Scrolle nach unten zum Bereich "Files and versions" bzw. "Models".
3. Lade alle Dateien des gewünschten Modells herunter (z. B. VibeVoice-1.5B).
4. Lege anschließend einen neuen Ordner mit dem Namen deines Modells an, etwa:
   ```
   VibeVoice-1.5B
   ```
5. Verschiebe diesen Ordner in dein ComfyUI-Verzeichnis.
   
   Beispielpfad:
   ```
   C:\Users\<DeinName>\ComfyUI\models\vibevoice\VibeVoice-1.5B
   ```
   (Ersetze `<DeinName>` durch deinen tatsächlichen Windows-Benutzernamen.)

### b) Tokenizer-Dateien hinzufügen

Vibe Voice benötigt außerdem Tokenizer-Dateien zur korrekten Textverarbeitung.

1. Erstelle im selben Verzeichnis einen neuen Unterordner namens `tokenizer`:
   ```
   C:\Users\<DeinName>\ComfyUI\models\vibevoice\tokenizer
   ```
2. Lade die folgenden Dateien von Hugging Face herunter und speichere sie in diesem Ordner:
   🔗 https://huggingface.co/Qwen/Qwen2.5-1.5B/tree/main
   - `merges.txt`
   - `tokenizer.json`
   - `tokenizer_config.json`
   - `vocab.json`

Damit ist die Modellstruktur vollständig eingerichtet.

## 4. Beispiel-Workflow laden

Jetzt kannst du testen, ob alles korrekt funktioniert:

1. Öffne ComfyUI.
2. Navigiere zu:
   ```
   ComfyUI/custom_nodes/vibe-voice-comfyui/examples
   ```
3. Wähle einen Workflow, z. B.:
   - `vibe_voice_single_speaker.json`
   - `vibe_voice_multiple_speakers.json`
4. Ziehe die Datei einfach per Drag & Drop ins ComfyUI-Fenster.

## 5. Einstellungen konfigurieren

Innerhalb des Workflows kannst du deine eigenen Sprecher, Texte und Parameter einstellen.

### Sprecher-Audios

Lade kurze Referenz-Clips der Stimmen hoch, die du klonen möchtest. Das Modell nutzt sie, um Tonhöhe und Klangfarbe zu übernehmen.

### Transkript

Gib deinen Text ein oder speichere ihn in einer `.txt`-Datei.

Beispiel:
```
[Speaker1] Hallo! Bist du bereit?
[Speaker2] Absolut, lass uns starten!
```

### Modell-Auswahl

Wähle in der Node aus:

- **vibe-voice-1_5B** – kleiner, schneller, bis ca. 90 Minuten Audio
- **vibe-voice-7B** – größer, besserer Klang, aber mehr Rechenzeit

### Empfohlene Grundeinstellungen

- **Free memory after generate**: → `False` (wenn du mehrere Durchläufe planst)
- **Diffusion steps**: → `20` (ausgewogener Kompromiss aus Qualität & Geschwindigkeit)
- **Temperature / CFG / Top—P**: → feinjustierbar für Emotion und Ausdruck

## 6. Audio generieren

1. Drücke **Run** in ComfyUI.
2. Beim ersten Start lädt das Modell eventuell noch Dateien nach (~17 GB bei der 7B-Version).
3. Nach der Berechnung findest du dein Ergebnis im Output-Ordner oder kannst es direkt anhören.

## 7. Optional: Textdatei-Eingabe

Falls du lieber mit gespeicherten Texten arbeitest:

1. Füge einen **Load Text File** Node hinzu.
2. Lade deine `.txt`-Datei aus dem Ordner `/ComfyUI/input/`.
3. Verbinde sie mit dem "Transcript"-Node im Workflow.

## 8. Wichtige Hinweise

- Unterstützt bis zu **4 Sprecher*innen** pro Audio.
- Funktioniert **komplett offline** – ideal für Podcasts, Hörbücher und Voiceovers.
- Einmal installiert: **unbegrenzt nutzbar** und kostenlos.
- Erkennt automatisch **Emotionen und Betonungen**.

## Fazit

Mit Vibe Voice und ComfyUI kannst du beeindruckende KI-Stimmen direkt auf deinem PC generieren – ohne Online-Abhängigkeit oder Limitierungen. Mit etwas Feintuning erhältst du Ergebnisse, die professionellen TTS—Systemen kaum nachstehen.

Besonders spannend ist die offene Struktur: Wer mag, kann eigene Modelle, Tokenizer oder Custom-Workflows hinzufügen und so seine eigene KI—Sprecherlandschaft aufbauen.
