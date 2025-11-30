# Quick Deploy Guide

## ✅ Step 1: Push to GitHub (Already Done!)

Your code has been committed and pushed to: `https://github.com/sfoubusgit/ki-lampe.git`

## 🚀 Step 2: Deploy to Vercel

### Method A: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Click "Add New..." → "Project"**
3. **Import Repository**:
   - Select: `sfoubusgit/ki-lampe`
   - Click "Import"
4. **Configure** (usually auto-detected):
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live!

### Method B: Via CLI

Run this command in your terminal:

```bash
cd c:\Users\Sina\Desktop\ki-lampe
npx vercel --prod
```

Follow the prompts:
- Login if needed
- Confirm project settings
- Deploy!

## 📝 Environment Variables (Optional)

If you need these, add them in Vercel Dashboard → Settings → Environment Variables:

- `BLOG_URL` - Your site URL
- `BLOG_NAME` - Blog name
- `GOOGLE_ADSENSE_CLIENT_ID` - For ads
- `NEXT_PUBLIC_GA_ID` - For analytics

## ✨ What's Included

- ✅ All 41 articles with hero images
- ✅ Images visible in overview and detail pages
- ✅ Next.js optimized configuration
- ✅ SEO-friendly setup

## 🎉 After Deployment

Your site will be live at: `https://ki-lampe.vercel.app` (or your custom domain)

You can set up a custom domain in Vercel Dashboard → Settings → Domains
