#!/bin/bash

echo "🚀 Début du déploiement fullstack..."

# Nettoyage
rm -rf dist

# Build frontend
echo "🏗️ Build du frontend..."
pnpm install
pnpm run build

# Crée le dossier backend dans dist
mkdir -p dist/backend

# Copie le backend (src, package.json, etc.)
echo "📦 Copie du backend..."
cp -r backend/src dist/backend/
cp backend/package.json dist/backend/
cp backend/pnpm-lock.yaml dist/backend/ 2>/dev/null || true
cp backend/.env dist/backend/ 2>/dev/null || true

# (Optionnel) Installer les dépendances backend dans dist/backend
cd dist/backend
pnpm install --prod
cd ../..

echo "✅ Build terminé !"
echo "Le dossier dist/ contient le frontend ET le backend prêt à être uploadé sur le serveur."