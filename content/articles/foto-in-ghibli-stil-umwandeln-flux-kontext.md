---
title: "Foto in Ghibli-Stil umwandeln – kostenlos & lokal mit Flux Kontext (2026)"
description: "Verwandle jedes Foto in den handgemalten Ghibli-Look – dein Gesicht, deine Pose, dein Bildaufbau bleiben. Lokal getestet auf einer RTX 3060 (12 GB) mit Flux Kontext GGUF, ohne Abo."
topic: KUNST & KI
level: "INTERMEDIATE"
readTime: "10 MIN"
image: "/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp"
date: 2026-07-14
---

![Foto in Ghibli-Stil umwandeln mit Flux Kontext – ein realistisches Porträt wird zur handgemalten Anime-Illustration, Gesicht und Bildaufbau bleiben gleich](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp)

# Foto in Ghibli-Stil umwandeln – kostenlos & lokal mit Flux Kontext (2026)

Zieh dein Foto in einen der viralen „Ghibli"-Generatoren – und du bekommst **eine hübsche Illustration von jemand anderem** zurück. Anderes Gesicht, andere Pose, oft hinter einem Abo oder einem Wasserzeichen. Für ein schnelles Meme okay, als Porträt von *dir* wertlos.

**Flux Kontext macht es umgekehrt: Es malt *dein* Foto neu – nicht ein neues.** Das Gesicht, die Haltung und der Bildaufbau bleiben erhalten, nur der Look kippt in den weichen, handgemalten Anime-Stil. Und das Beste: Du brauchst **kein spezielles Ghibli-Modell** und **kein Abo** – der Stil steckt komplett im Prompt.

Diese Anleitung zeigt den kompletten Weg – **lokal getestet auf einer RTX 3060 mit 12 GB VRAM**, kostenlos, ohne Cloud-Zwang.

> **Stand: Juli 2026** · ComfyUI (aktuell) · Flux.1 Kontext Dev als GGUF · Custom Node „ComfyUI-GGUF"

**Was dich erwartet:**

- Warum Kontext deinen Bildaufbau erhält – während Filter-Apps ihn neu erfinden
- Der Trick: Ghibli-Look **ohne** spezielles Ghibli-Modell
- Die 4 Modelldateien und **wohin genau** sie gehören
- Der Workflow in ComfyUI in 4 Schritten – mit dem GGUF-Trick für 12-GB-Karten
- Der richtige Ghibli-Prompt – und 4 weitere Anime-Looks aus demselben Foto
- Fixes, wenn das Ergebnis noch zu fotografisch aussieht

---

## Warum Kontext den Ghibli-Look besser trifft als ein Filter

Der entscheidende Begriff heißt **Bildkonditionierung**. Kontext bekommt dein Originalbild nicht als vage Beschreibung, sondern als **festen Bezugspunkt** (im Workflow der Node `ReferenceLatent`). Es rechnet die Stil-Änderung *auf dein Bild* – statt aus einem Textprompt ein komplett neues Bild zu würfeln.

Praktisch heißt das:

- **Gleiches Gesicht, gleiche Pose, gleicher Bildausschnitt** – nur der Malstil wechselt.
- Kein zufälliger Anime-Charakter, sondern erkennbar **du** (oder dein Motiv).
- Du kannst denselben Look auf eine ganze Fotoserie anwenden – konsistent, nicht jedes Mal anders.

**Der Clou:** „Ghibli-Stil" ist hier kein Modell, sondern eine **Prompt-Anweisung**. Du beschreibst den handgemalten Look – weiche Aquarell-Hintergründe, flache Cel-Schattierung, warme Farben – und Kontext legt ihn über dein Foto. Kein Extra-Download, keine LoRA, kein Abo.

![Vom Foto zum Ghibli-Bild in vier Schritten: Modelle laden, Foto und Stil-Prompt, Kontext-Sampling, fertige Illustration](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/04_workflow_diagram.webp)

---

## Voraussetzungen

| Was | Empfehlung |
|---|---|
| Grafikkarte | **NVIDIA mit ≥ 8 GB VRAM** (getestet auf RTX 3060/12 GB) |
| Software | ComfyUI (aktuelle Version) |
| Custom Node | **ComfyUI-GGUF** (für den GGUF-Loader) |
| Speicher | ~ 12 GB frei für die Modelldateien |

