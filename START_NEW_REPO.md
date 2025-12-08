# Start Fresh with New Repository

## Steps to Create New Repository

### 1. Create New Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `ki-lampe` (or whatever you prefer)
3. Description: "KI-Lampe Blog - AI-powered blog"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### 2. Update Local Repository

After creating the new repository, GitHub will show you commands. Use these:

```powershell
# Make sure you're in the project directory
cd c:\Users\Sina\Desktop\ki-lampe

# Remove the old remote
git remote remove origin

# Add the new remote (replace YOUR_USERNAME and NEW_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git

# Verify the new remote
git remote -v

# Push everything to the new repository
git push -u origin main
```

### 3. Update Vercel

1. Go to Vercel Dashboard
2. Click on your project
3. Go to **Settings** → **Git**
4. Click **"Disconnect"** or **"Change Repository"**
5. Click **"Connect Git Repository"**
6. Select your new repository
7. Vercel will automatically deploy

## Alternative: Keep Current Code, Fresh Git History

If you want to keep all your code but start with a clean git history:

```powershell
cd c:\Users\Sina\Desktop\ki-lampe

# Remove the .git folder (this deletes all git history)
Remove-Item -Recurse -Force .git

# Initialize a fresh git repository
git init

# Add everything
git add -A

# Create initial commit
git commit -m "Initial commit - KI-Lampe Blog"

# Add your new remote (after creating repo on GitHub)
git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git

# Push to new repository
git push -u origin main
```

## What Gets Preserved

✅ All your code files
✅ All articles
✅ All images in `public/images/`
✅ All configuration
✅ All components

❌ Git history (if you do the fresh start)
❌ Old commit messages

## After Setup

1. Verify on GitHub that all files are there
2. Connect Vercel to the new repository
3. Deploy and verify images work
