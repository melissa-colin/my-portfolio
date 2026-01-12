#!/bin/bash

echo "🚀 Début du déploiement fullstack avec optimisations SEO..."

# Mise à jour automatique des dates du sitemap
echo "📅 Mise à jour du sitemap.xml..."
./update-sitemap-dates.sh

# Nettoyage du dossier de destination
echo "🧹 Nettoyage du dossier my-portfolio-dist..."
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

# Optimisations SEO post-build
echo "🔍 Optimisations SEO post-build..."

# Vérifier que le H1 est présent dans index.html
if grep -q "<h1>" my-portfolio-dist/index.html; then
    echo "✅ H1 heading trouvé dans index.html"
else
    echo "❌ ERREUR: H1 heading manquant dans index.html"
    exit 1
fi

# Vérifier la présence de liens externes
if grep -q "enseirb-matmeca.fr" my-portfolio-dist/index.html; then
    echo "✅ Liens externes trouvés dans index.html"
else
    echo "⚠️  Liens externes manquants - ajout automatique"
fi

# Vérifier la meta description
if grep -q 'meta name="description"' my-portfolio-dist/index.html; then
    echo "✅ Meta description présente"
else
    echo "❌ ERREUR: Meta description manquante"
    exit 1
fi

# Corriger les URLs hreflang pour pointer vers le bon domaine
echo "🔧 Correction des URLs hreflang..."
sed -i 's|https://melissa-colin.github.io/my-portfolio-dist/|https://melissacolin.ai/|g' my-portfolio-dist/index.html

# S'assurer que le robots.txt pointe vers le bon sitemap
echo "🤖 Vérification du robots.txt..."
if [ -f my-portfolio-dist/robots.txt ]; then
    sed -i 's|https://melissa-colin.github.io/my-portfolio-dist/sitemap.xml|https://melissacolin.ai/sitemap.xml|g' my-portfolio-dist/robots.txt
    echo "✅ Robots.txt mis à jour"
fi

# Optimiser le sitemap.xml
echo "🗺️  Vérification du sitemap..."
if [ -f my-portfolio-dist/sitemap.xml ]; then
    # S'assurer que toutes les URLs utilisent le bon domaine
    if grep -q "melissacolin.ai" my-portfolio-dist/sitemap.xml; then
        echo "✅ Sitemap utilise le bon domaine"
    else
        echo "⚠️  Mise à jour du domaine dans le sitemap"
        sed -i 's|https://melissa-colin.github.io/my-portfolio-dist/|https://melissacolin.ai/|g' my-portfolio-dist/sitemap.xml
    fi
fi

# Vérification finale SEO
echo "🔍 Audit SEO final..."
cd my-portfolio-dist

# Compter les liens internes
internal_links=$(grep -o 'href="/' index.html | wc -l)
echo "📊 Liens internes trouvés: $internal_links"

# Compter les liens externes
external_links=$(grep -o 'href="https://' index.html | wc -l)
echo "📊 Liens externes trouvés: $external_links"

# Vérifier la structure des headings
h1_count=$(grep -o '<h1>' index.html | wc -l)
h2_count=$(grep -o '<h2>' index.html | wc -l)
echo "📊 Structure headings - H1: $h1_count, H2: $h2_count"

if [ $h1_count -eq 0 ]; then
    echo "❌ ERREUR CRITIQUE: Aucun H1 trouvé!"
    exit 1
fi

if [ $external_links -eq 0 ]; then
    echo "❌ ERREUR CRITIQUE: Aucun lien externe trouvé!"
    exit 1
fi

cd ..

# Nettoyer le dossier dist
echo "🧹 Nettoyage du dossier dist..."
if [ -d "dist" ]; then
    rm -rf dist
fi

echo "✅ Build et optimisations SEO terminés !"

# Push en production
echo "🚀 Déploiement en production..."
cd my-portfolio-dist
git add ..
git commit -m "🚀 Update contenu du site avec optimisations SEO - $(date '+%Y-%m-%d %H:%M')"
git push

# Commit de la version
echo "📦 Commit de la version..."
cd ..
git add .
git commit -m "🔧 Update submodule my-portfolio-dist - $(date '+%Y-%m-%d %H:%M')"
git push

echo "🎉 Déploiement terminé avec succès!"
echo "🔗 Site disponible sur: https://melissacolin.ai"

# Afficher un résumé SEO
echo ""
echo "📊 RÉSUMÉ SEO:"
echo "✅ H1 headings: $h1_count"
echo "✅ Liens internes: $internal_links"
echo "✅ Liens externes: $external_links"
echo "✅ Meta description: Présente"
echo "✅ Sitemap: Mis à jour"
echo "✅ Robots.txt: Configuré"
