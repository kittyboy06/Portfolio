#!/bin/bash

# Function to pause execution and wait for user input (only if stdin is a terminal)
pause() {
  if [ -t 0 ]; then
    read -n 1 -s -r -p "Press any key to continue . . . "
    echo ""
  fi
}

echo "======================================="
echo "RPG PORTFOLIO: INITIATING SYSTEM BUILD"
echo "======================================="
npm run build
BUILD_STATUS=$?
if [ $BUILD_STATUS -ne 0 ]; then
  echo "======================================="
  echo "[ERROR] BUILD FAILED! DEPLOY ABORTED."
  echo "======================================="
  pause
  exit $BUILD_STATUS
fi

echo "======================================="
echo "RPG PORTFOLIO: SYNCING DIST TO GITHUB PAGES"
echo "======================================="
# Clear gh-pages cache to prevent branch conflicts and stale remote ref errors
rm -rf node_modules/.cache/gh-pages
npx gh-pages -d dist
DEPLOY_STATUS=$?
if [ $DEPLOY_STATUS -ne 0 ]; then
  echo "======================================="
  echo "[ERROR] DEPLOY TO GITHUB PAGES FAILED!"
  echo "======================================="
  pause
  exit $DEPLOY_STATUS
fi

echo "======================================="
echo "[SUCCESS] DUNGEON OVERWORLD FULLY DEPLOYED!"
echo "======================================="
pause
