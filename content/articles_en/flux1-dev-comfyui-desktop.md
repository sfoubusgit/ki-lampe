---
title: "Flux 1 Dev: Installation Tutorial for ComfyUI"
description: "A structured step-by-step guide for Flux 1 Dev with direct download links and a desktop workflow."
topic: "AI"
level: "BEGINNER"
readTime: "8 MIN"
image: "/images/flux_dev_tutorial_image.webp"
date: 2026-01-15
---

# Flux 1 Dev: Installation Tutorial for ComfyUI

In 2026, ComfyUI can be installed without terminals or manual Python setup. The official Desktop App handles dependencies, updates, and includes ComfyUI-Manager by default.

This guide follows a clear structure and stays fully graphical from download to first image.

## Quickstart

- Install the ComfyUI Desktop App
- Download the Flux 1 Dev model files and place them
- Load a workflow and run your first prompt

---

## Why the Desktop App?

- No command line, Git, or pip
- Automatic Python and PyTorch setup
- ComfyUI-Manager included
- Clean, isolated installation

## Requirements

- **Windows**: 10 or 11 (macOS works similarly)
- **GPU**: NVIDIA recommended
- **VRAM**: at least 8 GB, ideally 12-16 GB

---

## Step 1: Install ComfyUI Desktop

Official download page:
https://www.comfy.org/download

1. Select Windows (or macOS)
2. Download the installer
3. Run it and keep the default install path
4. Let the installer fetch dependencies (5-15 minutes)

After install, ComfyUI appears in the Start Menu or on the desktop.

---

## Step 2: First Launch

On first start, the app:

- Launches the ComfyUI server
- Opens your browser at `http://127.0.0.1:8188`

If no tab opens, paste the URL into your browser. The Manager button should be visible on the right.

---

## Step 3: Download Flux 1 Dev Models

### Download checklist (direct links)

Main model (`models/diffusion_models/`):

- `flux1-dev-fp8.safetensors`  
  https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/flux1-dev-fp8.safetensors

Text encoders (`models/clip/`):

- `clip_l.safetensors`  
  https://huggingface.co/comfyanonymous/flux_text_encoders/resolve/main/clip_l.safetensors
- `t5xxl_fp8_e4m3fn.safetensors`  
  https://huggingface.co/comfyanonymous/t5xxl_fp8_e4m3fn/resolve/main/t5xxl_fp8_e4m3fn.safetensors

VAE (`models/vae/`):

- `ae.safetensors`  
  https://huggingface.co/Comfy-Org/flux1-dev/resolve/main/ae.safetensors

Download the files from Hugging Face.

---

## Step 4: Place Models in the Right Folders

Default models folder:

```
C:\Users\YourName\AppData\Local\Programs\ComfyUI\models
```

Create these subfolders if needed:

- `clip`
- `vae`
- `diffusion_models` (or `unet`)

Place the files:

Text encoders (`models/clip/`):

- `clip_l.safetensors`
- `t5xxl_fp8_e4m3fn.safetensors`

VAE (`models/vae/`):

- `ae.safetensors`

Main model (`models/diffusion_models/`):

- `flux1-dev-fp8.safetensors`

Drag the files into the matching folders. Restart ComfyUI afterward so the model lists refresh.

---

## Step 5: Load a Flux Workflow

Examples:
https://comfyanonymous.github.io/ComfyUI_examples/flux/

1. Pick a Flux Dev text-to-image workflow
2. Drag the example image or JSON file into the ComfyUI canvas

---

## Step 6: Configure the Workflow

Diffusion model:

- Select `flux1-dev-fp8.safetensors`
- Set `weight_dtype` to `fp8` if available

CLIP / DualCLIP Loader:

- `clip_l.safetensors`
- `t5xxl_fp8_e4m3fn.safetensors`

VAE Loader:

- `ae.safetensors`

Recommended starting values:

- Steps: 20-50
- Guidance: about 3.5
- CFG: 1.0

---

## Step 7: Run a Prompt

Enter a clear, specific prompt and click **Queue Prompt**. The output appears in the app's default output folder.

---

## Notes

- The Desktop App keeps ComfyUI updated.
- Missing nodes can be installed via the Manager panel.
- FP8 models work well with 12-16 GB VRAM.
- If models do not show up, restart the app.

---

## Troubleshooting

### Models not listed

- Verify folder paths
- Restart the app

### Out of memory

- Lower resolution (e.g., 768 x 768)
- Reduce Steps
- Run again

---

## Conclusion

Flux 1 Dev runs locally without a terminal or manual Python setup. Once the models are in the right folders, the workflow is stable and repeatable.

---

## FAQ

### Do I need Git or pip?

No. The Desktop App installs everything automatically.

### Which files are required?

One main model, two text encoders, and one VAE. The four files above are the minimal set.
