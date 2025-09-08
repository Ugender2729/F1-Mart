@echo off
echo 🚀 Preparing F1 Mart for Netlify deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build the project
echo 🔨 Building the project...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo.
    echo 🎉 Your F1 Mart application is ready for Netlify deployment!
    echo.
    echo Next steps:
    echo 1. Go to https://netlify.com and sign in
    echo 2. Click 'New site from Git'
    echo 3. Connect your GitHub repository
    echo 4. Set build command: npm run build
    echo 5. Set publish directory: .next
    echo 6. Add environment variables:
    echo    - NEXT_PUBLIC_SUPABASE_URL
    echo    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    echo 7. Deploy!
    echo.
    echo 📖 For detailed instructions, see NETLIFY_DEPLOYMENT_GUIDE.md
) else (
    echo ❌ Build failed. Please check the errors above.
)

pause
