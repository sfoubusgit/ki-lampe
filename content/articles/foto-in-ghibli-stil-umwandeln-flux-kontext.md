---
title: "Foto in Ghibli-Stil umwandeln – kostenlos & lokal mit Flux Kontext (2026)"
description: "Echten Ghibli-Look aus jedem Foto – dein Gesicht und deine Pose bleiben. Der Trick ist ein kleines, kostenloses Kontext-LoRA. Lokal getestet auf einer RTX 3060 (12 GB), ohne Abo."
topic: KUNST & KI
level: "INTERMEDIATE"
readTime: "11 MIN"
image: "/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp"
date: 2026-07-14
---

![Foto in echten Ghibli-Stil umwandeln mit Flux Kontext – ein realistisches Porträt wird zur handgemalten Ghibli-Figur, Gesicht und Pose bleiben gleich](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp)

# Foto in Ghibli-Stil umwandeln – kostenlos & lokal mit Flux Kontext (2026)

Zieh dein Foto in einen der viralen „Ghibli"-Generatoren – und du bekommst **eine hübsche Figur von jemand anderem** zurück. Anderes Gesicht, andere Pose, oft hinter einem Abo oder einem Wasserzeichen.

Flux Kontext macht es umgekehrt: Es malt *dein* Foto neu, statt ein neues zu erfinden – Gesicht, Haltung und Bildaufbau bleiben. **Aber Achtung, hier liegt der Haken, den fast alle Anleitungen verschweigen:** Der Prompt „Studio Ghibli" allein liefert nur *generisches* Anime – glänzende Kulleraugen, keine echte Ghibli-Handschrift. Der **echte** Look kommt erst mit einem kleinen, kostenlosen **Kontext-LoRA**.

Diese Anleitung zeigt beides – den schnellen Prompt-Weg und den Schritt zum echten Ghibli. **Lokal getestet auf einer RTX 3060 mit 12 GB VRAM**, kostenlos, ohne Cloud-Zwang.

> **Stand: Juli 2026** · ComfyUI (aktuell) · Flux.1 Kontext Dev als GGUF · LoRA `Kontext-Style/Ghibli_lora`

**Was dich erwartet:**

- Warum Kontext dein Motiv erhält – und der Prompt allein trotzdem nicht reicht
- Das kostenlose **Ghibli-LoRA für Kontext** – und wohin die Datei gehört
- Der komplette Workflow in ComfyUI – mit dem GGUF-Trick für 12-GB-Karten
- Der richtige Prompt + die getesteten Einstellungen (LoRA-Stärke, Guidance)
- Feintuning und Fixes, wenn der Look kippt

---

## Warum Kontext dein Motiv erhält

Der entscheidende Begriff heißt **Bildkonditionierung**. Kontext bekommt dein Originalbild nicht als vage Beschreibung, sondern als **festen Bezugspunkt** (im Workflow der Node `ReferenceLatent`). Es rechnet die Stil-Änderung *auf dein Bild* – statt aus einem Textprompt ein komplett neues Bild zu würfeln.

Praktisch heißt das:

- **Gleiches Gesicht, gleiche Pose, gleicher Bildausschnitt** – nur der Malstil wechselt.
- Kein zufälliger Anime-Charakter, sondern erkennbar **du** (oder dein Motiv).
- Du kannst denselben Look konsistent auf eine ganze Fotoserie anwenden.

Das ist die halbe Miete. Die andere halbe ist der Stil selbst – und da wird's interessant.

---

## Warum der Prompt allein nicht reicht

Das Basismodell von Flux Kontext kennt „Ghibli" nur schwach – der Studioname ist markenrechtlich kaum in den Trainingsdaten. Bittest du es per Prompt um „Studio Ghibli style", bekommst du **generisches Anime**: große glänzende Augen, grelle Farben, aber nicht die weiche, handgemalte Ghibli-Handschrift.

![Vergleich: derselbe Prompt ohne LoRA ergibt generisches Anime, mit dem Kontext-Ghibli-LoRA echten Ghibli-Look](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/06_lora_vs_prompt.webp)

