# 🚀 Grocery Store Deployment Guide

This guide will help you deploy your Next.js grocery store application to production.

## 📋 Prerequisites

1. **Supabase Project**: Make sure your Supabase project is set up with all the required tables
2. **GitHub Account**: For version control and deployment
3. **Vercel Account**: For easy deployment (recommended)
4. **Environment Variables**: Your Supabase credentials

## 🔧 Environment Variables Setup

### Required Variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables:
```bash
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXTAUTH_URL=your_production_domain
NEXTAUTH_SECRET=your_nextauth_secret_key
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/gorcery-store.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

3. **Configure Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Redeploy

### Option 2: Netlify

1. **Build Configuration**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `18.x`

2. **Environment Variables**:
   - Add in Netlify dashboard under Site Settings → Environment Variables

### Option 3: Railway

1. **Connect GitHub**:
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add environment variables
   - Deploy

### Option 4: Self-Hosted (VPS/Server)

1. **Prepare Server**:
   ```bash
   # Install Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 for process management
   npm install -g pm2
   ```

2. **Deploy Application**:
   ```bash
   # Clone repository
   git clone https://github.com/yourusername/gorcery-store.git
   cd gorcery-store
   
   # Install dependencies
   npm install
   
   # Create production environment file
   cp .env.example .env.local
   # Edit .env.local with your production values
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "gorcery-store" -- start
   pm2 save
   pm2 startup
   ```

## 🗄️ Database Setup

### 1. Run SQL Scripts in Supabase

Execute these SQL scripts in your Supabase SQL Editor:

1. **Schema Setup**: `database/schema.sql`
2. **Update Orders Schema**: `database/update_orders_schema.sql`
3. **Phone Required Policies**: `database/phone_required_rls_policies.sql`

### 2. Verify Tables

Make sure these tables exist in your Supabase database:
- `products`
- `categories`
- `users`
- `orders`

## 🔒 Security Checklist

- [ ] Environment variables are properly set
- [ ] Supabase RLS policies are configured
- [ ] Admin credentials are secure
- [ ] HTTPS is enabled
- [ ] CORS is properly configured

## 📊 Performance Optimization

### 1. Enable Caching
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

### 2. Database Indexing
Make sure your Supabase tables have proper indexes for performance.

## 🧪 Testing Before Deployment

1. **Local Production Build**:
   ```bash
   npm run build
   npm start
   ```

2. **Test All Features**:
   - User registration/login
   - Product browsing
   - Cart functionality
   - Checkout process
   - Admin dashboard
   - Order management

## 🚨 Troubleshooting

### Common Issues:

1. **Build Errors**:
   - Check all imports are correct
   - Verify environment variables
   - Run `npm run lint` to check for errors

2. **Database Connection Issues**:
   - Verify Supabase URL and keys
   - Check RLS policies
   - Ensure tables exist

3. **Image Loading Issues**:
   - Update `next.config.js` with image domains
   - Check image URLs are accessible

## 📈 Post-Deployment

1. **Monitor Performance**:
   - Check Vercel/Netlify analytics
   - Monitor Supabase usage
   - Set up error tracking

2. **SEO Setup**:
   - Add meta tags
   - Set up sitemap
   - Configure robots.txt

3. **Backup Strategy**:
   - Regular database backups
   - Code repository backups
   - Environment variable backups

## 🎉 Success!

Your grocery store should now be live and accessible to users!

### Next Steps:
- Set up custom domain
- Configure analytics
- Set up monitoring
- Plan for scaling

## 📞 Support

If you encounter any issues during deployment, check:
1. Vercel/Netlify deployment logs
2. Supabase logs
3. Browser console for errors
4. Network tab for failed requests


