#!/bin/bash

echo "🚀 Starting deployment preparation process..."

# Cleaning previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf dist

# Installing dependencies
echo "📦 Installing dependencies..."
pnpm install

# Linting the code
echo "🔍 Linting the code..."
pnpm run lint

# Building the project
echo "🏗️ Building the project..."
pnpm run build

echo "✅ Build process completed successfully!"

echo "📂 The following files are ready for deployment:"
ls -la dist

echo "
📋 Deployment Instructions:
1. Upload all files from the 'dist' directory to your Hostinger server
2. Make sure the .htaccess file is included
3. Point your domain to the uploaded directory
"

echo "🌐 For GitHub deployment:
1. Commit your changes: git add . && git commit -m 'Prepare for deployment'
2. Push to GitHub: git push origin main
3. If using GitHub Pages, configure it to deploy from the /dist folder
"
