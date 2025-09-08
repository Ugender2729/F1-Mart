# F1 Mart - Netlify Deployment Guide

## Prerequisites
- GitHub repository with your F1 Mart code
- Supabase project set up
- Netlify account

## Step 1: Environment Variables Setup

You need to set up these environment variables in Netlify:

### Required Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to get Supabase credentials:
1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "Project URL" and "anon public" key

## Step 2: Deploy to Netlify

### Option A: Deploy from GitHub (Recommended)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify
4. Select your `F1-Mart` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18
6. Add environment variables in Site settings > Environment variables
7. Click "Deploy site"

### Option B: Deploy with Netlify CLI (Manual)
1. Build your project locally: `npm run build`
2. Install CLI (one-time): `npm i -g netlify-cli`
3. Log in: `netlify login`
4. Link to your site: `netlify link` (choose existing or create new)
5. Deploy to production: `netlify deploy --build --prod`

Note: Netlify Drop (drag-and-drop) is not suitable for Next.js apps because the platform needs to run the build.

## Step 3: Configure Environment Variables in Netlify

1. Go to your site dashboard in Netlify
2. Navigate to Site settings > Environment variables
3. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Redeploy your site

## Step 4: Database Setup

Make sure your Supabase database is properly configured:
1. Run the SQL scripts from the `database/` folder in your Supabase SQL editor
2. Start with `schema.sql` for basic structure
3. Run `fix_orders_table.sql` for order functionality

## Step 5: Test Your Deployment

1. Visit your Netlify site URL
2. Test key functionality:
   - Browse products
   - Add items to cart
   - Place an order
   - Check order history
   - Admin dashboard (if applicable)

## Troubleshooting

### Common Issues:
1. **Build fails**: Check environment variables are set correctly
2. **Database errors**: Verify Supabase credentials and database setup
3. **404 errors**: Check Netlify redirects configuration
4. **Authentication issues**: Verify Supabase auth settings

### Build Logs:
- Check Netlify build logs for detailed error messages
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

## Performance Optimization

1. **Image Optimization**: Use Next.js Image component
2. **Caching**: Configure proper cache headers
3. **CDN**: Netlify provides global CDN automatically
4. **Compression**: Enable gzip compression

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to Git
2. **CORS**: Configure Supabase CORS settings for your domain
3. **Headers**: Security headers are configured in netlify.toml
4. **HTTPS**: Netlify provides SSL certificates automatically

## Custom Domain (Optional)

1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS settings as instructed
4. Enable SSL certificate

## Monitoring and Analytics

1. **Netlify Analytics**: Enable in site settings
2. **Error Tracking**: Monitor build and runtime errors
3. **Performance**: Use Netlify's performance insights

---

Your F1 Mart application should now be live on Netlify! 🚀
