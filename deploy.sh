#!/bin/bash

echo "🚀 Début du déploiement fullstack..."

# Copier le .git du submodule "dist" dans un dossier temporaire
echo "🔄 Mise à jour du submodule dist..."

cp dist/.git tmp.git

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

# Restauration du .git dans dist
echo "🔄 Restauration du .git dans dist..."
cp tmp.git dist/.git
cp README.md dist/README.md
rm tmp.git

echo "✅ Build terminé !"
echo "Le dossier dist/ contient le frontend ET le backend prêt à être uploadé sur le serveur."

# Push en production
echo "🚀 Déploiement en production..."
cd dist
git add .
git commit -m "Update contenu du dist"
git push

# Commit de la version
echo "📦 Commit de la version..."
cd ..
git add .
git commit -m "Update"
git push
