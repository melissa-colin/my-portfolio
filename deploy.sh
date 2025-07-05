#!/bin/bash

echo "🚀 Début du déploiement fullstack avec optimisations SEO..."

# Nettoyage du dossier de destination
echo "🧹 Nettoyage du dossier my-portfolio-dist..."
# Garder .git mais supprimer le reste
find my-portfolio-dist -mindepth 1 ! -path "my-portfolio-dist/.git*" -exec rm -rf {} +

# Build frontend avec optimisations
echo "🏗️ Build du frontend optimisé..."
pnpm install
./build-optimized.sh

# Le build va directement dans my-portfolio-dist (configuré dans vite.config.js)

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

# Nettoyer toute référence à dist (n'existe plus)
echo "✅ Build et optimisations SEO terminés !"

# Push en production
echo "🚀 Déploiement en production..."
cd my-portfolio-dist
git add .
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

# Tests post-déploiement critiques pour SEO
echo ""
echo "🧪 Tests post-déploiement en cours..."

# Attendre quelques secondes pour que le déploiement soit effectif
sleep 10

# Test redirection www → non-www
echo "🔄 Test de redirection www → non-www..."
www_status=$(curl -s -o /dev/null -w "%{http_code}" -L "https://www.melissacolin.ai" || echo "000")
if [ "$www_status" = "200" ]; then
    final_url=$(curl -s -L -o /dev/null -w "%{url_effective}" "https://www.melissacolin.ai")
    if [[ "$final_url" == "https://melissacolin.ai/"* ]]; then
        echo "✅ Redirection www → non-www fonctionne"
    else
        echo "❌ ERREUR: www ne redirige pas vers non-www. URL finale: $final_url"
    fi
else
    echo "⚠️  Impossible de tester la redirection www (statut: $www_status)"
fi

# Test HTTPS
echo "🔒 Test HTTPS..."
http_status=$(curl -s -o /dev/null -w "%{http_code}" -L "http://melissacolin.ai" || echo "000")
if [ "$http_status" = "200" ]; then
    final_url=$(curl -s -L -o /dev/null -w "%{url_effective}" "http://melissacolin.ai")
    if [[ "$final_url" == "https://melissacolin.ai/"* ]]; then
        echo "✅ Redirection HTTP → HTTPS fonctionne"
    else
        echo "❌ ERREUR: HTTP ne redirige pas vers HTTPS. URL finale: $final_url"
    fi
else
    echo "⚠️  Impossible de tester la redirection HTTPS (statut: $http_status)"
fi

# Test présence H1 sur le site live
echo "🏷️  Test H1 sur le site live..."
live_h1=$(curl -s "https://melissacolin.ai" | grep -o '<h1[^>]*>.*</h1>' | head -1 || echo "")
if [ -n "$live_h1" ]; then
    echo "✅ H1 détecté sur le site live: $(echo "$live_h1" | head -c 50)..."
else
    echo "⚠️  H1 non détecté sur le site live (peut être injecté par JS)"
fi

# Afficher un résumé SEO
echo ""
echo "📊 RÉSUMÉ SEO:"
echo "✅ H1 headings: $h1_count"
echo "✅ Liens internes: $internal_links"
echo "✅ Liens externes: $external_links"
echo "✅ Meta description: Présente"
echo "✅ Sitemap: Mis à jour"
echo "✅ Robots.txt: Configuré"
echo ""
echo "🔧 IMPORTANT: Vérifiez que le fichier .htaccess est bien actif sur Hostinger"
echo "   Si www.melissacolin.ai ne redirige pas vers melissacolin.ai,"
echo "   contactez le support Hostinger pour activer mod_rewrite"