# 🔧 Supabase Authentication Fix Guide

## Problem Identified
Your Supabase logs show **422 errors** on `/auth/v1/token` requests, indicating authentication configuration issues.

## Root Cause
- Missing or incorrect Supabase environment variables
- Authentication requests failing due to invalid credentials

## Solution Steps

### 1. Create Environment File
Create a `.env.local` file in your project root with your Supabase credentials:

```bash
# Copy the template
cp .env.template .env.local
```

### 2. Get Your Supabase Credentials
1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your F1 Mart project
3. Go to **Settings** → **API**
4. Copy the following values:

```env
# Your Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase Anon Key  
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Update .env.local File
Replace the placeholder values in `.env.local` with your actual credentials.

### 4. Restart Development Server
```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### 5. Verify Authentication
- Check your browser console for any remaining auth errors
- Test user registration/login functionality
- Monitor Supabase logs - 422 errors should disappear

## Authentication Features in F1 Mart

Your app supports:
- ✅ **Mobile Number Authentication** (primary method)
- ✅ **Email Authentication** (enabled)
- ✅ **Automatic User Creation** for mobile users
- ✅ **User Profile Management**

## Mobile Authentication Format
Users can sign up with mobile numbers using this format:
- **Email**: `9876543210@mobile.user`
- **Password**: Any password (minimum 6 characters)

## Troubleshooting

### If 422 errors persist:
1. **Check Supabase Project Status** - Ensure your project is active
2. **Verify API Keys** - Make sure you copied the correct keys
3. **Check Row Level Security** - Ensure RLS policies are properly configured
4. **Clear Browser Cache** - Clear cookies and local storage

### Common Issues:
- **Invalid URL format**: Must start with `https://` and end with `.supabase.co`
- **Wrong API key**: Use the `anon` key, not the `service_role` key
- **Missing environment variables**: Restart server after adding `.env.local`

## Database Tables Required
Ensure these tables exist in your Supabase database:
- `users` - User profiles
- `orders` - Order management
- `products` - Product catalog
- `categories` - Product categories

## Next Steps
After fixing the environment variables:
1. Test user registration
2. Test user login
3. Test order creation
4. Monitor Supabase logs for successful requests

---
**Note**: The 422 errors in your logs indicate the authentication system is trying to work but failing due to configuration issues. This fix should resolve all authentication-related problems.
