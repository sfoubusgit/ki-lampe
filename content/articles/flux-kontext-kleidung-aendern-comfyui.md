---
title: "Flux Kontext: Kleidung ändern in ComfyUI – Outfit per Prompt tauschen (2026)"
description: "Tausche das Outfit auf einem Foto per Text – Gesicht, Pose und Hintergrund bleiben. Getestet lokal auf einer RTX 3060 (12 GB) mit Flux Kontext GGUF."
topic: KI-TOOLS
level: "INTERMEDIATE"
readTime: "9 MIN"
image: "/images/flux-kontext-kleidung-aendern-comfyui_article/01_explainer.webp"
date: 2026-07-13
---

![Flux Kontext: Kleidung ändern in ComfyUI – weißes T-Shirt wird per Prompt zur roten Lederjacke, Person und Hintergrund bleiben gleich](/images/flux-kontext-kleidung-aendern-comfyui_article/01_explainer.webp)

# Flux Kontext: Kleidung ändern in ComfyUI – Outfit per Prompt tauschen (2026)

Zieh ein Foto in ChatGPT und bitte um eine rote Lederjacke – du bekommst **eine neue Person** zurück. Anderes Gesicht, andere Pose, anderer Hintergrund. Für einen schnellen Entwurf okay, für alles andere unbrauchbar.

**Flux Kontext macht das Gegenteil: Es ändert nur, was du benennst.** Das weiße T-Shirt wird zur Lederjacke – Gesicht, Haltung, Jeans und Hintergrund bleiben Pixel für Pixel dieselben. Genau das ist der Unterschied zwischen „ein neues Bild" und „**dieses** Bild bearbeiten".

Diese Anleitung zeigt den kompletten Weg – **getestet lokal auf einer RTX 3060 mit 12 GB VRAM**, komplett kostenlos, ohne Cloud-Zwang.

> **Stand: Juli 2026** · ComfyUI (aktuell) · Flux.1 Kontext Dev als GGUF · Custom Node „ComfyUI-GGUF"

**Was dich erwartet:**

- Warum Kontext das Motiv erhält – und ChatGPT es neu erfindet
- Die 4 Modelldateien und **wohin genau** sie gehören
- Der Workflow in ComfyUI in 4 Schritten – mit dem GGUF-Trick für 12-GB-Karten
- Die richtige Prompt-Formulierung fürs Kleidungs-Tauschen
- Fixes, wenn sich das Outfit nicht ändert

---

## Kontext vs. „das hätte ChatGPT auch gekonnt"

Der entscheidende Begriff heißt **Bildkonditionierung**. Kontext bekommt dein Originalbild nicht als vage Beschreibung, sondern als **festen Bezugspunkt** (im Workflow der Node `ReferenceLatent`). Das Modell hält alles, was du nicht erwähnst, konstant und rechnet ausschließlich die benannte Änderung ein.

Praktisch heißt das:

- **Ein Foto, ein Prompt, eine Änderung** – kein Neuzeichnen der Person.
- Gesicht, Körperhaltung, Beleuchtung und Hintergrund bleiben erhalten.
- Du kannst dasselbe Bild mehrfach nacheinander bearbeiten (erst Jacke, dann Frisur, dann Hintergrund).

**Das ist der kreative Hebel:** Nicht „KI malt irgendwas", sondern präzise Bildregie. Produktfotos, Charakter-Varianten, Model-Shots ohne zweites Shooting – alles aus **einem** Ausgangsbild.

![Vom Foto zum Ergebnis in vier Schritten: Modelle laden, Bild und Prompt, Kontext-Sampling, Ergebnis](/images/flux-kontext-kleidung-aendern-comfyui_article/04_workflow_diagram.webp)

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

Flux Kontext besteht aus vier Bausteinen: dem Hauptmodell, zwei Text-Encodern und einem VAE.

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

![Wohin kommt welches Modell: unet, text_encoders, clip und vae mit den jeweiligen Dateien](/images/flux-kontext-kleidung-aendern-comfyui_article/05_model_folders.webp)

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

## Schritt 4: Bild laden, Prompt schreiben, generieren

**1. Bild laden.** Im **Load Image**-Node dein Quellfoto hochladen.

