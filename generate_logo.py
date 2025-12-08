#!/usr/bin/env python3
"""Generate KI.LAMPE logo as PNG"""

try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    # Image dimensions
    WIDTH, HEIGHT = 1200, 400
    BG_COLOR = (0, 0, 0, 0)  # Transparent background
    
    # Create image
    img = Image.new('RGBA', (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Font settings
    FONT_SIZE = 160
    font = None
    
    # Try to load a system font
    font_paths = [
        'C:/Windows/Fonts/arialbd.ttf',  # Arial Bold
        'C:/Windows/Fonts/arial.ttf',    # Arial Regular
        'C:/Windows/Fonts/calibrib.ttf', # Calibri Bold
    ]
    
    for path in font_paths:
        if os.path.exists(path):
            try:
                font = ImageFont.truetype(path, FONT_SIZE)
                print(f"Loaded font: {path}")
                break
            except Exception as e:
                print(f"Could not load {path}: {e}")
                continue
    
    if font is None:
        print("Warning: Using default font")
        font = ImageFont.load_default()
    
    # Colors (RGB)
    WHITE = (255, 255, 255)
    AMBER = (251, 191, 36)  # #fbbf24
    
    # Starting position
    x, y = 100, 120
    
    # Draw "KI" in white
    ki_text = "KI"
    draw.text((x, y), ki_text, fill=WHITE, font=font)
    
    # Calculate next position
    bbox = draw.textbbox((x, y), ki_text, font=font)
    x = bbox[2] + 5  # Small spacing
    
    # Draw "." in amber
    dot_text = "."
    draw.text((x, y), dot_text, fill=AMBER, font=font)
    
    # Calculate next position
    bbox = draw.textbbox((x, y), dot_text, font=font)
    x = bbox[2] + 5  # Small spacing
    
    # Draw "LAMPE" in white
    lampe_text = "LAMPE"
    draw.text((x, y), lampe_text, fill=WHITE, font=font)
    
    # Save to desktop
    desktop = os.path.join(os.path.expanduser("~"), "Desktop", "KI_LAMPE_logo.png")
    img.save(desktop, "PNG")
    
    print(f"\n✓ Logo created successfully!")
    print(f"✓ Saved to: {desktop}")
    print(f"✓ Size: {WIDTH}x{HEIGHT} pixels")
    
except ImportError:
    print("ERROR: PIL/Pillow not installed.")
    print("Install with: pip install Pillow")
except Exception as e:
    print(f"ERROR: {e}")
    import traceback
    traceback.print_exc()


