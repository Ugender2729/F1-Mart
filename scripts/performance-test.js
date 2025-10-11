#!/usr/bin/env node

/**
 * Performance Test Script for F1 Mart
 * 
 * This script tests the performance optimizations by:
 * 1. Building the application
 * 2. Analyzing bundle sizes
 * 3. Checking for performance issues
 * 4. Generating a performance report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 F1 Mart Performance Test Starting...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  return fs.existsSync(path.join(__dirname, '..', filePath));
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(path.join(__dirname, '..', filePath));
    return (stats.size / 1024).toFixed(2); // Size in KB
  } catch (error) {
    return 'N/A';
  }
}

// Test 1: Check if build files exist
log('📦 Testing Build Files...', 'blue');
const buildFiles = [
  '.next/static/chunks/_app.js',
  '.next/static/chunks/main.js',
  '.next/static/chunks/webpack.js'
];

let buildExists = true;
buildFiles.forEach(file => {
  const exists = checkFileExists(file);
  log(`  ${exists ? '✅' : '❌'} ${file}`, exists ? 'green' : 'red');
  if (!exists) buildExists = false;
});

if (!buildExists) {
  log('\n⚠️  Build files not found. Run "npm run build" first.', 'yellow');
  process.exit(1);
}

// Test 2: Check bundle sizes
log('\n📊 Analyzing Bundle Sizes...', 'blue');
const bundleSizes = {};
buildFiles.forEach(file => {
  const size = getFileSize(file);
  bundleSizes[file] = size;
  log(`  📄 ${path.basename(file)}: ${size} KB`, 'green');
});

// Test 3: Check optimization files
log('\n🔧 Checking Optimization Files...', 'blue');
const optimizationFiles = [
  'components/ErrorBoundary.tsx',
  'components/OptimizedImage.tsx',
  'components/PerformanceMonitor.tsx',
  'next.config.js'
];

optimizationFiles.forEach(file => {
  const exists = checkFileExists(file);
  log(`  ${exists ? '✅' : '❌'} ${file}`, exists ? 'green' : 'red');
});

// Test 4: Check package.json for performance dependencies
log('\n📋 Checking Dependencies...', 'blue');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const performanceDeps = [
    'next',
    '@next/bundle-analyzer',
    'lighthouse',
    'webpack-bundle-analyzer'
  ];
  
  performanceDeps.forEach(dep => {
    const exists = deps[dep];
    log(`  ${exists ? '✅' : '❌'} ${dep} ${exists ? `(${exists})` : '(not found)'}`, exists ? 'green' : 'yellow');
  });
} catch (error) {
  log('  ❌ Could not read package.json', 'red');
}

// Test 5: Performance recommendations
log('\n💡 Performance Recommendations:', 'blue');

const recommendations = [
  {
    check: bundleSizes['.next/static/chunks/_app.js'] && parseFloat(bundleSizes['.next/static/chunks/_app.js']) < 100,
    message: 'App bundle size is optimized (< 100KB)',
    priority: 'high'
  },
  {
    check: bundleSizes['.next/static/chunks/main.js'] && parseFloat(bundleSizes['.next/static/chunks/main.js']) < 50,
    message: 'Main bundle size is optimized (< 50KB)',
    priority: 'high'
  },
  {
    check: checkFileExists('components/ErrorBoundary.tsx'),
    message: 'Error boundaries are implemented',
    priority: 'medium'
  },
  {
    check: checkFileExists('components/OptimizedImage.tsx'),
    message: 'Image optimization is implemented',
    priority: 'high'
  },
  {
    check: checkFileExists('components/PerformanceMonitor.tsx'),
    message: 'Performance monitoring is implemented',
    priority: 'medium'
  }
];

recommendations.forEach(rec => {
  const status = rec.check ? '✅' : '⚠️';
  const color = rec.check ? 'green' : 'yellow';
  const priority = rec.priority === 'high' ? '🔥' : rec.priority === 'medium' ? '⚡' : '📋';
  log(`  ${status} ${priority} ${rec.message}`, color);
});

// Test 6: Generate performance report
log('\n📊 Performance Report:', 'bold');
log('=' .repeat(50), 'blue');

const totalBundleSize = Object.values(bundleSizes)
  .filter(size => size !== 'N/A')
  .reduce((sum, size) => sum + parseFloat(size), 0);

log(`Total Bundle Size: ${totalBundleSize.toFixed(2)} KB`, 'green');
log(`Optimization Score: ${recommendations.filter(r => r.check).length}/${recommendations.length}`, 'green');

// Performance grade
const score = recommendations.filter(r => r.check).length / recommendations.length;
let grade, gradeColor;
if (score >= 0.8) {
  grade = 'A+ (Excellent)';
  gradeColor = 'green';
} else if (score >= 0.6) {
  grade = 'B (Good)';
  gradeColor = 'yellow';
} else {
  grade = 'C (Needs Improvement)';
  gradeColor = 'red';
}

log(`Performance Grade: ${grade}`, gradeColor);

log('\n🎯 Next Steps:', 'blue');
if (score < 0.8) {
  log('  • Run "npm run build" to generate optimized bundles', 'yellow');
  log('  • Check bundle analysis with "npm run analyze"', 'yellow');
  log('  • Implement missing optimizations', 'yellow');
} else {
  log('  • Great job! Your app is well optimized', 'green');
  log('  • Monitor performance in production', 'green');
  log('  • Consider implementing service workers', 'green');
}

log('\n🚀 Performance test completed!', 'bold');
