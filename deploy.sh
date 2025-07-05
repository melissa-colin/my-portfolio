#!/bin/bash

echo "🚀 Début du déploiement fullstack..."

# Copier le .git du submodule "dist" dans un dossier temporaire
echo "🔄 Mise à jour du submodule dist..."


# Nettoyage
find my-portfolio-dist -mindepth 1 ! -name '.git' -exec rm -rf {} +
if [ -d "dist" ]; then
    rm -rf dist
fi

# Build frontend avec optimisations
echo "🏗️ Build du frontend optimisé..."
pnpm install
./build-optimized.sh

# Copier le contenu de dist dans my-portfolio-dist
echo "📦 Copie du contenu du dossier dist dans my-portfolio-dist..."
cp -r dist/* my-portfolio-dist/

# Nettoyer le dossier dist
echo "🧹 Nettoyage du dossier dist..."
if [ -d "dist" ]; then
    rm -rf dist
fi

echo "✅ Build terminé !"


# Push en production
echo "🚀 Déploiement en production..."
cd my-portfolio-dist
git add .
git commit -m "Update contenu du site"
git push

# Commit de la version
echo "📦 Commit de la version..."
cd ..
git add .
git commit -m "Update submodule my-portfolio-dist"
git push
