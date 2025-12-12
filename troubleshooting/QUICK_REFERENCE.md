# Quick Reference: Merge Conflict Prevention

## 🚨 If You See This Error

```
x Merge conflict marker encountered.
   ,-[/vercel/path0/lib/articles.ts:99:1]
 99 | }
100 | 
101 | =======
102 | >>>>>>> ee8bc7af3a09222c845ffa7249dbc63710755287
```

**Immediate Action:**
1. Search for conflict markers: `grep -r "<<<<<<<" .`
2. Open each file and remove all markers (`<<<<<<<`, `=======`, `>>>>>>>`)
3. Keep the correct code version
4. Test: `npm run build`
5. Commit and push

---

## ✅ Prevention Checklist

Before committing code:

- [ ] Run `npm run build` locally (checks for conflicts automatically)
- [ ] Search for `<<<<<<<` in your editor
- [ ] Check `git diff --check` for conflicts
- [ ] Resolve all conflicts before committing
- [ ] Test the build after resolving

---

## 🔍 Quick Detection Commands

```bash
# Check for conflict markers
grep -r "<<<<<<<" app/ lib/ components/

# Or use Git's built-in check
git diff --check

# Or run the automated check
node scripts/check-conflicts.js
```

---

## 📁 Files Created

1. **`troubleshooting/01_merge-conflict-vercel-build-error.md`**
   - Complete error analysis and solution

2. **`troubleshooting/pre-commit-hook.sh`**
   - Git hook to prevent committing conflicts

3. **`scripts/check-conflicts.js`**
   - Pre-build check script (runs automatically)

4. **`troubleshooting/INSTALLATION.md`**
   - Setup instructions for prevention tools

---

## 🛠️ Tools Installed

✅ **Pre-build check** - Automatically runs before `npm run build`  
⏳ **Pre-commit hook** - Install manually (see INSTALLATION.md)

---

**For detailed information, see:** `troubleshooting/01_merge-conflict-vercel-build-error.md`





