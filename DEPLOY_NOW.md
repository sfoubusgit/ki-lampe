# 🚀 Deploy ki-lampe.com RIGHT NOW

## Current Status: Login in Progress

**Next Steps:**

1. **Complete Vercel Login:**
   - Visit: https://vercel.com/login
   - Enter code: `TRDH-MCSJ` (or visit the URL shown in terminal)
   - Sign in and authorize

2. **After login, run in Terminal:**
   ```bash
   cd /Users/sinafoudehi/Desktop/ai_blog
   npx vercel
   ```

3. **Answer the prompts:**
   - Set up and deploy? → **Yes** (or just press Enter)
   - Which scope? → Select your account
   - Link to existing project? → **No**
   - What's your project's name? → **ki-lampe-blog**
   - In which directory? → Press **Enter** (uses current directory)
   - Override settings? → **No**

4. **Wait 2-3 minutes** - Your site deploys!

5. **You'll get a URL** like: `https://ki-lampe-blog-xxxxx.vercel.app`

---

## After Deployment:

### Add Environment Variables (In Browser)

1. Go to: https://vercel.com/dashboard
2. Click on: `ki-lampe-blog`
3. Go to: **Settings** → **Environment Variables**
4. Add these three:

   ```
   BLOG_URL = https://ki-lampe.com
   BLOG_NAME = KI-Lampe
   BLOG_DESCRIPTION = Der intelligente KI-Blog - Erleuchtung durch künstliche Intelligenz
   ```

5. Go to: **Deployments** tab
6. Click **⋯** (three dots) on latest deployment
7. Click **Redeploy**

### Connect Domain (In Browser)

1. In Vercel Dashboard: **Settings** → **Domains**
2. Click: **Add Domain**
3. Enter: `ki-lampe.com`
4. Click: **Add**
5. Copy DNS records shown
6. Go to your domain registrar
7. Add DNS records (see `DNS_RECORDS.md`)
8. Wait 1-48 hours for DNS

---

## ✅ That's It!

Your site will be live at: **https://ki-lampe.com** 🎉
