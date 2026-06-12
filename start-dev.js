#!/usr/bin/env node

/**
 * Auto-start script for KI-LAMPE development server
 * Works cross-platform (Windows, Mac, Linux)
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting KI-LAMPE development server...\n');

// Change to the project directory
process.chdir(__dirname);

// Spawn the npm dev command
const devProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

// Handle process exit
devProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  devProcess.kill('SIGINT');
  process.exit(0);
});
