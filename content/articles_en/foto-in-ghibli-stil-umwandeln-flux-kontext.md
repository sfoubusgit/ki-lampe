---
title: "Turn Any Photo into Ghibli Style – Free & Local with Flux Kontext (2026)"
description: "Turn any photo into the hand-painted Ghibli look – your face, pose and composition stay. Tested locally on an RTX 3060 (12 GB) with Flux Kontext GGUF, no subscription."
topic: KUNST & KI
level: "INTERMEDIATE"
readTime: "10 MIN"
image: "/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp"
date: 2026-07-14
---

![Turn a photo into Ghibli style with Flux Kontext – a realistic portrait becomes a hand-painted anime illustration while the face and composition stay the same](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/01_explainer.webp)

# Turn Any Photo into Ghibli Style – Free & Local with Flux Kontext (2026)

Drop your photo into one of the viral "Ghibli" generators and you get back **a pretty illustration of someone else**. Different face, different pose, often behind a subscription or a watermark. Fine for a quick meme, worthless as a portrait of *you*.

**Flux Kontext does the opposite: it repaints *your* photo – not a new one.** The face, the pose and the composition stay put; only the look flips into that soft, hand-painted anime style. Best part: you need **no special Ghibli model** and **no subscription** – the style lives entirely in the prompt.

This guide walks the whole path – **tested locally on an RTX 3060 with 12 GB of VRAM**, free, no cloud required.

> **Updated: July 2026** · ComfyUI (current) · Flux.1 Kontext Dev as GGUF · Custom node "ComfyUI-GGUF"

**What you'll get:**

- Why Kontext keeps your composition – while filter apps reinvent it
- The trick: the Ghibli look **without** a dedicated Ghibli model
- The 4 model files and **exactly where** they go
- The ComfyUI workflow in 4 steps – with the GGUF trick for 12 GB cards
- The right Ghibli prompt – plus 4 more anime looks from the same photo
- Fixes for when the result still looks too photographic

---

## Why Kontext nails the Ghibli look better than a filter

The key term is **image conditioning**. Kontext gets your original image not as a vague description but as a **fixed reference point** (the `ReferenceLatent` node in the workflow). It applies the style change *to your image* – instead of rolling a brand-new picture from a text prompt.

In practice:

- **Same face, same pose, same framing** – only the painting style changes.
- Not a random anime character, but recognizably **you** (or your subject).
- You can apply the exact look to a whole photo series – consistent, not different every time.

**The clever bit:** "Ghibli style" here isn't a model, it's a **prompt instruction**. You describe the hand-painted look – soft watercolor backgrounds, flat cel shading, warm colors – and Kontext lays it over your photo. No extra download, no LoRA, no subscription.

![From photo to Ghibli image in four steps: load models, photo and style prompt, Kontext sampling, finished illustration](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/04_workflow_diagram.webp)

---

## Requirements

| What | Recommendation |
|---|---|
| Graphics card | **NVIDIA with ≥ 8 GB VRAM** (tested on RTX 3060/12 GB) |
| Software | ComfyUI (current version) |
| Custom node | **ComfyUI-GGUF** (for the GGUF loader) |
| Storage | ~ 12 GB free for the model files |

> 💡 **Tip:** We deliberately use the **GGUF variant** of Flux Kontext (`Q4_K_M`, ~6.8 GB). GGUF is a compressed format – so a 12-billion-parameter model runs smoothly on a 12 GB card, where the full `fp16` version (~24 GB) would be far too large.

> ⚠️ **Warning:** ComfyUI Desktop and the portable version **do not** share models. Put the files in the `models` folder of the version you actually launch.

[[CLOUD_CTA]]

---

## Step 1: Install the custom node "ComfyUI-GGUF"

The GGUF loader isn't a default node – it comes via the Manager:

1. Start ComfyUI → click **Manager** on the right.
2. Open **Custom Nodes Manager** → search for **`ComfyUI-GGUF`** → **Install**.
3. **Fully restart** ComfyUI.

Without this step, the "Unet Loader (GGUF)" node is missing later and the workflow stays red.

---

## Step 2: Download the four models and place them right

Flux Kontext has four parts: the main model, two text encoders and a VAE. It's the **exact same stack** for every Kontext edit – set it up once, reuse it across the whole series.

| File | Source | Folder |
|---|---|---|
| `flux1-kontext-dev-Q4_K_M.gguf` | 🤗 HuggingFace: `QuantStack/FLUX.1-Kontext-dev-GGUF` | `models/unet/` |
| `t5xxl_fp8_e4m3fn.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/text_encoders/` |
| `clip_l.safetensors` | 🤗 `comfyanonymous/flux_text_encoders` | `models/clip/` |
| `ae.safetensors` | 🤗 `black-forest-labs/FLUX.1-schnell` (VAE) | `models/vae/` |

The folder structure then looks like this:

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

![Which model goes where: unet, text_encoders, clip and vae with their respective files](/images/foto-in-ghibli-stil-umwandeln-flux-kontext_article/05_model_folders.webp)

> 📌 **Note:** After copying, **restart ComfyUI once**, otherwise the models won't show up in the dropdowns.

---

## Step 3: Load the Kontext workflow – with the GGUF trick

You build nothing by hand. ComfyUI ships the workflow as a template:

