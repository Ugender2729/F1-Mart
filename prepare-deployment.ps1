# PowerShell script to prepare files for Netlify manual deployment
Write-Host "🚀 Preparing Grocery Store for Netlify Deployment..." -ForegroundColor Green

# Create deployment directory
if (Test-Path "netlify-deploy") {
    Remove-Item "netlify-deploy" -Recurse -Force
}
New-Item -ItemType Directory -Name "netlify-deploy"

Write-Host "📁 Copying essential files..." -ForegroundColor Yellow

# Copy essential directories
$directories = @("app", "components", "context", "data", "hooks", "lib", "types")
foreach ($dir in $directories) {
    if (Test-Path $dir) {
        Copy-Item -Path $dir -Destination "netlify-deploy\$dir" -Recurse
        Write-Host "✅ Copied $dir" -ForegroundColor Green
    }
}

# Copy essential files
$files = @("package.json", "next.config.js", "netlify.toml", "tailwind.config.ts", "tsconfig.json", "postcss.config.js", "components.json")
foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination "netlify-deploy\$file"
        Write-Host "✅ Copied $file" -ForegroundColor Green
    }
}

# Copy .next build directory
if (Test-Path ".next") {
    Copy-Item -Path ".next" -Destination "netlify-deploy\.next" -Recurse
    Write-Host "✅ Copied .next build directory" -ForegroundColor Green
}

# Create .env.example
@"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
"@ | Out-File -FilePath "netlify-deploy\.env.example" -Encoding UTF8

Write-Host "✅ Created .env.example" -ForegroundColor Green

# Create deployment instructions
@"
# 🚀 Netlify Manual Deployment Instructions

## 📦 What's Included:
- ✅ Complete Next.js application
- ✅ All source code and components
- ✅ Build configuration files
- ✅ Netlify configuration (netlify.toml)
- ✅ Package.json with all dependencies

## 🚀 Deployment Steps:

### Option 1: Drag & Drop to Netlify
1. Go to https://netlify.com
2. Sign up/Login
3. Drag the entire 'netlify-deploy' folder to the deploy area
4. Wait for deployment to complete

### Option 2: Manual Upload
1. Go to https://netlify.com
2. Click 'New site from Git'
3. Choose 'Deploy manually'
4. Upload the 'netlify-deploy' folder as a ZIP file

## ⚙️ After Deployment:
1. Go to Site Settings → Environment Variables
2. Add these variables:
   - NEXT_PUBLIC_SUPABASE_URL: your_supabase_url
   - NEXT_PUBLIC_SUPABASE_ANON_KEY: your_supabase_key
3. Redeploy the site

## 🎯 Your app will be available at:
https://your-site-name.netlify.app

## 📱 Features Included:
- ✅ User Authentication (Mobile + Password)
- ✅ Product Catalog (17 categories, 50+ products)
- ✅ Shopping Cart
- ✅ Checkout & Orders
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Dark Theme

Happy Deploying! 🎉
"@ | Out-File -FilePath "netlify-deploy\DEPLOYMENT_INSTRUCTIONS.md" -Encoding UTF8

Write-Host "✅ Created deployment instructions" -ForegroundColor Green

Write-Host "🎉 Deployment package ready!" -ForegroundColor Green
Write-Host "📁 Location: netlify-deploy folder" -ForegroundColor Cyan
Write-Host "📖 Instructions: netlify-deploy\DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://netlify.com" -ForegroundColor White
Write-Host "2. Drag the 'netlify-deploy' folder to deploy" -ForegroundColor White
Write-Host "3. Add your Supabase environment variables" -ForegroundColor White
Write-Host "4. Your grocery store will be live! 🚀" -ForegroundColor White
