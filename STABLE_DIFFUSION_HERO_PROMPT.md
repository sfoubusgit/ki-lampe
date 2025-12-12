# Stable Diffusion Prompt für Hero-Image

## Artikel: "Stable Diffusion auf CPU nutzen: Komplette Anleitung ohne GPU"

### Haupt-Prompt (für Stable Diffusion WebUI)

```
a modern laptop computer running Stable Diffusion interface on screen, CPU processor visualization with glowing circuit patterns, warm color palette (orange, cyan, violet), futuristic tech aesthetic, clean digital interface showing image generation progress, neon light effects, holographic design elements displaying "Stable Diffusion", "CPU Mode", "No GPU Needed", friendly anime-style character with satisfied expression working on laptop, cinematic composition, 16:9 aspect ratio, high detail, warm and inspiring atmosphere, technological yet accessible, soft lighting, focus on accessibility and efficiency, showing that high-quality AI image generation works on any hardware, professional photography style, depth of field, sharp focus on laptop screen
```

### Negative Prompt

```
blurry, low quality, distorted, artifacts, bad anatomy, deformed, ugly, pixelated, watermark, signature, text overlay, GPU graphics card, expensive hardware, dark gloomy atmosphere, complex cluttered background
```

### Empfohlene Einstellungen

**Für CPU-Nutzung optimiert:**
- **Sampling Steps:** 25-30
- **Sampler:** Euler a oder DPM++ 2M
- **CFG Scale:** 7-9
- **Width:** 1200
- **Height:** 630 (für Blog-Hero-Format)
- **Seed:** -1 (zufällig) oder spezifischer Seed für Konsistenz

### Alternative Prompts (Variationen)

#### Variante 1: Fokus auf Laptop + Interface
```
professional photography of modern laptop displaying Stable Diffusion WebUI interface, CPU processor icon glowing with orange and cyan light, minimalist tech setup, warm ambient lighting, futuristic but accessible design, 16:9 ratio, high quality, sharp focus, cinematic depth of field
```

#### Variante 2: Fokus auf Zugänglichkeit
```
inspiring tech scene: person using laptop with Stable Diffusion running, CPU visualization with circuit patterns in warm colors (orange, cyan, violet), "No GPU Required" text element, modern workspace, friendly atmosphere, professional photography, 16:9, high detail, accessible technology theme
```

#### Variante 3: Fokus auf Performance-Visualisierung
```
futuristic laptop screen showing Stable Diffusion image generation in progress, CPU performance metrics displayed as glowing holographic elements, warm color scheme (orange, cyan, violet), modern tech aesthetic, professional product photography, 16:9 aspect ratio, high quality, inspiring and accessible
```

### Für verschiedene Stable Diffusion Modelle

#### Stable Diffusion 1.5 / 1.4
```
a modern laptop computer running Stable Diffusion interface on screen, CPU processor visualization with glowing circuit patterns, warm color palette (orange, cyan, violet), futuristic tech aesthetic, clean digital interface showing image generation progress, neon light effects, holographic design elements, friendly anime-style character, cinematic composition, 16:9 aspect ratio, high detail, warm and inspiring atmosphere, professional photography style, depth of field
Negative: blurry, low quality, distorted, artifacts, GPU graphics card, expensive hardware, dark gloomy atmosphere
```

#### SDXL (wenn verfügbar)
```
Professional product photography of a modern laptop displaying Stable Diffusion WebUI interface, CPU processor visualization with glowing orange and cyan circuit patterns, futuristic tech aesthetic, clean minimalist design, warm ambient lighting, holographic UI elements showing "CPU Mode", accessible technology theme, inspiring atmosphere, 16:9 aspect ratio, high detail, sharp focus, cinematic composition
Negative: blurry, low quality, distorted, artifacts, GPU graphics card, expensive hardware, dark gloomy atmosphere, text overlay, watermark
```

### Midjourney Alternative (falls gewünscht)

```
modern laptop running Stable Diffusion interface, CPU visualization with glowing circuit patterns, warm colors orange cyan violet, futuristic tech aesthetic, clean digital interface, neon light effects, holographic design, professional photography, 16:9 aspect ratio, high detail, warm inspiring atmosphere, accessible technology --ar 16:9 --style raw --v 6
```

### DALL·E 3 Alternative (falls gewünscht)

```
A professional product photography style image of a modern laptop computer displaying a Stable Diffusion WebUI interface. The screen shows an image generation in progress with CPU performance metrics visualized as glowing orange and cyan circuit patterns. The scene has a futuristic tech aesthetic with warm ambient lighting. The design emphasizes accessibility and shows that high-quality AI image generation works on any hardware. 16:9 aspect ratio, high detail, cinematic composition.
```

### Post-Production Tipps

Nach der Generierung:
1. **Bildgröße anpassen:** Auf 1200x630px für Blog-Hero
2. **Text-Overlay hinzufügen:** Optional Titel oder "CPU Mode" Text
3. **Farbanpassung:** Warme Farben (Orange, Cyan, Violett) verstärken
4. **Kontrast optimieren:** Für bessere Lesbarkeit bei Text-Overlays
5. **Format:** PNG oder WebP für Web-Optimierung

### Verwendung im Artikel

Das generierte Bild sollte im Frontmatter des Artikels verwendet werden:

```yaml
image: '/images/stable-diffusion-cpu-hero.png'
```

Oder als Unsplash-Alternative:
```yaml
image: 'https://images.unsplash.com/photo-[ID]?w=1200&h=630&fit=crop'
```






