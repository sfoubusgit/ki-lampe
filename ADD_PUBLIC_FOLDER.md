# Add Public Folder to Repository

## Problem
The `public` folder is not in the GitHub repository, so images aren't being deployed to Vercel.

## Solution
The `public` folder needs to be added to git. Run these commands manually:

```powershell
cd c:\Users\Sina\Desktop\ki-lampe
git add public/images/*.webp
git add public/images/*.jpg  
git add public/images/*.svg
git status
git commit -m "Add public/images folder with all article images"
git push origin main
```

## Verify
After pushing, check:
1. GitHub: https://github.com/sfoubusgit/ki-lampe
   - Navigate to `public/images/` folder
   - Should see all .webp, .jpg, and .svg files
2. Vercel Dashboard
   - Should show new deployment within 1-2 minutes
   - Images will be available at: `https://your-site.vercel.app/images/filename.webp`

## Files That Should Be Added
- `public/images/ki-lego-objekte-bauen.webp`
- `public/images/ki-datenschutz-wie-innovation-und-privatsphre-hand-in-hand-gehen.webp`
- `public/images/maximiere-ki-potential-dein-weg-zur-prompt-engineering-masterclass.webp`
- `public/images/star-wars-ki-artikel-foto.webp`
- `public/images/stable_diffusion_a1111_tutorial_hero.jpg`
- `public/images/*.svg` (header files)
