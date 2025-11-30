@echo off
echo Fixing git configuration and pushing to GitHub...
echo.

cd /d "c:\Users\Sina\Desktop\ki-lampe"

echo Step 1: Removing old remote...
git remote remove origin 2>nul

echo Step 2: Adding new remote...
git remote add origin https://github.com/sfoubusgit/ki-lampe.git

echo Step 3: Verifying remote...
git remote -v

echo Step 4: Setting branch to main...
git branch -M main

echo Step 5: Attempting to push...
echo.
echo If you get authentication errors, you may need to:
echo - Use a Personal Access Token (https://github.com/settings/tokens)
echo - Or use GitHub Desktop to push
echo.
git push -u origin main

echo.
echo Done! Check the output above for any errors.
pause

