-- Check current refresh tokens in your database
-- This will show you the token expiry settings

-- Check refresh tokens table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_schema = 'auth' 
AND table_name = 'refresh_tokens'
ORDER BY ordinal_position;

-- Check current refresh tokens (if any) - using correct column names
SELECT 
  id,
  user_id,
  created_at,
  updated_at,
  token_hash
FROM auth.refresh_tokens 
ORDER BY created_at DESC 
LIMIT 10;

-- Check token count and basic info
SELECT 
  COUNT(*) as total_tokens,
  MIN(created_at) as earliest_token,
  MAX(created_at) as latest_token
FROM auth.refresh_tokens;

-- Check if there are any active sessions (based on creation time)
SELECT 
  COUNT(*) as total_tokens,
  COUNT(CASE WHEN created_at > NOW() - INTERVAL '30 days' THEN 1 END) as recent_tokens
FROM auth.refresh_tokens;
