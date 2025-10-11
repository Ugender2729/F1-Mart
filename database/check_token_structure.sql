-- Check the actual structure of refresh_tokens table
-- This will show you what columns are available

-- First, let's see what columns exist in refresh_tokens
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'refresh_tokens'
ORDER BY ordinal_position;

-- Check if there are any tokens at all
SELECT COUNT(*) as total_refresh_tokens
FROM auth.refresh_tokens;

-- If there are tokens, show a sample
SELECT *
FROM auth.refresh_tokens 
LIMIT 3;

-- Check users table structure too (for reference)
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'users'
ORDER BY ordinal_position;


