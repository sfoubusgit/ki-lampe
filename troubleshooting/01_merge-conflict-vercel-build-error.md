# Merge Conflict Error: Vercel Build Failure

## 📋 Error Summary

**Date:** 2025-01-28  
**Error Type:** Git Merge Conflict Markers in Source Code  
**Build Platform:** Vercel  
**Impact:** Build failed completely, preventing deployment

---

## 🔴 Error Message

```
x Merge conflict marker encountered.

   ,-[/vercel/path0/lib/articles.ts:99:1]
 99 | }
100 | 
101 | =======
102 | >>>>>>> ee8bc7af3a09222c845ffa7249dbc63710755287
103 | export async function getAllArticles(): Promise<Article[]> {
104 |   // Return cached articles if still valid
105 |   const now = Date.now()

Caused by:
   Syntax Error

Import trace for requested module:
./lib/articles.ts
./app/page.tsx

> Build failed because of webpack errors
Error: Command "npm run build" exited with 1
```

---

## 🔍 Root Cause Analysis

### What Happened?

**Merge conflict markers** were left in the source code files. These markers are special Git syntax that indicate unresolved conflicts between two different versions of the same code.

### Why Did This Happen?

1. **Git Merge Operation:**
   - Two branches were merged (or a pull/merge was attempted)
   - The branches had conflicting changes in the same files
   - Git inserted conflict markers to show both versions
   - **The conflict was NOT manually resolved before committing**

2. **Conflicting Changes:**
   - **File:** `app/artikel/page.tsx`
     - HEAD version: `export const revalidate = 0 // Disable cache for development`
     - Incoming version: `export const revalidate = 60`
   
   - **File:** `app/artikel/[slug]/page.tsx`
     - HEAD version: `export const revalidate = 0 // Disable cache for development;`
     - Incoming version: `export const revalidate = 60;`
     - Also had conflicting sidebar logic for affiliate product boxes
   
   - **File:** `lib/articles.ts`
     - Conflict markers at lines 101-102 (between cache function and getAllArticles function)

3. **The Problem:**
   - Merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) are **not valid JavaScript/TypeScript syntax**
   - When Vercel tried to build the project, the TypeScript/JavaScript compiler encountered these markers
   - The build failed because the code couldn't be parsed

---

## ✅ Solution Applied

### Step 1: Identify All Conflict Markers

**Search for conflict markers:**
```bash
# Search for merge conflict markers
grep -r "<<<<<<< HEAD" .
grep -r "=======" .
grep -r ">>>>>>>" .
```

**Files with conflicts:**
- `app/artikel/page.tsx`
- `app/artikel/[slug]/page.tsx`
- `lib/articles.ts` (mentioned in error, but may have been auto-resolved)

### Step 2: Resolve Each Conflict

#### File: `app/artikel/page.tsx`

**Before (with conflict):**
```typescript
<<<<<<< HEAD
export const revalidate = 0 // Disable cache for development
=======
export const revalidate = 60
>>>>>>> ee8bc7af3a09222c845ffa7249dbc63710755287
```

**After (resolved):**
```typescript
export const revalidate = 60
```

**Decision:** Used `60` (production value) instead of `0` (development value) because:
- Vercel is a production environment
- `revalidate = 60` provides reasonable caching (60 seconds)
- `revalidate = 0` disables caching completely (not ideal for production)

#### File: `app/artikel/[slug]/page.tsx`

**Before (with conflict):**
```typescript
<<<<<<< HEAD
export const revalidate = 0 // Disable cache for development;
=======
export const revalidate = 60;
>>>>>>> ee8bc7af3a09222c845ffa7249dbc63710755287
```

**After (resolved):**
```typescript
export const revalidate = 60;
```

**Also resolved sidebar logic conflict:**
- Kept the cleaner version that shows LEGO affiliate box only for the specific LEGO article
- Removed duplicate/conflicting affiliate box logic

#### File: `lib/articles.ts`

**Resolution:** Removed any conflict markers between the `clearArticlesCache()` function and `getAllArticles()` function.

### Step 3: Verify No Conflicts Remain

**Check all files:**
```bash
# Verify no conflict markers exist
grep -r "^<<<<<<<" app/ lib/
grep -r "^=======$" app/ lib/
grep -r "^>>>>>>>" app/ lib/
```

**Result:** No conflict markers found ✅

---

## 🛡️ Prevention Strategies

### 1. **Always Resolve Conflicts Before Committing**

**Never commit files with conflict markers!**

**Before committing:**
```bash
# Check for conflict markers
git diff --check
# or
grep -r "<<<<<<<" .
```

**If conflicts are found:**
1. Stop the commit
2. Resolve all conflicts manually
3. Test the code
4. Then commit

### 2. **Use Pre-Commit Hooks**

Create a `.git/hooks/pre-commit` file:

```bash
#!/bin/sh
# Check for merge conflict markers
if git diff --cached --check | grep -q "<<<<<<<"; then
    echo "ERROR: Merge conflict markers found in staged files!"
    echo "Please resolve all conflicts before committing."
    exit 1
fi
```

### 3. **Use IDE/Editor Warnings**

**VS Code / Cursor:**
- Install extension: "GitLens" or "Git Conflict"
- These extensions highlight conflict markers
- Configure to show warnings for unresolved conflicts

### 4. **Code Review Checklist**

Before merging PRs:
- [ ] No conflict markers in code
- [ ] All conflicts manually resolved
- [ ] Code compiles without errors
- [ ] Tests pass (if applicable)