**Die Lösung ist ein LoRA** – eine kleine Zusatzdatei (~350 MB), die dem Modell einen konkreten Stil beibringt. Genau dafür gibt es das Projekt **[Kontext-Style](https://huggingface.co/Kontext-Style/Ghibli_lora)**: ein Ghibli-LoRA, das *speziell für Flux Kontext* auf gepaarten Bilddaten trainiert wurde. Kostenlos, lokal, ein Download – und der Look sitzt.

> 🔑 **Merke:** Kontext liefert die **Bildtreue** (dein Motiv bleibt), das LoRA liefert den **echten Stil**. Erst beide zusammen ergeben echtes Ghibli statt Feld-Wald-Wiesen-Anime.

---

## Voraussetzungen

| Was | Empfehlung |
|---|---|
| Grafikkarte | **NVIDIA mit ≥ 8 GB VRAM** (getestet auf RTX 3060/12 GB) |
| Software | ComfyUI (aktuelle Version) |
| Custom Node | **ComfyUI-GGUF** (für den GGUF-Loader) |
| Speicher | ~ 12 GB (Basis-Modelle) + ~ 350 MB (LoRA) |

> 💡 **Tipp:** Wir nutzen die **GGUF-Variante** von Flux Kontext (`Q4_K_M`, ~6,8 GB). GGUF ist ein komprimiertes Format – so läuft ein 12-Milliarden-Parameter-Modell flüssig auf einer 12-GB-Karte, für die die volle `fp16`-Version (~24 GB) viel zu groß wäre.

> ⚠️ **Achtung:** ComfyUI Desktop und die portable Version teilen sich Modelle **nicht**. Lege die Dateien in den `models`-Ordner der Version, die du wirklich startest.

[[CLOUD_CTA]]

---

## Schritt 1: Custom Node „ComfyUI-GGUF" installieren

Der GGUF-Loader ist kein Standard-Node – er kommt über den Manager:

1. ComfyUI starten → rechts auf **Manager** klicken.
2. **Custom Nodes Manager** öffnen → nach **`ComfyUI-GGUF`** suchen → **Install**.
3. ComfyUI **komplett neu starten**.

Ohne diesen Schritt fehlt später der Node „Unet Loader (GGUF)" und der Workflow bleibt rot.

---

## Schritt 2: Modelle und das Ghibli-LoRA einordnen

Flux Kontext besteht aus vier Bausteinen (Hauptmodell, zwei Text-Encoder, VAE). Dazu kommt **das Ghibli-LoRA** – das ist der Teil, der den echten Stil macht.

| Datei | Quelle | Ordner |
|---|---|---|
| `flux1-kontext-dev-Q4_K_M.gguf` | 🤗 `QuantStack/FLUX.1-Kontext-dev-GGUF` | `models/unet/` |
| `t5xxl_fp8_e4m3fn.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/text_encoders/` |
| `clip_l.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/clip/` |
| `ae.safetensors` | 🤗 `black-forest-labs/FLUX.1-schnell` (VAE) | `models/vae/` |
| `Ghibli_lora_weights.safetensors` | 🤗 **`Kontext-Style/Ghibli_lora`** | `models/loras/` |

Die Ordnerstruktur sieht danach so aus:

```
📁 ComfyUI/
└── 📁 models/
    ├── 📁 unet/
    │   └── flux1-kontext-dev-Q4_K_M.gguf
    ├── 📁 text_encoders/
    │   └── t5xxl_fp8_e4m3fn.safetensors
    ├── 📁 clip/
    │   └── clip_l.safetensors
    ├── 📁 vae/
    │   └── ae.safetensors
    └── 📁 loras/
        └── Ghibli_lora_weights.safetensors
```

![Wohin kommt welche Datei: unet, text_encoders, clip, vae und das Ghibli-LoRA im loras-Ordner](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/05_model_folders.webp)

> 📌 **Hinweis:** Nach dem Kopieren ComfyUI **einmal neu starten**, sonst tauchen Modelle und LoRA nicht in den Dropdowns auf.

---

## Schritt 3: Den Workflow laden – GGUF-Trick + LoRA einhängen

Du baust nichts von Hand. ComfyUI bringt den Basis-Workflow als Vorlage mit:

1. Oben auf **Workflow → Browse Templates** klicken → Kategorie **Flux** → **„Flux.1 Kontext Dev (Basic)"**. Der komplette Graph lädt automatisch.
2. **GGUF-Trick für 12-GB-Karten:** Den Node **„Load Diffusion Model"** löschen. Rechtsklick → **Add Node → bootleg → Unet Loader (GGUF)** → `flux1-kontext-dev-Q4_K_M.gguf` wählen.
3. **LoRA einhängen:** Rechtsklick → **Add Node → loaders → LoraLoaderModelOnly**. Den **MODEL**-Ausgang des GGUF-Loaders in den LoRA-Node stecken, dort `Ghibli_lora_weights.safetensors` wählen und **`strength_model` auf 1.0** setzen. Den **MODEL**-Ausgang des LoRA-Nodes weiter zum **KSampler** führen.

Kurz prüfen, dass die restlichen Loader stimmen:

- **DualCLIPLoader** → `t5xxl_fp8_e4m3fn` + `clip_l`, `type`: **flux**
- **VAELoader** → `ae.safetensors`

![Vom Foto zum echten Ghibli-Bild in vier Schritten: Modelle + LoRA laden, Foto und Prompt, Kontext-Sampling, Ergebnis](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/04_workflow_diagram.webp)

> 🔑 **Merke:** Die Kette lautet **GGUF-Loader → LoRA-Loader → KSampler**. Das LoRA sitzt *zwischen* Modell und Sampler – nur so wird der Ghibli-Stil aktiv.

---

## Schritt 4: Foto laden, Prompt schreiben, generieren

**1. Foto laden.** Im **Load Image**-Node dein Quellfoto hochladen. Ein klares Porträt mit gutem Licht funktioniert am besten.

**2. Prompt schreiben.** Mit dem LoRA brauchst du keine Prompt-Akrobatik – der empfohlene Satz reicht:

```
Turn this image into the Ghibli style.
```

**3. Einstellungen setzen.** Die getesteten Werte:

| Parameter | Wert | Warum |
|---|---|---|
| Sampler | `euler` | stabil für Flux |
| Scheduler | `simple` | Standard für Kontext |
| Steps | **20** | sauberer Look; 8 für einen schnellen Vorschau-Lauf |
| Guidance | **2.5** | Kontext-Standard – das LoRA macht die Stilarbeit |
| CFG | **1.0** | fix bei Flux |
| LoRA-Stärke | **1.0** | voller Ghibli-Look |

**4. Generieren.** Auf **Queue Prompt** klicken.

> 🧪 **Ausprobieren:** Der **erste** Lauf dauert ~2–3 Minuten, weil Modell **und** LoRA in den Grafikspeicher geladen werden. Jede weitere Umwandlung liegt auf der RTX 3060 bei **~30–60 Sekunden**.

Ergebnis: aus deinem Foto wird eine handgemalte Ghibli-Figur – **Gesicht, Pose und Kleidung bleiben, der Malstil ist echtes Ghibli.**

---

## Feintuning: die LoRA-Stärke steuert den Look

Die eine Stellschraube, die den Unterschied macht, ist **`strength_model`** am LoRA-Node:

| Stärke | Wirkung |
|---|---|
| **1.0** | Voller Ghibli-Look – handgemalt, weiche Augen, Film-Optik |
| **0.7–0.8** | Behält mehr von der Realistik des Fotos (Mischung Foto ↔ Ghibli) |
| **0.5** | Nur ein leichter Anstrich – erkennbar Foto, mit Ghibli-Ton |

> 💡 **Tipp:** Das **[Kontext-Style](https://huggingface.co/Kontext-Style)**-Projekt hat nicht nur Ghibli, sondern ein ganzes Set an Stil-LoRAs für Kontext (u. a. Aquarell, Cartoon, Line-Art). Gleicher Workflow, du tauschst nur die LoRA-Datei – so baust du dir aus einem Foto eine ganze Stil-Palette.

---

## Sieht nicht nach Ghibli aus? Schnelle Fixes

| Problem | Ursache | Lösung |
|---|---|---|
| Modelle/LoRA nicht im Dropdown | ComfyUI nicht neu gestartet | ComfyUI neu starten |
| Node „Unet Loader (GGUF)" fehlt | ComfyUI-GGUF nicht installiert | Manager → ComfyUI-GGUF installieren |
| Ergebnis = generisches Anime | LoRA nicht aktiv / Stärke 0 | Kette **GGUF → LoRA → KSampler** prüfen, `strength_model` auf 1.0 |
| Look zu schwach | LoRA-Stärke zu niedrig | `strength_model` Richtung **1.0** erhöhen |
| Gesicht wird unkenntlich | LoRA-Stärke zu hoch für dein Motiv | auf **0.8** senken |
| Rote Nodes / Fehler | Datei im falschen Ordner | Ordner gemäß Tabelle oben prüfen |

---

## Keine 12-GB-Karte? Nimm die Cloud

Läuft deine GPU nicht mit oder fehlt der VRAM: Denselben Workflow (inkl. LoRA) startest du auf einer Cloud-GPU – eine **RTX 4090 (24 GB) ab ~0,59 $/h** rechnet Kontext in Sekunden und ohne Quant-Kompromiss. Die komplette Einrichtung steht in unserem Hub:

👉 **[ComfyUI auf RunPod einrichten (Network Volume)](/article/comfyui-auf-runpod)**

[[CLOUD_CTA]]

---

## Fazit & nächste Schritte

Echtes Ghibli braucht kein Abo und kein ChatGPT – nur Flux Kontext plus ein kostenloses LoRA. Kontext hält dein Motiv fest, das LoRA bringt den echten Stil. Der Prompt allein macht nur generisches Anime – **das LoRA ist der Unterschied.**

- 📥 **Download:** [Ghibli-Workflow als JSON herunterladen](/downloads/flux-kontext-ghibli-workflow.json) – in ComfyUI per **Workflow → Open** laden, LoRA-Datei ist bereits eingehängt, Foto rein, generieren.
- 🎨 **Das LoRA selbst:** [Kontext-Style/Ghibli_lora auf HuggingFace](https://huggingface.co/Kontext-Style/Ghibli_lora) (kostenlos).
- 🔗 **Grundlagen fehlen?** → [Flux.1 Dev mit ComfyUI installieren](/article/comfyui-flux-lokal-einrichten)
- ⏮️ **Aus der Reihe:** [Flux Kontext: Kleidung ändern in ComfyUI](/article/flux-kontext-kleidung-aendern-comfyui)
- ⏭️ **Als Nächstes:** „Flux Kontext: Hintergrund tauschen" und „Flux Kontext: Frisur ändern".

Ein Foto, ein LoRA, ein Satz – und aus deinem Schnappschuss wird eine Szene, die aussieht wie aus deinem Lieblingsfilm.
