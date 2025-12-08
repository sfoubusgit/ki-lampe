# 🚀 Deployment Steps - KI-Lampe Blog

## ✅ Completed Steps

1. ✅ All files committed to git
2. ✅ Changes pushed to GitHub: `https://github.com/sfoubusgit/ki-lampe.git`
3. ✅ All 41 articles have hero images
4. ✅ Ready for deployment

## 🎯 Next: Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended - Easiest)

1. **Open Vercel Dashboard**
   - Go to: https://vercel.com/dashboard
   - Sign in with your account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Find and select: **`sfoubusgit/ki-lampe`**
   - Click **"Import"**

3. **Configure Project** (Auto-detected, but verify):
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Environment Variables** (Optional - Add if needed):
   - Go to **Settings** → **Environment Variables**
   - Add:
     - `BLOG_URL` = `https://ki-lampe.vercel.app` (or your domain)
     - `BLOG_NAME` = `KI-Lampe`
     - `GOOGLE_ADSENSE_CLIENT_ID` = (if you have AdSense)
     - `NEXT_PUBLIC_GA_ID` = (if you have Google Analytics)

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - ✅ Your site will be live!

### Option 2: Vercel CLI

Run these commands in your terminal:

```bash
# Navigate to project
cd c:\Users\Sina\Desktop\ki-lampe

# Login to Vercel (first time only - opens browser)
npx vercel login

# Deploy to production
npx vercel --prod
```

Follow the prompts:
- Select your Vercel account
- Confirm project settings
- Deploy!

## 📋 What's Deployed

- ✅ 41 articles with hero images
- ✅ Images visible in overview pages
- ✅ Images visible on article detail pages
- ✅ Next.js 14 with App Router
- ✅ SEO optimized
- ✅ Responsive design

## 🔗 After Deployment

Your site will be available at:
- **Preview/Production**: `https://ki-lampe.vercel.app` (or your custom domain)

## 🔧 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain (e.g., `ki-lampe.com`)
3. Follow DNS configuration instructions

## 📝 Notes

- The site will automatically rebuild when you push to GitHub (if connected)
- All images are from Unsplash (free, no licensing issues)
- Environment variables are optional for basic functionality
- The build should complete successfully with default settings

## 🆘 Troubleshooting

If build fails:
1. Check Vercel build logs
2. Ensure Node.js version is 18+ (Vercel auto-detects)
3. Check that all dependencies are in `package.json`
4. Verify `next.config.js` is correct
