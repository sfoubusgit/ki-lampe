#!/usr/bin/env node
/**
 * Pre-build script to check for merge conflict markers
 * 
 * Usage:
 *   node scripts/check-conflicts.js
 * 
 * Or add to package.json:
 *   "scripts": {
 *     "prebuild": "node scripts/check-conflicts.js"
 *   }
 */

const fs = require('fs');
const path = require('path');

const CONFLICT_MARKERS = [
  '<<<<<<<',
  '=======',
  '>>>>>>>'
];

// Directories to check
const CHECK_DIRS = [
  'app',
  'components',
  'lib',
  'scripts'
];

// Files to exclude
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /dist/,
  /build/,
  /troubleshooting/, // Exclude troubleshooting documentation (contains example conflict markers)
];

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

/**
 * Check a single file for conflict markers
 */
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const issues = [];

    lines.forEach((line, index) => {
      CONFLICT_MARKERS.forEach(marker => {
        // Only check if marker is at the start of the line (not in comments or strings)
        // This prevents false positives from documentation examples
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith(marker) || trimmedLine === marker) {
          issues.push({
            file: filePath,
            line: index + 1,
            marker: marker,
            content: line.trim()
          });
        }
      });
    });

    return issues;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Find all files to check
 */
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (shouldExclude(filePath)) {
      return;
    }

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (stat.isFile()) {
      // Check TypeScript and JavaScript files only (exclude Markdown to avoid false positives in docs)
      if (/\.(ts|tsx|js|jsx)$/.test(file)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Checking for merge conflict markers...\n');

  const allIssues = [];
  const rootDir = path.resolve(__dirname, '..');

  CHECK_DIRS.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
      const files = findFiles(dirPath);
      files.forEach(file => {
        const issues = checkFile(file);
        allIssues.push(...issues);
      });
    }
  });

  if (allIssues.length > 0) {
    console.error('❌ ERROR: Merge conflict markers found!\n');
    console.error('Files with conflicts:');
    console.error('─'.repeat(60));

    allIssues.forEach(issue => {
      console.error(`\n📄 ${issue.file}`);
      console.error(`   Line ${issue.line}: ${issue.content}`);
      console.error(`   Marker: ${issue.marker}`);
    });

    console.error('\n' + '─'.repeat(60));
    console.error('\n⚠️  Please resolve all conflicts before building.');
    console.error('\nTo fix:');
    console.error('  1. Open the files listed above');
    console.error('  2. Remove all conflict markers (<<<<<<<, =======, >>>>>>>)');
    console.error('  3. Keep the correct code version');
    console.error('  4. Run the build again\n');

    process.exit(1);
  }

  console.log('✅ No merge conflict markers found. Proceeding with build...\n');
  process.exit(0);
}

// Run the check
main();





