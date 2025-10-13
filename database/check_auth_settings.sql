-- Check Supabase Auth Settings
-- Run this to see what auth configuration is available

-- Check what auth tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
ORDER BY table_name;

-- Check if there's a configuration table
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
AND table_name LIKE '%config%';

-- Check auth policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'auth'
LIMIT 10;

-- Check current JWT settings (if available)
SELECT 
  name,
  setting
FROM pg_settings 
WHERE name LIKE '%jwt%' 
OR name LIKE '%token%'
OR name LIKE '%auth%';

-- Show current user and database info
SELECT 
  current_user,
  current_database(),
  version();




