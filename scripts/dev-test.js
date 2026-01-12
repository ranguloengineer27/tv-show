#!/usr/bin/env node

const { spawn } = require('child_process');

const child = spawn('pnpm', ['dev'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: {
    ...process.env,
    PLAYWRIGHT_TEST: 'true',
  },
});

// Forward stdout
child.stdout.on('data', (data) => {
  process.stdout.write(data);
});

// Filter stderr to exclude ECONNRESET errors
child.stderr.on('data', (data) => {
  const output = data.toString();
  // Filter out ECONNRESET and aborted errors from web vitals
  if (
    !output.includes('ECONNRESET') &&
    !output.includes('Error: aborted') &&
    !output.includes('code: \'ECONNRESET\'')
  ) {
    process.stderr.write(data);
  }
});

child.on('exit', (code) => {
  process.exit(code);
});

// Handle process termination
process.on('SIGTERM', () => {
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  child.kill('SIGINT');
});

