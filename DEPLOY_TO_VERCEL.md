# Deploy to Vercel - Quick Guide

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with your account

2. **Import Your GitHub Repository**
   - Click "Add New..." → "Project"
   - Select your repository: `sfoubusgit/ki-lampe`
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (if needed)
   Add these in Vercel dashboard under Settings → Environment Variables:
   - `BLOG_URL` - Your blog URL (e.g., https://ki-lampe.vercel.app)
   - `BLOG_NAME` - Your blog name
   - `GOOGLE_ADSENSE_CLIENT_ID` - If you have AdSense
   - `NEXT_PUBLIC_GA_ID` - If you have Google Analytics

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

## Option 2: Deploy via Vercel CLI

Run these commands:

```bash
# Login to Vercel (first time only)
npx vercel login

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

## Important Notes

- All your articles with images are now in the repository
- The site will automatically rebuild when you push to GitHub (if connected)
- Make sure your `next.config.js` allows Unsplash images (already configured)
- Environment variables are optional for basic functionality

## After Deployment

1. Your site will be live at: `https://ki-lampe.vercel.app` (or your custom domain)
2. All 41 articles with images will be visible
3. You can set up a custom domain in Vercel dashboard if needed
