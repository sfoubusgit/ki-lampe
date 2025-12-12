# Installation Guide: Conflict Prevention Tools

This guide explains how to set up the tools to prevent merge conflict errors.

---

## 🛡️ Prevention Method 1: Pre-Build Check (Automatic)

### What It Does
Automatically checks for merge conflict markers before every build. If conflicts are found, the build fails with a clear error message.

### Installation

**Already configured!** The script is already added to `package.json`:

```json
{
  "scripts": {
    "prebuild": "node scripts/check-conflicts.js"
  }
}
```

### How It Works

1. When you run `npm run build`, the `prebuild` script runs first
2. It scans all TypeScript/JavaScript files in `app/`, `components/`, `lib/`, and `scripts/`
3. If conflict markers are found, the build stops with an error
4. If no conflicts are found, the build proceeds normally

### Manual Check

You can also run the check manually:

```bash
node scripts/check-conflicts.js
```

---

## 🛡️ Prevention Method 2: Pre-Commit Hook (Recommended)

### What It Does
Prevents you from committing files with merge conflict markers. The commit is blocked until all conflicts are resolved.

### Installation (Windows)

1. **Navigate to the `.git/hooks` folder:**
   ```powershell
   cd .git\hooks
   ```

2. **Copy the pre-commit hook:**
   ```powershell
   copy ..\..\troubleshooting\pre-commit-hook.sh pre-commit
   ```

3. **Make it executable (if using Git Bash):**
   ```bash
   chmod +x pre-commit
   ```

### Installation (Mac/Linux)

1. **Navigate to the `.git/hooks` folder:**
   ```bash
   cd .git/hooks
   ```

2. **Copy the pre-commit hook:**
   ```bash
   cp ../../troubleshooting/pre-commit-hook.sh pre-commit
   ```

3. **Make it executable:**
   ```bash
   chmod +x pre-commit
   ```

### How It Works

1. Before every commit, Git runs the pre-commit hook
2. The hook checks all staged files for conflict markers
3. If conflicts are found, the commit is blocked
4. You must resolve conflicts before committing

### Testing the Hook

1. **Create a test file with conflict markers:**
   ```bash
   echo "<<<<<<< HEAD" > test-conflict.ts
   echo "test code" >> test-conflict.ts
   echo "=======" >> test-conflict.ts
   echo "other code" >> test-conflict.ts
   echo ">>>>>>> branch" >> test-conflict.ts
   ```

2. **Try to commit it:**
   ```bash
   git add test-conflict.ts
   git commit -m "Test commit"
   ```

3. **Expected result:** Commit should be blocked with an error message

4. **Clean up:**
   ```bash
   rm test-conflict.ts
   ```

---

## 🛡️ Prevention Method 3: IDE/Editor Warnings

### VS Code / Cursor

1. **Install GitLens extension:**
   - Open Extensions (Ctrl+Shift+X)
   - Search for "GitLens"
   - Install the extension

2. **Configure conflict detection:**
   - GitLens will automatically highlight conflict markers
   - You'll see warnings in the Problems panel

### Alternative: Manual Search

You can search for conflict markers in your editor:

- **VS Code / Cursor:** `Ctrl+Shift+F` (or `Cmd+Shift+F` on Mac)
- **Search for:** `<<<<<<<`
- This will find all conflict markers in your codebase

---

## ✅ Verification

After installation, verify everything works:

### 1. Test Pre-Build Check

```bash
npm run build
```

If there are no conflicts, you should see:
```
🔍 Checking for merge conflict markers...

✅ No merge conflict markers found. Proceeding with build...
```

### 2. Test Pre-Commit Hook

Create a test file with conflicts and try to commit (see "Testing the Hook" above).

---

## 🔧 Troubleshooting

### Pre-Commit Hook Not Working

**Problem:** Hook doesn't run or doesn't block commits

**Solutions:**
1. Check if the file is executable:
   ```bash
   ls -la .git/hooks/pre-commit
   ```
   Should show `-rwxr-xr-x` (executable)

2. Check if the file is in the correct location:
   ```bash
   ls .git/hooks/pre-commit
   ```
   Should exist

3. Check file permissions:
   ```bash
   chmod +x .git/hooks/pre-commit
   ```

### Pre-Build Check Not Running

**Problem:** Build doesn't check for conflicts

**Solutions:**
1. Check `package.json` has the `prebuild` script:
   ```json
   "prebuild": "node scripts/check-conflicts.js"
   ```

2. Verify the script exists:
   ```bash
   ls scripts/check-conflicts.js
   ```

3. Test the script manually:
   ```bash
   node scripts/check-conflicts.js
   ```

---

## 📚 Additional Resources

- [Git Hooks Documentation](https://git-scm.com/docs/githooks)
- [npm Scripts Documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [Troubleshooting Guide](./01_merge-conflict-vercel-build-error.md)

---

**Last Updated:** 2025-01-28