> 💡 **Tipp:** Wir nutzen bewusst die **GGUF-Variante** von Flux Kontext (`Q4_K_M`, ~6,8 GB). GGUF ist ein komprimiertes Format – so läuft ein 12-Milliarden-Parameter-Modell flüssig auf einer 12-GB-Karte, für die die volle `fp16`-Version (~24 GB) viel zu groß wäre.

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

## Schritt 2: Die vier Modelle herunterladen und einordnen

Flux Kontext besteht aus vier Bausteinen: dem Hauptmodell, zwei Text-Encodern und einem VAE. Es ist **exakt derselbe Stack** für jede Kontext-Bearbeitung – einmal einrichten, für alle Anleitungen der Reihe nutzen.

| Datei | Quelle | Ordner |
|---|---|---|
| `flux1-kontext-dev-Q4_K_M.gguf` | 🤗 HuggingFace: `QuantStack/FLUX.1-Kontext-dev-GGUF` | `models/unet/` |
| `t5xxl_fp8_e4m3fn.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/text_encoders/` |
| `clip_l.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/clip/` |
| `ae.safetensors` | 🤗 `black-forest-labs/FLUX.1-schnell` (VAE) | `models/vae/` |

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
    └── 📁 vae/
        └── ae.safetensors
```

![Wohin kommt welches Modell: unet, text_encoders, clip und vae mit den jeweiligen Dateien](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/05_model_folders.webp)

> 📌 **Hinweis:** Nach dem Kopieren ComfyUI **einmal neu starten**, sonst tauchen die Modelle in den Dropdowns nicht auf.

---

## Schritt 3: Den Kontext-Workflow laden – mit dem GGUF-Trick

Du baust nichts von Hand. ComfyUI bringt den Workflow als Vorlage mit:

1. Oben auf **Workflow → Browse Templates** klicken.
2. Kategorie **Flux** → **„Flux.1 Kontext Dev (Basic)"** wählen. Der komplette Graph lädt automatisch.
3. Jetzt der eine wichtige Handgriff für 12-GB-Karten: Den Node **„Load Diffusion Model"** löschen. Rechtsklick auf die Leinwand → **Add Node → bootleg → Unet Loader (GGUF)** → `flux1-kontext-dev-Q4_K_M.gguf` auswählen → den **MODEL**-Ausgang wieder mit dem KSampler verbinden.

Kurz prüfen, dass die restlichen Loader stimmen:

- **DualCLIPLoader** → `t5xxl_fp8_e4m3fn` + `clip_l`, `type`: **flux**
- **VAELoader** → `ae.safetensors`

> 🔑 **Merke:** Der Standard-Template lädt das volle Modell über „Load Diffusion Model". Genau dieser eine Node wird gegen **Unet Loader (GGUF)** getauscht – der Rest des Workflows bleibt identisch.

---

## Schritt 4: Foto laden, Ghibli-Prompt schreiben, generieren

**1. Foto laden.** Im **Load Image**-Node dein Quellfoto hochladen. Am besten funktioniert ein klares Porträt oder eine Landschaft mit gutem Licht.

**2. Stil-Prompt schreiben.** In den **positiven** Prompt den kompletten Look eintragen – auf Englisch trifft Flux den Stil am zuverlässigsten:

```
convert this photo into Studio Ghibli style anime, hand-painted illustration, soft cel shading, warm watercolor background, keep the same face, pose and composition
```

**3. Einstellungen setzen.** Die getesteten Werte für einen sauberen Stil-Transfer:

| Parameter | Wert | Warum |
|---|---|---|
| Sampler | `euler` | stabil für Flux |
| Scheduler | `simple` | Standard für Kontext |
| Steps | **8** | schnell & getestet; 20 für mehr Detail |
| Guidance | **3.0** | Stil-Transfer braucht etwas mehr Nachdruck als ein Objekt-Tausch |
| CFG | **1.0** | fix bei Flux |

**4. Generieren.** Auf **Queue Prompt** klicken.

> 🧪 **Ausprobieren:** Der **erste** Lauf dauert ~2 Minuten, weil das Modell in den Grafikspeicher geladen wird. Jede weitere Umwandlung liegt auf der RTX 3060 bei **~30–60 Sekunden** – ideal, um Prompts durchzuprobieren.

Ergebnis: aus deinem Foto wird eine handgemalte Illustration – **Gesicht, Pose und Bildaufbau bleiben, nur der Malstil ist neu.**

---

## Der richtige Ghibli-Prompt – und 4 weitere Anime-Looks

Der Stil steckt zu 100 % im Prompt. Drei Regeln:

- **Beschreibe die *Machart*, nicht nur „Ghibli".** Begriffe wie `hand-painted`, `soft cel shading`, `watercolor background`, `flat colors` lenken den Look zuverlässiger als der bloße Studioname.
- **Verankere das Motiv.** Ergänze `keep the same face, pose and composition`, damit Kontext nicht doch anfängt, dein Bild umzubauen.
- **Wird's zu fotografisch, sag es explizit:** `flat anime illustration, not photorealistic` schiebt das Ergebnis klar in Richtung Zeichnung.

Aus **einem** Foto holst du mit einem Prompt-Wechsel eine ganze Stil-Palette:

| Look | Prompt-Kern |
|---|---|
| Ghibli / Studio-Anime | `Studio Ghibli style, hand-painted, soft cel shading, watercolor background` |
| Shōnen / Action-Anime | `modern shonen anime style, bold lineart, dynamic cel shading, vibrant colors` |
| 90er-Retro-Anime | `1990s retro anime, film grain, muted palette, hand-drawn cels` |
| Pastell-Webtoon | `soft webtoon style, pastel colors, clean lineart, gentle shading` |
| Aquarell-Illustration | `watercolor illustration, visible brush strokes, soft edges, storybook look` |

> 💡 **Tipp:** Genau diese Fünfer-Palette ist die Basis für ein Profilbild-Set oder eine Sticker-Reihe – ein Motiv, fünf Stile, konsistent aus deinem eigenen Foto.

---

## Sieht noch nicht nach Ghibli aus? Schnelle Fixes

| Problem | Ursache | Lösung |
|---|---|---|
| Modelle nicht im Dropdown | ComfyUI nicht neu gestartet | ComfyUI neu starten |
| Node „Unet Loader (GGUF)" fehlt | ComfyUI-GGUF nicht installiert | Manager → ComfyUI-GGUF installieren |
| Ergebnis bleibt zu fotografisch | Guidance zu niedrig / Stil zu vage | Guidance auf **3.5–4.0**, `flat anime illustration, not photorealistic` ergänzen |
| Gesicht wird unkenntlich | Stil-Prompt zu dominant | `keep the same face and composition` ergänzen, Guidance leicht senken |
| Hintergrund matschig | Motiv zu klein/detailreich | Steps auf **20** erhöhen, Quellfoto in höherer Auflösung laden |
| Rote Nodes / Fehler | Datei im falschen Ordner | Ordner gemäß Tabelle oben prüfen |

---

## Keine 12-GB-Karte? Nimm die Cloud

Läuft deine GPU nicht mit oder fehlt der VRAM: Denselben Workflow startest du auf einer Cloud-GPU – eine **RTX 4090 (24 GB) ab ~0,59 $/h** rechnet Kontext in Sekunden und ohne Quant-Kompromiss. Die komplette Einrichtung steht in unserem Hub:

👉 **[ComfyUI auf RunPod einrichten (Network Volume)](/article/comfyui-auf-runpod)**

[[CLOUD_CTA]]

---

## Fazit & nächste Schritte

Der virale Ghibli-Look braucht kein Abo und kein Spezialmodell – nur Flux Kontext, den richtigen Prompt und dein eigenes Foto. Weil Kontext dein Motiv erhält statt es neu zu erfinden, bekommst du **dich im Ghibli-Stil**, nicht irgendeinen Charakter. Und dieselbe Technik trägt jeden Anime-Look, den du benennen kannst.

- 📥 **Download:** [Ghibli-Workflow als JSON herunterladen](/downloads/flux-kontext-ghibli-workflow.json) – in ComfyUI per **Workflow → Open** laden, Foto rein, generieren. Die fünf Anime-Stile (Ghibli, Shōnen, Retro, Webtoon & Aquarell) stehen als Prompt-Pack in der Tabelle oben.
- 🔗 **Grundlagen fehlen?** → [Flux.1 Dev mit ComfyUI installieren](/article/comfyui-flux-lokal-einrichten)
- ⏮️ **Aus der Reihe:** [Flux Kontext: Kleidung ändern in ComfyUI](/article/flux-kontext-kleidung-aendern-comfyui)
- ⏭️ **Als Nächstes:** „Flux Kontext: Hintergrund tauschen" und „Flux Kontext: Frisur ändern".

Ein Foto, ein Satz – und aus deinem Schnappschuss wird eine handgemalte Szene, die aussieht wie aus deinem Lieblingsfilm.
