@echo off
setlocal enabledelayedexpansion

echo =======================================
echo RPG PORTFOLIO: INITIATING SYSTEM BUILD
echo =======================================
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo =======================================
    echo [ERROR] BUILD FAILED! DEPLOY ABORTED.
    echo =======================================
    pause
    exit /b %ERRORLEVEL%
)

echo =======================================
echo RPG PORTFOLIO: SYNCING DIST TO GITHUB PAGES
echo =======================================
if exist "node_modules\.cache\gh-pages" (
    rmdir /s /q "node_modules\.cache\gh-pages"
)

call npx gh-pages -d dist
if %ERRORLEVEL% NEQ 0 (
    echo =======================================
    echo [ERROR] DEPLOY TO GITHUB PAGES FAILED!
    echo =======================================
    pause
    exit /b %ERRORLEVEL%
)

echo =======================================
echo [SUCCESS] DUNGEON OVERWORLD FULLY DEPLOYED!
echo =======================================
pause
