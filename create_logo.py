#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from PIL import Image, ImageDraw, ImageFont
import os
import sys

def create_logo():
    try:
        # Create a logo image with transparent background
        width, height = 1000, 300
        image = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        draw = ImageDraw.Draw(image)

        # Try to load a bold font
        font_size = 140
        font = None
        
        # Common Windows font paths
        font_paths = [
            'C:/Windows/Fonts/arialbd.ttf',
            'C:/Windows/Fonts/calibrib.ttf',
            'C:/Windows/Fonts/seguiemj.ttf',
            'C:/Windows/Fonts/arial.ttf',
        ]
        
        for path in font_paths:
            if os.path.exists(path):
                try:
                    font = ImageFont.truetype(path, font_size)
                    print(f"Using font: {path}")
                    break
                except:
                    continue
        
        if font is None:
            print("Warning: Using default font")
            font = ImageFont.load_default()

        # Colors
        white = (255, 255, 255, 255)
        amber = (251, 191, 36, 255)  # #fbbf24 - amber color

        # Draw text parts separately for better control
        x_start = 50
        y = 80
        
        # Draw "KI" in white
        ki_text = "KI"
        draw.text((x_start, y), ki_text, fill=white, font=font)
        
        # Get width of "KI" to position the dot
        ki_bbox = draw.textbbox((x_start, y), ki_text, font=font)
        ki_width = ki_bbox[2] - ki_bbox[0]
        
        # Draw "." in amber
        dot_x = x_start + ki_width
        dot_text = "."
        draw.text((dot_x, y), dot_text, fill=amber, font=font)
        
        # Get width of "." to position "LAMPE"
        dot_bbox = draw.textbbox((dot_x, y), dot_text, font=font)
        dot_width = dot_bbox[2] - dot_bbox[0]
        
        # Draw "LAMPE" in white
        lampe_x = dot_x + dot_width
        lampe_text = "LAMPE"
        draw.text((lampe_x, y), lampe_text, fill=white, font=font)

        # Save as PNG
        desktop_path = os.path.join(os.path.expanduser("~"), "Desktop", "KI_LAMPE_logo.png")
        image.save(desktop_path, "PNG")
        print(f"✓ Logo successfully created!")
        print(f"✓ Saved to: {desktop_path}")
        return desktop_path
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    create_logo()


