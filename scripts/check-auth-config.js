#!/usr/bin/env node

/**
 * Authentication Configuration Checker for F1 Mart
 * This script helps diagnose authentication issues
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 F1 Mart Authentication Configuration Check\n');

// Check for environment files
const envFiles = ['.env.local', '.env', '.env.development.local'];
let envFileFound = false;

console.log('📁 Checking for environment files:');
envFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, '..', file));
  console.log(`  ${exists ? '✅' : '❌'} ${file} ${exists ? 'found' : 'not found'}`);
  if (exists) envFileFound = true;
});

if (!envFileFound) {
  console.log('\n⚠️  No environment file found! This is likely the cause of your 422 errors.');
  console.log('\n📝 To fix this:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add your Supabase credentials:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  console.log('3. Restart your development server');
}

// Check Supabase client configuration
console.log('\n🔧 Checking Supabase client configuration:');
const supabasePath = path.join(__dirname, '..', 'lib', 'supabase.ts');
if (fs.existsSync(supabasePath)) {
  const content = fs.readFileSync(supabasePath, 'utf8');
  
  // Check for proper error handling
  const hasErrorHandling = content.includes('throw new Error') && content.includes('Missing');
  console.log(`  ${hasErrorHandling ? '✅' : '❌'} Environment variable validation`);
  
  // Check for auth configuration
  const hasAuthConfig = content.includes('auth:') && content.includes('autoRefreshToken');
  console.log(`  ${hasAuthConfig ? '✅' : '❌'} Authentication configuration`);
  
  // Check for debug mode
  const hasDebug = content.includes('debug:');
  console.log(`  ${hasDebug ? '✅' : '❌'} Debug mode configuration`);
} else {
  console.log('  ❌ Supabase client file not found');
}

// Check AuthContext configuration
console.log('\n🔐 Checking AuthContext configuration:');
const authContextPath = path.join(__dirname, '..', 'context', 'AuthContext.tsx');
if (fs.existsSync(authContextPath)) {
  const content = fs.readFileSync(authContextPath, 'utf8');
  
  // Check for EMAIL_AUTH_ENABLED
  const hasEmailAuth = content.includes('EMAIL_AUTH_ENABLED');
  console.log(`  ${hasEmailAuth ? '✅' : '❌'} Email authentication flag`);
  
  // Check for mobile authentication
  const hasMobileAuth = content.includes('@mobile.user');
  console.log(`  ${hasMobileAuth ? '✅' : '❌'} Mobile authentication support`);
  
  // Check for auto user creation
  const hasAutoCreation = content.includes('createUserProfile');
  console.log(`  ${hasAutoCreation ? '✅' : '❌'} Automatic user profile creation`);
} else {
  console.log('  ❌ AuthContext file not found');
}

console.log('\n📊 Summary:');
console.log('If you see 422 errors in your Supabase logs, the most likely causes are:');
console.log('1. Missing .env.local file with Supabase credentials');
console.log('2. Incorrect Supabase URL or API key');
console.log('3. Supabase project not properly configured');

console.log('\n🛠️  Next Steps:');
console.log('1. Follow the SUPABASE_AUTH_FIX_GUIDE.md instructions');
console.log('2. Create .env.local with your Supabase credentials');
console.log('3. Restart your development server');
console.log('4. Test authentication functionality');

console.log('\n✨ Your F1 Mart app supports:');
console.log('- Mobile number authentication (9876543210@mobile.user)');
console.log('- Email authentication');
console.log('- Automatic user creation');
console.log('- Telangana state-wide delivery');
console.log('- Cash on delivery payments');
