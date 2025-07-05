#!/bin/bash

# Script d'audit SEO pour portfolio Mélissa Colin
# Ce script vérifie les éléments SEO essentiels

echo "🔍 Audit SEO - Portfolio Mélissa Colin"
echo "======================================"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# URL du site à tester
SITE_URL="https://melissacolin.ai"
DIST_DIR="./my-portfolio-dist"

echo ""
echo "📋 Vérification des fichiers essentiels..."

# Vérifier la présence des fichiers essentiels
check_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $description trouvé: $file"
    else
        echo -e "${RED}✗${NC} $description manquant: $file"
    fi
}

check_file "$DIST_DIR/robots.txt" "Robots.txt"
check_file "$DIST_DIR/sitemap.xml" "Sitemap XML"
check_file "$DIST_DIR/manifest.json" "Web App Manifest"
check_file "$DIST_DIR/index.html" "Page d'accueil"

echo ""
echo "🔎 Vérification du contenu HTML..."

if [ -f "$DIST_DIR/index.html" ]; then
    # Vérifier la meta description
    if grep -q 'meta name="description"' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Meta description présente"
        # Afficher la meta description
        meta_desc=$(grep -o 'meta name="description" content="[^"]*"' "$DIST_DIR/index.html" | sed 's/meta name="description" content="//g' | sed 's/"$//g')
        echo "  📝 Description: ${meta_desc:0:100}..."
    else
        echo -e "${RED}✗${NC} Meta description manquante"
    fi
    
    # Vérifier le titre
    if grep -q '<title>' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Titre présent"
        title=$(grep -o '<title>[^<]*</title>' "$DIST_DIR/index.html" | sed 's/<title>//g' | sed 's/<\/title>//g')
        echo "  📝 Titre: $title"
    else
        echo -e "${RED}✗${NC} Titre manquant"
    fi
    
    # Vérifier les meta robots
    if grep -q 'meta name="robots"' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Meta robots présent"
    else
        echo -e "${YELLOW}⚠${NC} Meta robots manquant (recommandé)"
    fi
    
    # Vérifier canonical
    if grep -q 'rel="canonical"' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} URL canonique présente"
    else
        echo -e "${RED}✗${NC} URL canonique manquante"
    fi
    
    # Vérifier Open Graph
    if grep -q 'property="og:' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Balises Open Graph présentes"
    else
        echo -e "${RED}✗${NC} Balises Open Graph manquantes"
    fi
    
    # Vérifier Twitter Card
    if grep -q 'name="twitter:' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Twitter Cards présentes"
    else
        echo -e "${YELLOW}⚠${NC} Twitter Cards manquantes (recommandé)"
    fi
    
    # Vérifier Schema.org
    if grep -q 'application/ld+json' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Données structurées Schema.org présentes"
    else
        echo -e "${YELLOW}⚠${NC} Données structurées manquantes (recommandé)"
    fi
    
    # Vérifier hreflang
    if grep -q 'hreflang=' "$DIST_DIR/index.html"; then
        echo -e "${GREEN}✓${NC} Attributs hreflang présents"
    else
        echo -e "${YELLOW}⚠${NC} Attributs hreflang manquants (recommandé pour site multilingue)"
    fi
fi

echo ""
echo "🌐 Vérification du sitemap..."

if [ -f "$DIST_DIR/sitemap.xml" ]; then
    # Compter le nombre d'URLs dans le sitemap
    url_count=$(grep -c '<url>' "$DIST_DIR/sitemap.xml" 2>/dev/null || echo "0")
    echo -e "${GREEN}✓${NC} Sitemap contient $url_count URLs"
    
    # Vérifier que le sitemap contient le bon domaine
    if grep -q "https://melissacolin.ai" "$DIST_DIR/sitemap.xml"; then
        echo -e "${GREEN}✓${NC} Sitemap utilise le bon domaine (melissacolin.ai)"
    else
        echo -e "${RED}✗${NC} Sitemap utilise un mauvais domaine"
    fi
fi

echo ""
echo "🤖 Vérification du robots.txt..."

if [ -f "$DIST_DIR/robots.txt" ]; then
    if grep -q "Sitemap:" "$DIST_DIR/robots.txt"; then
        echo -e "${GREEN}✓${NC} Robots.txt contient une référence au sitemap"
    else
        echo -e "${YELLOW}⚠${NC} Robots.txt ne référence pas le sitemap"
    fi
    
    if grep -q "Allow:" "$DIST_DIR/robots.txt"; then
        echo -e "${GREEN}✓${NC} Robots.txt contient des directives Allow"
    fi
fi

echo ""
echo "📱 Vérification du Web App Manifest..."

if [ -f "$DIST_DIR/manifest.json" ]; then
    echo -e "${GREEN}✓${NC} Manifest.json présent"
    
    # Vérifier les champs essentiels du manifest
    if grep -q '"name"' "$DIST_DIR/manifest.json"; then
        echo -e "${GREEN}✓${NC} Nom de l'application défini"
    fi
    
    if grep -q '"start_url"' "$DIST_DIR/manifest.json"; then
        echo -e "${GREEN}✓${NC} URL de démarrage définie"
    fi
fi

echo ""
echo "🎯 Recommandations SEO:"
echo "======================"

echo "1. 📊 Ajoutez Google Search Console pour monitorer votre indexation"
echo "2. 🔗 Créez des backlinks de qualité (profils académiques, projets GitHub)"
echo "3. 📝 Ajoutez régulièrement du contenu (blog, projets)"
echo "4. 🏃 Optimisez la vitesse de chargement"
echo "5. 📱 Vérifiez la responsiveness mobile"
echo "6. 🌐 Soumettez votre sitemap à Google Search Console"
echo "7. 🔍 Utilisez des mots-clés pertinents pour votre profil étudiant IA"

echo ""
echo "🚀 Pour améliorer votre référencement:"
echo "- Créez un profil Google Scholar si pas déjà fait"
echo "- Ajoutez votre portfolio à votre profil LinkedIn"
echo "- Partagez vos projets sur GitHub avec de bonnes descriptions"
echo "- Participez à des communautés IA (forums, Discord, Reddit)"
echo "- Créez du contenu technique sur votre blog"

echo ""
echo "✅ Audit terminé!"
