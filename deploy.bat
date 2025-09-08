@echo off
echo 🚀 Starting deployment process...

REM Check if .env.local exists
if not exist .env.local (
    echo ❌ .env.local file not found!
    echo Please create .env.local with your Supabase credentials:
    echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Build the application
echo 🔨 Building application...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo.
    echo 🎉 Your application is ready for deployment!
    echo.
    echo Next steps:
    echo 1. Push to GitHub: git add . ^&^& git commit -m "Ready for deployment" ^&^& git push
    echo 2. Deploy to Vercel: https://vercel.com/new
    echo 3. Add environment variables in Vercel dashboard
    echo 4. Your app will be live at https://your-app.vercel.app
    echo.
    echo 📚 See DEPLOYMENT.md for detailed instructions
) else (
    echo ❌ Build failed! Please check the errors above.
    pause
    exit /b 1
)

pause


