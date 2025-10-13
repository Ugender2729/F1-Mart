# 🔧 Authentication Troubleshooting Guide

## Current Status
✅ **Environment Variables**: Properly configured  
✅ **Supabase Client**: Correctly set up  
✅ **AuthContext**: Mobile authentication enabled  
❌ **422 Errors**: Still occurring in Supabase logs  

## Likely Causes of 422 Errors

### 1. **Supabase Authentication Settings**
Your Supabase project might have restrictive authentication settings:

**Check in Supabase Dashboard:**
1. Go to **Authentication** → **Settings**
2. Look for these settings:

#### Email Confirmation
- **Issue**: If "Enable email confirmations" is ON, users must verify email before login
- **Fix**: Turn OFF email confirmations for mobile authentication
- **Location**: Authentication → Settings → Email → "Enable email confirmations"

#### Email Templates
- **Issue**: Custom email templates might be causing issues
- **Fix**: Use default templates or ensure custom ones are valid
- **Location**: Authentication → Email Templates

### 2. **Rate Limiting**
- **Issue**: Too many authentication attempts
- **Fix**: Wait a few minutes and try again
- **Check**: Supabase → Authentication → Settings → Rate Limiting

### 3. **User Creation Issues**
- **Issue**: Automatic user creation might be failing
- **Check**: Database → Users table permissions

## Quick Fixes to Try

### Fix 1: Disable Email Confirmation
```sql
-- Run this in Supabase SQL Editor
UPDATE auth.config 
SET email_confirm = false 
WHERE email_confirm = true;
```

### Fix 2: Check RLS Policies
```sql
-- Check if RLS is blocking user creation
SELECT * FROM auth.users LIMIT 1;

-- If this fails, you might need to adjust RLS policies
```

### Fix 3: Test Authentication Directly
```javascript
// Test in browser console on your app
const { data, error } = await supabase.auth.signUp({
  email: 'test@mobile.user',
  password: 'test123456'
});
console.log('Sign up result:', { data, error });
```

## Step-by-Step Debugging

### Step 1: Check Supabase Dashboard
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `dyoxctqjajjjuqqepdqc`
3. Go to **Authentication** → **Users**
4. Check if any users exist

### Step 2: Check Authentication Settings
1. Go to **Authentication** → **Settings**
2. Ensure these settings:
   - ✅ **Enable email confirmations**: OFF
   - ✅ **Enable phone confirmations**: OFF
   - ✅ **Enable anonymous sign-ins**: ON (optional)

### Step 3: Check API Logs
1. Go to **Logs** → **API**
2. Look for the specific 422 errors
3. Check the error details and request payload

### Step 4: Test with Simple Request
```bash
# Test with curl (replace with your actual credentials)
curl -X POST 'https://dyoxctqjajjjuqqepdqc.supabase.co/auth/v1/token?grant_type=password' \
  -H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5b3hjdHFqYWpqanVxcWVwZHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODUzMzIsImV4cCI6MjA3MjU2MTMzMn0.vqoqepR_rMZZgbYpXYoE_yt10n8LhVyfwPeWLq_3nlc' \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@mobile.user","password":"test123456"}'
```

## Common 422 Error Causes

| Error Code | Cause | Solution |
|------------|-------|----------|
| `422` | Invalid email format | Use proper email format |
| `422` | Password too weak | Use stronger password (6+ chars) |
| `422` | Email confirmation required | Disable email confirmation |
| `422` | Rate limit exceeded | Wait and retry |
| `422` | Invalid grant type | Check authentication method |

## Mobile Authentication Format
Your app expects this format for mobile users:
- **Email**: `9876543210@mobile.user`
- **Password**: Any password (6+ characters)

## Test Authentication Flow

### Test 1: User Registration
```javascript
// Test in browser console
const testSignUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: '9876543210@mobile.user',
    password: 'test123456',
    options: {
      data: {
        first_name: 'Test',
        last_name: 'User',
        mobile_number: '9876543210'
      }
    }
  });
  console.log('Sign up result:', { data, error });
};
testSignUp();
```

### Test 2: User Login
```javascript
// Test in browser console
const testSignIn = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: '9876543210@mobile.user',
    password: 'test123456'
  });
  console.log('Sign in result:', { data, error });
};
testSignIn();
```

## Next Steps
1. **Check Supabase Dashboard** authentication settings
2. **Disable email confirmation** if enabled
3. **Test authentication** with the scripts above
4. **Monitor logs** for successful requests
5. **Contact Supabase support** if issues persist

## Expected Behavior After Fix
- ✅ No more 422 errors in logs
- ✅ Users can register with mobile numbers
- ✅ Users can login successfully
- ✅ Orders can be created with user authentication

---
**Note**: The 422 errors suggest the authentication system is working but encountering validation issues. The fixes above should resolve most common causes.
