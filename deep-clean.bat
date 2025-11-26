@echo off
echo ========================================
echo DEEP CLEAN - Fixing React Issues
echo ========================================
echo.

cd /d E:\business\Startup\biggmate

echo Step 1: Stopping dev server (if running)
echo Please make sure dev server is stopped (Ctrl+C)!
pause

echo.
echo Step 2: Removing node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo ✓ node_modules deleted
)

echo.
echo Step 3: Removing package-lock.json...
if exist package-lock.json (
    del /f package-lock.json
    echo ✓ package-lock.json deleted
)

echo.
echo Step 4: Removing Vite cache...
if exist node_modules\.vite (
    rmdir /s /q node_modules\.vite
    echo ✓ Vite cache deleted
)
if exist .vite (
    rmdir /s /q .vite
    echo ✓ .vite folder deleted
)

echo.
echo Step 5: Clearing npm cache...
call npm cache clean --force
echo ✓ npm cache cleared

echo.
echo Step 6: Clearing browser cache...
echo Please clear your browser cache (Ctrl+Shift+Delete) and reload!

echo.
echo Step 7: Installing dependencies...
call npm install

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo Next steps:
echo 1. Clear your browser cache (Ctrl+Shift+Delete)
echo 2. Hard reload the page (Ctrl+Shift+R)
echo 3. Run: npm run dev
echo.
pause
