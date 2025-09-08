#!/bin/bash

# F1 Mart - Netlify Deployment Script
echo "🚀 Preparing F1 Mart for Netlify deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your F1 Mart application is ready for Netlify deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://netlify.com and sign in"
    echo "2. Click 'New site from Git'"
    echo "3. Connect your GitHub repository"
    echo "4. Set build command: npm run build"
    echo "5. Set publish directory: .next"
    echo "6. Add environment variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "7. Deploy!"
    echo ""
    echo "📖 For detailed instructions, see NETLIFY_DEPLOYMENT_GUIDE.md"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
