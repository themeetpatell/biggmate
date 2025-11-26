@echo off
echo ========================================
echo Fixing React Multiple Instances Issue
echo ========================================
echo.

cd /d E:\business\Startup\biggmate

echo Step 1: Stopping any running dev servers...
echo Please make sure to stop your dev server (Ctrl+C) before continuing!
pause

echo.
echo Step 2: Removing node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo node_modules deleted successfully
) else (
    echo node_modules not found, skipping...
)

echo.
echo Step 3: Removing package-lock.json...
if exist package-lock.json (
    del /f package-lock.json
    echo package-lock.json deleted successfully
) else (
    echo package-lock.json not found, skipping...
)

echo.
echo Step 4: Clearing npm cache...
call npm cache clean --force

echo.
echo Step 5: Installing dependencies...
call npm install

echo.
echo ========================================
echo Installation complete!
echo ========================================
echo.
echo Now you can start your dev server with: npm run dev
echo.
pause
