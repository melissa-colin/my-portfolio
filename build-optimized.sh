#!/bin/bash

echo "🚀 Optimisation complète du site..."

# 1. Optimiser les images
echo "📸 Optimisation des images..."
./optimize-images.sh

# 2. Nettoyer les dépendances
echo "🧹 Nettoyage des dépendances..."
rm -rf node_modules/.cache
rm -rf dist

# 3. Installer les dépendances si nécessaire
echo "📦 Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    pnpm install
fi

# 4. Build avec optimisation
echo "🏗️ Build avec optimisations..."
NODE_ENV=production pnpm run build

# 5. Analyser la taille des bundles
echo "📊 Analyse de la taille des bundles..."
echo "Taille totale du dossier dist:"
du -sh dist

echo "Détail des assets:"
find dist -name "*.js" -o -name "*.css" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  $size - $(basename "$file")"
done

echo "✅ Optimisation terminée!"
echo "🎯 Recommandations:"
echo "  - Vérifiez que les images ne dépassent pas 500KB"
echo "  - Le bundle JS principal devrait être < 1MB"
echo "  - Utilisez un CDN pour servir les assets statiques"
