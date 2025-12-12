# Stable Diffusion Prompt: Hero-Image für Blog-Artikel

## Artikel: "Stable Diffusion auf CPU nutzen: Komplette Anleitung ohne GPU"

### Optimierter Prompt für Stable Diffusion WebUI

**Haupt-Prompt:**
```
professional product photography of modern laptop computer displaying Stable Diffusion WebUI interface on screen, CPU processor visualization with glowing orange and cyan circuit patterns, warm color palette (orange #FF6B35, cyan #4ECDC4, violet #9B59B6), futuristic tech aesthetic, clean minimalist digital interface showing image generation progress bar, neon light effects, holographic UI elements displaying "CPU Mode" and "No GPU Required" text, friendly anime-style character silhouette working on laptop with satisfied expression, cinematic composition, 16:9 aspect ratio, high detail, warm and inspiring atmosphere, technological yet accessible, soft professional lighting, depth of field, sharp focus on laptop screen, modern workspace background, professional photography style, 1200x630
```

**Negative Prompt:**
```
blurry, low quality, distorted, artifacts, bad anatomy, deformed, ugly, pixelated, watermark, signature, text overlay blocking important elements, GPU graphics card visible, expensive hardware, dark gloomy atmosphere, complex cluttered background, noise, grainy, oversaturated, cartoon style, unrealistic proportions
```

### Empfohlene Einstellungen für CPU-Nutzung

**Basis-Einstellungen:**
- **Sampling Steps:** 25-30 (optimal für CPU)
- **Sampler:** Euler a (schnell) oder DPM++ 2M (bessere Qualität)
- **CFG Scale:** 7-9
- **Width:** 1200
- **Height:** 630
- **Seed:** -1 (zufällig) oder spezifischer Seed für Wiederholbarkeit

**Erweiterte Einstellungen:**
- **Hires Fix:** Deaktiviert (für CPU-Performance)
- **Denoising Strength:** 0.5-0.7 (falls Hires Fix verwendet wird)
- **Upscaler:** Keiner (für CPU-Performance)

### Alternative Prompts (Variationen)

#### Variante 1: Minimalistisch (schneller zu generieren)
```
modern laptop with Stable Diffusion WebUI interface, CPU icon glowing orange and cyan, minimalist tech design, warm lighting, professional photography, 16:9, high quality, sharp focus
Negative: blurry, low quality, GPU, expensive hardware, dark atmosphere
```

#### Variante 2: Mit Person (emotionaler)
```
person using laptop with Stable Diffusion WebUI, CPU visualization with circuit patterns in warm colors (orange, cyan, violet), satisfied expression, modern workspace, inspiring atmosphere, professional photography, 16:9, high detail, accessible technology theme
Negative: blurry, low quality, GPU graphics card, expensive hardware, dark gloomy
```

#### Variante 3: Interface-Fokus (technisch)
```
Stable Diffusion WebUI interface on laptop screen, CPU performance metrics displayed as holographic elements, warm color scheme (orange, cyan, violet), modern tech aesthetic, professional product photography, 16:9 aspect ratio, high quality, inspiring and accessible
Negative: blurry, low quality, GPU, expensive hardware, dark atmosphere, text overlay
```

### Für verschiedene Modelle

#### Stable Diffusion 1.5 (Empfohlen für CPU)
```
professional product photography, modern laptop displaying Stable Diffusion WebUI interface, CPU processor visualization with glowing orange and cyan circuit patterns, warm color palette (orange, cyan, violet), futuristic tech aesthetic, clean digital interface showing image generation progress, neon light effects, holographic UI elements, friendly anime-style character, cinematic composition, 16:9 aspect ratio, high detail, warm inspiring atmosphere, professional photography style, depth of field, sharp focus, 1200x630
Negative: blurry, low quality, distorted, artifacts, GPU graphics card, expensive hardware, dark gloomy atmosphere, watermark, text overlay
```

#### Stable Diffusion XL (SDXL) - nur wenn verfügbar
```
Professional product photography of a modern laptop computer displaying Stable Diffusion WebUI interface on screen. CPU processor visualization with glowing orange and cyan circuit patterns. Warm color palette (orange, cyan, violet). Futuristic tech aesthetic with clean minimalist digital interface showing image generation progress. Neon light effects and holographic UI elements displaying "CPU Mode". Friendly anime-style character silhouette. Cinematic composition, 16:9 aspect ratio, high detail, warm and inspiring atmosphere, technological yet accessible, soft professional lighting, depth of field, sharp focus on laptop screen, modern workspace background, 1200x630
Negative: blurry, low quality, distorted, artifacts, GPU graphics card, expensive hardware, dark gloomy atmosphere, watermark, signature, text overlay, noise, grainy
```

### Optimierungen für CPU-Performance

**Wenn die Generierung zu langsam ist:**
1. Reduziere Sampling Steps auf 20-25
2. Nutze Euler a Sampler (schnellster)
3. Generiere zuerst 512x512, dann mit img2img auf 1200x630 hochskalieren
4. Nutze weniger detaillierte Prompts (Variante 1)

**Workflow für CPU:**
1. Generiere 512x512 mit Haupt-Prompt (2-3 Minuten)
2. Wähle beste Variante
3. Nutze img2img mit 0.3-0.5 Denoising Strength
4. Upscale auf 1200x630 (kann mit WebUI-Upscaler oder externem Tool)

### Post-Production

Nach der Generierung:
1. **Bildgröße:** Exakt 1200x630px für Blog-Hero
2. **Farbanpassung:** Warme Farben (Orange, Cyan, Violett) verstärken
3. **Kontrast:** Für bessere Lesbarkeit optimieren
4. **Text-Overlay (optional):** Titel des Artikels hinzufügen
5. **Format:** WebP oder optimiertes PNG für Web

### Verwendung im Artikel

Das generierte Bild sollte im Frontmatter verwendet werden:

```yaml
image: '/images/stable-diffusion-cpu-hero.webp'
```

Oder direkt im `public/images/` Ordner speichern und referenzieren.

### Tipps für beste Ergebnisse

1. **Mehrere Varianten generieren:** Teste 3-5 Varianten und wähle die beste
2. **Seed verwenden:** Wenn du eine gute Variante findest, nutze den Seed für ähnliche Ergebnisse
3. **Inpaint nutzen:** Falls kleine Details fehlen, nutze Inpaint für Korrekturen
4. **Farben anpassen:** Post-Production für konsistente Farbpalette
5. **Text hinzufügen:** Optional Titel-Overlay in Post-Production

### Beispiel-Workflow

1. **Prompt eingeben** (Haupt-Prompt)
2. **Einstellungen setzen:** 25 Steps, Euler a, 512x512
3. **Generieren** (2-3 Minuten auf CPU)
4. **Beste Variante wählen**
5. **Img2Img:** 1200x630, Denoising 0.4
6. **Post-Production:** Farben, Kontrast, optional Text

---

**Viel Erfolg bei der Bildgenerierung! 🎨**






