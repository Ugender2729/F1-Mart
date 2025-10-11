-- Maximize Token Time Settings
-- Run this in your Supabase SQL Editor

-- Note: Supabase doesn't use auth.config table
-- Token settings are configured in the Supabase Dashboard
-- This script shows you what settings to configure manually

-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication → Settings
-- 3. Configure these settings:

-- JWT Settings:
-- - JWT expiry: 3600 seconds (1 hour)
-- - Refresh token expiry: 25920000 seconds (30 days) - MAXIMUM

-- Authentication Settings:
-- - Enable signup: TRUE
-- - Enable email confirmations: FALSE (for immediate signup)
-- - Enable phone confirmations: FALSE

-- Alternative: Use Supabase Management API (if you have access)
-- This is for reference only - you need to configure via Dashboard

-- Check current auth settings (this should work)
SELECT 
  key,
  value
FROM auth.config 
WHERE key IN (
  'JWT_EXP',
  'REFRESH_TOKEN_EXP', 
  'ENABLE_SIGNUP',
  'ENABLE_EMAIL_CONFIRMATIONS',
  'ENABLE_PHONE_CONFIRMATIONS'
);

-- If the above doesn't work, try this approach:
-- Check what auth configuration tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
AND table_name LIKE '%config%';

-- Show all auth tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth';
