#!/bin/bash

# Script to prepare repository for deployment
# Run this script to initialize git and prepare for GitHub push

set -e

echo "🚀 Preparing repository for deployment..."
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed or not in PATH"
    echo "💡 Please install Git or use GitHub Desktop instead"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    git branch -M main
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if remote exists
if git remote get-url origin &> /dev/null; then
    echo "✅ Remote 'origin' already configured"
    git remote -v
else
    echo "⚠️  No remote configured yet"
    echo ""
    echo "To add GitHub remote, run:"
    echo "  git remote add origin https://github.com/YOUR-USERNAME/ki-lampe-blog.git"
    echo ""
fi

# Stage all files
echo ""
echo "📝 Staging all files..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit (everything already committed)"
else
    echo "💾 Creating initial commit..."
    git commit -m "Initial commit: KI-Lampe Blog with 37 articles ready for deployment"
    echo "✅ Commit created successfully"
fi

echo ""
echo "✅ Repository prepared!"
echo ""
echo "📋 Next steps:"
echo "1. If you haven't created the GitHub repository yet:"
echo "   - Go to https://github.com/new"
echo "   - Repository name: ki-lampe-blog"
echo "   - Make it Private (recommended)"
echo "   - Don't initialize with README"
echo ""
echo "2. Add remote and push:"
echo "   git remote add origin https://github.com/YOUR-USERNAME/ki-lampe-blog.git"
echo "   git push -u origin main"
echo ""
echo "3. Or use GitHub Desktop (easier):"
echo "   - Install GitHub Desktop from https://desktop.github.com"
echo "   - File → Add Local Repository"
echo "   - Select this folder"
echo "   - Publish to GitHub"


