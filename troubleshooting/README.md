# Troubleshooting Documentation

This folder contains detailed documentation for errors and issues encountered during development and deployment.

## 📁 Files

### 01_merge-conflict-vercel-build-error.md
**Issue:** Git merge conflict markers caused Vercel build failure  
**Date:** 2025-01-28  
**Severity:** Critical  
**Status:** ✅ Resolved

**Summary:**
- Merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) were left in source code
- Vercel build failed because these markers are not valid JavaScript/TypeScript syntax
- Affected files: `app/artikel/page.tsx`, `app/artikel/[slug]/page.tsx`, `lib/articles.ts`
- **Solution:** Manually resolved all conflicts, removed markers, set `revalidate = 60` for production

**Key Takeaways:**
- Never commit files with conflict markers
- Always test builds after resolving conflicts
- Use pre-commit hooks to prevent this issue

---

## 🎯 How to Use This Folder

### When You Encounter an Error:

1. **Check existing documentation:**
   - Look for similar errors in this folder
   - Read the solution and apply it

2. **If error is new:**
   - Document the error following the template
   - Include: error message, root cause, solution, prevention strategies
   - Add to this README

3. **Update prevention measures:**
   - Add pre-commit hooks if needed
   - Update CI/CD checks
   - Document in team knowledge base

---

## 📋 Documentation Template

When creating new troubleshooting docs, use this structure:

```markdown
# [Error Name]

## 📋 Error Summary
- Date:
- Error Type:
- Build Platform:
- Impact:

## 🔴 Error Message
[Paste full error message]

## 🔍 Root Cause Analysis
[Detailed explanation]

## ✅ Solution Applied
[Step-by-step solution]

## 🛡️ Prevention Strategies
[How to prevent this in the future]

## 🔧 Detection Methods
[How to detect this issue]

## 📊 Impact Assessment
[Severity and affected files]

## ✅ Verification Checklist
[Steps to verify the fix]
```

---

## 🔍 Quick Reference

### Common Issues

| Issue | File | Status |
|-------|------|--------|
| Merge Conflict Markers | `01_merge-conflict-vercel-build-error.md` | ✅ Resolved |
| [Add more as they occur] | | |

---

## 🛠️ Prevention Tools

### Pre-Commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Check for merge conflict markers
if git diff --cached --check | grep -q "<<<<<<<"; then
    echo "ERROR: Merge conflict markers found!"
    exit 1
fi
```

### Build Check Script

Add to `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/check-conflicts.js"
  }
}
```

---

**Last Updated:** 2025-01-28
