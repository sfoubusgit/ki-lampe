from PIL import Image, ImageDraw, ImageFont
import os

# Create image
img = Image.new('RGBA', (1000, 300), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Font
try:
    font = ImageFont.truetype('arial.ttf', 140) or ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 140)
except:
    font = ImageFont.load_default()

# Colors
white = (255, 255, 255)
amber = (251, 191, 36)

# Draw text
x, y = 50, 80
draw.text((x, y), "KI", fill=white, font=font)
bbox = draw.textbbox((x, y), "KI", font=font)
x += bbox[2] - bbox[0]
draw.text((x, y), ".", fill=amber, font=font)
bbox = draw.textbbox((x, y), ".", font=font)
x += bbox[2] - bbox[0]
draw.text((x, y), "LAMPE", fill=white, font=font)

# Save
desktop = os.path.join(os.path.expanduser("~"), "Desktop", "KI_LAMPE_logo.png")
img.save(desktop, "PNG")
print(f"Logo saved to {desktop}")


