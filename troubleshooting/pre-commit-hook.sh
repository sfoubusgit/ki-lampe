#!/bin/sh
#
# Pre-commit hook to prevent committing merge conflict markers
# 
# Installation:
# 1. Copy this file to: .git/hooks/pre-commit
# 2. Make it executable: chmod +x .git/hooks/pre-commit
#
# This hook will prevent commits if merge conflict markers are found

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Checking for merge conflict markers..."

# Check staged files for conflict markers
CONFLICTS=$(git diff --cached --check 2>&1)

if echo "$CONFLICTS" | grep -q "<<<<<<<"; then
    echo ""
    echo "${RED}❌ ERROR: Merge conflict markers found in staged files!${NC}"
    echo ""
    echo "${YELLOW}Files with conflicts:${NC}"
    git diff --cached --check | grep -B 2 "<<<<<<<" || true
    echo ""
    echo "${YELLOW}Please resolve all conflicts before committing.${NC}"
    echo ""
    echo "To resolve:"
    echo "  1. Open the files listed above"
    echo "  2. Remove all conflict markers (<<<<<<<, =======, >>>>>>>)"
    echo "  3. Keep the correct code version"
    echo "  4. Stage the files again: git add <file>"
    echo "  5. Try committing again"
    echo ""
    exit 1
fi

# Also check for conflict markers in working directory (not staged)
if git diff --check | grep -q "<<<<<<<"; then
    echo ""
    echo "${YELLOW}⚠️  WARNING: Merge conflict markers found in unstaged files!${NC}"
    echo ""
    echo "These won't block the commit, but should be resolved:"
    git diff --check | grep -B 2 "<<<<<<<" || true
    echo ""
    read -p "Continue with commit anyway? (y/N) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "${RED}Commit aborted.${NC}"
        exit 1
    fi
fi

echo "${GREEN}✅ No merge conflict markers found. Proceeding with commit...${NC}"
exit 0