1. Click **Workflow → Browse Templates** at the top.
2. Category **Flux** → pick **"Flux.1 Kontext Dev (Basic)"**. The full graph loads automatically.
3. Now the one important move for 12 GB cards: delete the **"Load Diffusion Model"** node. Right-click the canvas → **Add Node → bootleg → Unet Loader (GGUF)** → select `flux1-kontext-dev-Q4_K_M.gguf` → reconnect the **MODEL** output to the KSampler.

Quickly check the remaining loaders:

- **DualCLIPLoader** → `t5xxl_fp8_e4m3fn` + `clip_l`, `type`: **flux**
- **VAELoader** → `ae.safetensors`

> 🔑 **Remember:** The default template loads the full model via "Load Diffusion Model". That single node gets swapped for **Unet Loader (GGUF)** – the rest of the workflow stays identical.

---

## Step 4: Load photo, write the Ghibli prompt, generate

**1. Load photo.** Upload your source photo in the **Load Image** node. A clear portrait or a well-lit landscape works best.

**2. Write the style prompt.** Put the whole look in the **positive** prompt – Flux hits the style most reliably in English:

```
convert this photo into Studio Ghibli style anime, hand-painted illustration, soft cel shading, warm watercolor background, keep the same face, pose and composition
```

**3. Set the parameters.** The tested values for a clean style transfer:

| Parameter | Value | Why |
|---|---|---|
| Sampler | `euler` | stable for Flux |
| Scheduler | `simple` | standard for Kontext |
| Steps | **8** | fast & tested; 20 for more detail |
| Guidance | **3.0** | a style transfer needs a bit more push than an object swap |
| CFG | **1.0** | fixed for Flux |

**4. Generate.** Click **Queue Prompt**.

> 🧪 **Try it:** The **first** run takes ~2 minutes because the model loads into VRAM. Every further conversion runs at **~30–60 seconds** on the RTX 3060 – perfect for iterating on prompts.

Result: your photo becomes a hand-painted illustration – **face, pose and composition stay, only the painting style is new.**

---

## The right Ghibli prompt – plus 4 more anime looks

The style is 100% in the prompt. Three rules:

- **Describe the *craft*, not just "Ghibli".** Terms like `hand-painted`, `soft cel shading`, `watercolor background`, `flat colors` steer the look more reliably than the studio name alone.
- **Anchor the subject.** Add `keep the same face, pose and composition` so Kontext doesn't start rebuilding your image.
- **If it stays too photographic, say so:** `flat anime illustration, not photorealistic` pushes the result clearly toward a drawing.

From **one** photo you pull a whole style palette with a single prompt swap:

| Look | Prompt core |
|---|---|
| Ghibli / studio anime | `Studio Ghibli style, hand-painted, soft cel shading, watercolor background` |
| Shōnen / action anime | `modern shonen anime style, bold lineart, dynamic cel shading, vibrant colors` |
| 90s retro anime | `1990s retro anime, film grain, muted palette, hand-drawn cels` |
| Pastel webtoon | `soft webtoon style, pastel colors, clean lineart, gentle shading` |
| Watercolor illustration | `watercolor illustration, visible brush strokes, soft edges, storybook look` |

> 💡 **Tip:** This five-style palette is the basis for a profile-picture set or a sticker line – one subject, five styles, consistent from your own photo.

---

## Doesn't look like Ghibli yet? Quick fixes

| Problem | Cause | Fix |
|---|---|---|
| Models not in dropdown | ComfyUI not restarted | restart ComfyUI |
| "Unet Loader (GGUF)" node missing | ComfyUI-GGUF not installed | Manager → install ComfyUI-GGUF |
| Result stays too photographic | guidance too low / style too vague | raise guidance to **3.5–4.0**, add `flat anime illustration, not photorealistic` |
| Face becomes unrecognizable | style prompt too dominant | add `keep the same face and composition`, lower guidance slightly |
| Muddy background | subject too small/detailed | raise steps to **20**, load the source photo at higher resolution |
| Red nodes / errors | file in the wrong folder | check folders per the table above |

---

## No 12 GB card? Use the cloud

If your GPU won't keep up or lacks VRAM: run the exact same workflow on a cloud GPU – an **RTX 4090 (24 GB) from ~$0.59/h** renders Kontext in seconds and with no quant compromise. The full setup is in our hub:

👉 **[Set up ComfyUI on RunPod (Network Volume)](/article/comfyui-auf-runpod)**

[[CLOUD_CTA]]

---

## Conclusion & next steps

The viral Ghibli look needs no subscription and no special model – just Flux Kontext, the right prompt and your own photo. Because Kontext preserves your subject instead of reinventing it, you get **yourself in Ghibli style**, not some random character. And the same technique carries any anime look you can name.

- 📥 **Download:** [Get the Ghibli workflow as JSON](/downloads/flux-kontext-ghibli-workflow.json) – load it in ComfyUI via **Workflow → Open**, drop in your photo, generate. The five anime styles (Ghibli, Shōnen, retro, webtoon & watercolor) are the prompt pack in the table above.
- 🔗 **Missing the basics?** → [Install Flux.1 Dev with ComfyUI](/article/comfyui-flux-lokal-einrichten)
- ⏮️ **From the series:** [Flux Kontext: Change Clothes in ComfyUI](/article/flux-kontext-kleidung-aendern-comfyui)
- ⏭️ **Up next:** "Flux Kontext: Swap the Background" and "Flux Kontext: Change Hairstyle".

One photo, one sentence – and your snapshot becomes a hand-painted scene that looks straight out of your favorite film.
