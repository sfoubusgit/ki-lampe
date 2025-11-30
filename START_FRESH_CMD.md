# Start Fresh Repository - CMD Commands

## Step 1: Create New Repository on GitHub
1. Go to: https://github.com/new
2. Choose a repository name
3. **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

## Step 2: Remove Git History and Start Fresh

Run these commands in CMD (Command Prompt):

```cmd
cd c:\Users\Sina\Desktop\ki-lampe

REM Remove all git history
rmdir /s /q .git

REM Start fresh git repository
git init

REM Add everything
git add -A

REM Create initial commit
git commit -m "Initial commit - KI-Lampe Blog"

REM Add your new remote (replace with your actual GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

REM Push to new repository
git push -u origin main
```

## Alternative: If rmdir doesn't work, use this:

```cmd
cd c:\Users\Sina\Desktop\ki-lampe

REM Remove git folder
if exist .git rmdir /s /q .git

REM Initialize new repo
git init
git add -A
git commit -m "Initial commit - KI-Lampe Blog"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

## After Pushing

1. Verify on GitHub that all files are there
2. Go to Vercel Dashboard
3. Settings → Git → Disconnect old repo
4. Connect new repository
5. Vercel will automatically deploy