**2. Prompt schreiben.** In den **positiven** Prompt die Änderung eintragen – auf Englisch funktioniert Flux am zuverlässigsten:

```
change the white t-shirt into a red leather jacket
```

**3. Einstellungen setzen.** Die getesteten Werte für Kontext:

| Parameter | Wert | Warum |
|---|---|---|
| Sampler | `euler` | stabil für Flux |
| Scheduler | `simple` | Standard für Kontext |
| Steps | **8** | schnell & getestet; 20 für maximale Detailtreue |
| Guidance | **2.5** | Kontext-Standard – höher = wörtlichere Umsetzung |
| CFG | **1.0** | fix bei Flux |

**4. Generieren.** Auf **Queue Prompt** klicken.

> 🧪 **Ausprobieren:** Der **erste** Lauf dauert ~2 Minuten, weil das Modell in den Grafikspeicher geladen wird. Jede weitere Bearbeitung liegt auf der RTX 3060 bei **~30–60 Sekunden**.

Ergebnis: Das T-Shirt ist jetzt eine rote Lederjacke – **Gesicht, Pose, Jeans und Hintergrund unverändert.**

---

## Die richtige Formulierung: so tauschst du Kleidung sauber

Kontext ist präzise, wenn du präzise bist. Drei Regeln:

- **Benenne Kleidungsstück + Material + Farbe.** „a red leather jacket" schlägt „nice jacket" um Längen.
- **Eine Änderung pro Durchlauf.** Willst du Jacke **und** Hose ändern, mach zwei Läufe – so bleibt jeder Schritt kontrolliert.
- **Bei Drift explizit fixieren:** Hängt das Modell doch am Motiv, ergänze `keep the same face, pose and background`.

Ein paar erprobte Muster:

| Ziel | Prompt |
|---|---|
| Oberteil tauschen | `change the white t-shirt into a red leather jacket` |
| Kompletter Look | `replace the outfit with an elegant black evening dress` |
| Farbe eines Teils | `change the jacket color from red to navy blue` |
| Stil hinzufügen | `turn the hoodie into a denim jacket, keep the same pose` |

---

## Outfit ändert sich nicht? Schnelle Fixes

| Problem | Ursache | Lösung |
|---|---|---|
| Modelle nicht im Dropdown | ComfyUI nicht neu gestartet | ComfyUI neu starten |
| Node „Unet Loader (GGUF)" fehlt | ComfyUI-GGUF nicht installiert | Manager → ComfyUI-GGUF installieren |
| Kaum sichtbare Änderung | Guidance zu niedrig | Guidance auf **3.0–3.5** erhöhen |
| Gesicht/Person verändert sich | Prompt zu offen | `keep the same face and background` ergänzen |
| Rote Nodes / Fehler | Datei im falschen Ordner | Ordner gemäß Tabelle oben prüfen |

---

## Keine 12-GB-Karte? Nimm die Cloud

Läuft deine GPU nicht mit oder fehlt der VRAM: Denselben Workflow startest du auf einer Cloud-GPU – eine **RTX 4090 (24 GB) ab ~0,59 $/h** rechnet Kontext in Sekunden und ohne Quant-Kompromiss. Die komplette Einrichtung steht in unserem Hub:

👉 **[ComfyUI auf RunPod einrichten (Network Volume)](/article/comfyui-auf-runpod)**

[[CLOUD_CTA]]

---

## Fazit & nächste Schritte

Flux Kontext ist keine Bild-**Generierung**, sondern Bild-**Regie**: Du behältst dein Motiv und tauschst gezielt einzelne Elemente. Das Kleidungs-Tauschen ist der einfachste Einstieg – dieselbe Technik trägt Frisuren, Hintergründe und Produktvarianten.

- 📥 **Download:** Den fertigen Workflow als JSON gibt's am Ende des Artikels – in ComfyUI per **Workflow → Export** erzeugt und einsatzbereit.
- 🔗 **Grundlagen fehlen?** → [Flux.1 Dev mit ComfyUI installieren](/article/comfyui-flux-lokal-einrichten)
- ⏭️ **Als Nächstes in der Reihe:** „Flux Kontext: Frisur ändern" und „Flux Kontext: Hintergrund tauschen".

Ein Foto, ein Satz, ein neues Outfit – und der Rest bleibt genau so, wie er war.