### 5. **Git Workflow Best Practices**

**Option A: Rebase Instead of Merge**
```bash
# Instead of merging, rebase your branch
git checkout feature-branch
git rebase main
# Resolve conflicts during rebase
git push --force-with-lease
```

**Option B: Merge with Conflict Resolution**
```bash
# When merging, always check for conflicts
git merge main
# If conflicts occur:
# 1. Resolve all conflicts manually
# 2. Test the code
# 3. Stage resolved files
git add .
# 4. Complete the merge
git commit
```

### 6. **Automated Checks in CI/CD**

**Add to `.github/workflows/ci.yml` or Vercel build script:**

```yaml
- name: Check for merge conflicts
  run: |
    if grep -r "<<<<<<< HEAD" . --exclude-dir=node_modules; then
      echo "ERROR: Merge conflict markers found!"
      exit 1
    fi
```

---

## 🔧 Detection Methods

### Method 1: Git Command
```bash
git diff --check
```
Shows all conflict markers in working directory.

### Method 2: Grep Search
```bash
# Search for conflict markers
grep -r "<<<<<<<" .
grep -r "=======" .
grep -r ">>>>>>>" .
```

### Method 3: IDE Search
- VS Code / Cursor: `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac)
- Search for: `<<<<<<<`
- This will find all conflict markers

### Method 4: Pre-Commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit
if git diff --cached --check | grep -q "<<<<<<<"; then
    echo "❌ ERROR: Merge conflict markers found!"
    exit 1
fi
```

---

## 📝 Conflict Resolution Process

### Step-by-Step Guide

1. **Identify the Conflict**
   ```bash
   git status
   # Shows files with conflicts
   ```

2. **Open the File**
   - Look for markers: `<<<<<<<`, `=======`, `>>>>>>>`

3. **Understand the Conflict**
   - `<<<<<<< HEAD` = Your current branch version
   - `=======` = Separator
   - `>>>>>>> commit-hash` = Incoming version

4. **Choose the Correct Version**
   - Keep your version
   - Keep incoming version
   - Combine both (if needed)
   - Write new code (if neither is correct)

5. **Remove All Markers**
   - Delete `<<<<<<< HEAD`
   - Delete `=======`
   - Delete `>>>>>>> commit-hash`
   - Keep only the final code

6. **Test the Code**
   ```bash
   npm run build
   # or
   npm run dev
   ```

7. **Stage and Commit**
   ```bash
   git add resolved-file.ts
   git commit -m "Resolve merge conflict in file.ts"
   ```

---

## 🎯 Best Practices

### 1. **Never Commit Conflicts**
- Always resolve conflicts before committing
- If unsure, ask for help or revert the merge

### 2. **Use Meaningful Commit Messages**
```bash
# Good
git commit -m "Resolve merge conflict: use production revalidate value"

# Bad
git commit -m "fix"
```

### 3. **Test After Resolving**
- Always build/test after resolving conflicts
- Don't assume the resolution is correct

### 4. **Document Resolution Decisions**
- Add comments explaining why a particular version was chosen
- Example:
  ```typescript
  // Using revalidate = 60 for production (Vercel)
  // revalidate = 0 was for local development only
  export const revalidate = 60
  ```

### 5. **Regular Sync with Main Branch**
- Frequently merge/rebase from main to avoid large conflicts
- Small, frequent merges are easier to resolve

---

## 🚨 Emergency Fix Procedure

If conflicts are already committed and pushed:

1. **Create a hotfix branch:**
   ```bash
   git checkout -b hotfix/resolve-conflicts
   ```

2. **Find and fix all conflicts:**
   ```bash
   grep -r "<<<<<<<" .
   # Fix each file manually
   ```

3. **Test the build:**
   ```bash
   npm run build
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Fix: Remove all merge conflict markers"
   git push origin hotfix/resolve-conflicts
   ```

5. **Merge to main:**
   - Create PR or merge directly
   - Vercel will rebuild automatically

---

## 📊 Impact Assessment

### Severity: **CRITICAL** 🔴

- **Build Status:** Failed completely
- **Deployment:** Blocked
- **User Impact:** Site not accessible
- **Fix Time:** ~10 minutes (if detected early)
- **Prevention:** Easy with proper workflow

### Files Affected

1. `app/artikel/page.tsx` - Article listing page
2. `app/artikel/[slug]/page.tsx` - Individual article page
3. `lib/articles.ts` - Article loading logic

---

## ✅ Verification Checklist

After resolving conflicts, verify:

- [ ] No conflict markers in codebase
- [ ] Code compiles without errors (`npm run build`)
- [ ] TypeScript types are correct (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Vercel build succeeds
- [ ] Site deploys correctly
- [ ] All pages load without errors

---

## 📚 Related Documentation

- [Git Merge Conflicts Guide](https://git-scm.com/docs/git-merge#_how_conflicts_are_presented)
- [Vercel Build Errors](https://vercel.com/docs/concepts/deployments/builds)
- [Next.js Revalidate Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate)

---

## 🔄 Lessons Learned

1. **Always check for conflicts before committing**
2. **Use pre-commit hooks to prevent conflicts**
3. **Test builds locally before pushing**
4. **Resolve conflicts immediately, don't leave them**
5. **Use production values in production code**

---

**Last Updated:** 2025-01-28  
**Status:** ✅ Resolved  
**Prevention:** Pre-commit hooks recommended





