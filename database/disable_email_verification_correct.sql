-- CORRECT WAY TO DISABLE EMAIL VERIFICATION
-- This SQL won't work because auth.config is not accessible via SQL editor
-- Instead, use the Supabase Dashboard:

-- 1. Go to: https://supabase.com/dashboard
-- 2. Select your project
-- 3. Go to: Authentication → Settings
-- 4. Find: "Email" section
-- 5. Uncheck: "Enable email confirmations"
-- 6. Save the changes

-- Alternative: Check if we can access auth settings through other means
-- This query will show available tables in the auth schema
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth';

-- Check if there are any config-related tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' 
AND table_name LIKE '%config%';

