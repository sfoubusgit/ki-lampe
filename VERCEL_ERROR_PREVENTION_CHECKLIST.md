# Vercel Error Prevention Checklist

**IMPORTANT: Always follow this checklist when creating or modifying content to prevent Vercel deployment errors.**

---

## ✅ Pre-Deployment Checklist

### 1. Static Assets (Images, Files)
- [ ] **All static assets are tracked in git**
  - Run `git status` to verify files are tracked
  - Never add files to `.gitignore` that should be deployed
  - Always run `git add` for new images/files in `public/`
  - Verify with: `git ls-files public/images/`

### 2. Performance Optimization
- [ ] **Caching is implemented** for frequently accessed data
  - Article lists should have caching (5+ minutes)
  - Use Next.js `revalidate` for ISR
  - Implement in-memory cache for expensive operations

- [ ] **Batch processing** for large datasets
  - Process items in batches (10-20 at a time)
  - Never process all items simultaneously
  - Use async/await with proper error handling

- [ ] **Timeouts are set** for long-running operations
  - Markdown processing: 5-second timeout
  - API calls: appropriate timeouts
  - Always have fallback mechanisms

### 3. Error Handling
- [ ] **Try-catch blocks** around all async operations
  - Article processing
  - Markdown parsing
  - Image loading
  - API calls

- [ ] **Graceful degradation** when operations fail
  - Fallback to simple HTML if markdown fails
  - Placeholder images if image loading fails
  - Error messages instead of crashes

### 4. Build Verification
- [ ] **Test build locally** before deployment
  ```bash
  npm run build
  ```
  - Fix all TypeScript errors
  - Fix all build warnings
  - Verify all pages generate successfully

- [ ] **Check for missing dependencies**
  - All imports resolve correctly
  - Type definitions are installed
  - No missing modules

### 5. Git & Deployment
- [ ] **Verify git status** before pushing
  ```bash
  git status
  git diff
  ```
  - All modified files are staged
  - No untracked files that should be committed
  - Commit message is descriptive

- [ ] **Verify deployment triggers**
  - Push to correct branch (usually `main`)
  - Wait 1-2 minutes and check Vercel dashboard
  - Verify deployment status in Vercel logs

---

## 🚫 Common Mistakes to Avoid

### ❌ DON'T:
1. **Add static assets without git tracking**
   - Images in `public/` must be in git
   - Never assume files will deploy automatically

2. **Process all data at once**
   - Always use batching for large datasets
   - Never block the event loop

3. **Skip error handling**
   - Always wrap async operations in try-catch
   - Always have fallback mechanisms

4. **Deploy without local testing**
   - Always run `npm run build` locally first
   - Fix errors before pushing

5. **Ignore performance**
   - Implement caching from the start
   - Add timeouts for long operations
   - Optimize before deployment

---

## 📋 Quick Reference: What to Check

### When Adding Images:
1. ✅ Image file is in `public/images/`
2. ✅ File is tracked in git (`git add public/images/filename.webp`)
3. ✅ File is committed (`git commit`)
4. ✅ File is pushed (`git push`)
5. ✅ Verify in GitHub that file exists
6. ✅ Wait for Vercel to rebuild
7. ✅ Test on deployed site

### When Modifying Code:
1. ✅ Run `npm run build` locally
2. ✅ Fix all TypeScript/build errors
3. ✅ Test locally (`npm run dev`)
4. ✅ Add error handling if needed
5. ✅ Add caching if processing data
6. ✅ Add timeouts if long operations
7. ✅ Commit and push
8. ✅ Verify deployment in Vercel

### When Adding New Features:
1. ✅ Check if caching is needed
2. ✅ Check if batching is needed
3. ✅ Add error handling
4. ✅ Add timeouts if needed
5. ✅ Test locally first
6. ✅ Verify build succeeds
7. ✅ Deploy and test

---

## 🔍 Verification Commands

```bash
# Check if images are tracked
git ls-files public/images/

# Check git status
git status

# Test build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Verify all files are committed
git diff --cached
```

---

## 📝 Notes

- **Always assume files need to be in git** - Vercel only deploys what's in the repository
- **Performance matters** - Implement caching and batching from the start
- **Errors happen** - Always have fallback mechanisms
- **Test first** - Never deploy without local testing
- **Monitor deployments** - Check Vercel dashboard after pushes

---

*This checklist should be referenced before every deployment to prevent the errors documented in `VERCEL_ERRORS_AND_FIXES.md`*



