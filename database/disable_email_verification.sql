-- Disable email verification in Supabase
-- Run this in your Supabase SQL Editor

-- Update auth configuration to disable email confirmation
UPDATE auth.config 
SET 
  email_confirm = false,
  email_confirm_url = null,
  email_confirm_redirect_url = null
WHERE id = 'default';

-- Alternative approach: Update the auth settings directly
-- This might work if the above doesn't
UPDATE auth.config 
SET 
  email_confirm = false
WHERE id = 'default';

-- Check current auth configuration
SELECT * FROM auth.config WHERE id = 'default';
