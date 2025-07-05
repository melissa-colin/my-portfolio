#!/bin/bash

# Script de validation SEO post-déploiement pour Hostinger
# À exécuter après le déploiement pour vérifier que tout est en ordre

echo "🔍 Validation SEO post-déploiement - melissacolin.ai"
echo "=================================================="

SITE_URL="https://melissacolin.ai"
LOCAL_DIST="./my-portfolio-dist"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}📋 1. Vérification du contenu local (my-portfolio-dist)${NC}"

if [ ! -d "$LOCAL_DIST" ]; then
    echo -e "${RED}❌ Dossier my-portfolio-dist introuvable!${NC}"
    exit 1
fi

# Vérification H1
h1_count=$(grep -c '<h1>' "$LOCAL_DIST/index.html" 2>/dev/null || echo "0")
if [ "$h1_count" -gt 0 ]; then
    echo -e "${GREEN}✅ H1 heading présent ($h1_count trouvé)${NC}"
    h1_content=$(grep -o '<h1>[^<]*</h1>' "$LOCAL_DIST/index.html" | head -1)
    echo -e "   📝 Contenu: ${h1_content}"
else
    echo -e "${RED}❌ CRITIQUE: Aucun H1 heading trouvé!${NC}"
fi

# Vérification structure headings
h2_count=$(grep -c '<h2>' "$LOCAL_DIST/index.html" 2>/dev/null || echo "0")
h3_count=$(grep -c '<h3>' "$LOCAL_DIST/index.html" 2>/dev/null || echo "0")
echo -e "${GREEN}✅ Structure headings: H1($h1_count) H2($h2_count) H3($h3_count)${NC}"

# Vérification meta description
if grep -q 'meta name="description"' "$LOCAL_DIST/index.html"; then
    echo -e "${GREEN}✅ Meta description présente${NC}"
    desc=$(grep -o 'meta name="description" content="[^"]*"' "$LOCAL_DIST/index.html" | sed 's/meta name="description" content="//g' | sed 's/"$//g')
    echo -e "   📝 Description: ${desc:0:80}..."
else
    echo -e "${RED}❌ Meta description manquante${NC}"
fi

# Vérification liens internes
internal_links=$(grep -c 'href="/' "$LOCAL_DIST/index.html" 2>/dev/null || echo "0")
echo -e "${GREEN}✅ Liens internes: $internal_links${NC}"

# Vérification liens externes
external_links=$(grep -c 'href="https://' "$LOCAL_DIST/index.html" 2>/dev/null || echo "0")
if [ "$external_links" -gt 0 ]; then
    echo -e "${GREEN}✅ Liens externes: $external_links${NC}"
    echo -e "   📝 Liens vers:"
    grep -o 'href="https://[^"]*"' "$LOCAL_DIST/index.html" | sed 's/href="//g' | sed 's/"$//g' | head -5 | while read url; do
        echo -e "      - $url"
    done
else
    echo -e "${RED}❌ CRITIQUE: Aucun lien externe trouvé!${NC}"
fi

# Vérification fichiers SEO
if [ -f "$LOCAL_DIST/robots.txt" ]; then
    echo -e "${GREEN}✅ robots.txt présent${NC}"
    if grep -q "melissacolin.ai" "$LOCAL_DIST/robots.txt"; then
        echo -e "${GREEN}   ✅ Domaine correct dans robots.txt${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Domaine à vérifier dans robots.txt${NC}"
    fi
else
    echo -e "${RED}❌ robots.txt manquant${NC}"
fi

if [ -f "$LOCAL_DIST/sitemap.xml" ]; then
    echo -e "${GREEN}✅ sitemap.xml présent${NC}"
    url_count=$(grep -c '<url>' "$LOCAL_DIST/sitemap.xml" 2>/dev/null || echo "0")
    echo -e "   📝 URLs dans sitemap: $url_count"
else
    echo -e "${RED}❌ sitemap.xml manquant${NC}"
fi

echo ""
echo -e "${BLUE}🌐 2. Test de connectivité du site en ligne${NC}"

# Test de base de connectivité
if command -v curl >/dev/null 2>&1; then
    echo "🔗 Test de connectivité..."
    
    # Test HTTP status
    status_code=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" --max-time 10)
    if [ "$status_code" = "200" ]; then
        echo -e "${GREEN}✅ Site accessible (HTTP 200)${NC}"
    else
        echo -e "${RED}❌ Site non accessible (HTTP $status_code)${NC}"
    fi
    
    # Test redirection www
    www_status=$(curl -s -o /dev/null -w "%{http_code}" "https://www.melissacolin.ai" --max-time 10)
    if [ "$www_status" = "301" ] || [ "$www_status" = "200" ]; then
        echo -e "${GREEN}✅ Redirection www configurée (HTTP $www_status)${NC}"
    else
        echo -e "${YELLOW}⚠️  Redirection www à vérifier (HTTP $www_status)${NC}"
    fi
    
    # Test du contenu H1 en ligne
    echo "🔍 Vérification du H1 en ligne..."
    online_content=$(curl -s "$SITE_URL" --max-time 10)
    if echo "$online_content" | grep -q "<h1>"; then
        echo -e "${GREEN}✅ H1 détecté en ligne${NC}"
        h1_online=$(echo "$online_content" | grep -o '<h1>[^<]*</h1>' | head -1)
        echo -e "   📝 H1 en ligne: $h1_online"
    else
        echo -e "${RED}❌ H1 non détecté en ligne${NC}"
    fi
    
    # Test des liens externes en ligne
    if echo "$online_content" | grep -q "enseirb-matmeca.fr"; then
        echo -e "${GREEN}✅ Liens externes détectés en ligne${NC}"
    else
        echo -e "${RED}❌ Liens externes non détectés en ligne${NC}"
    fi
    
else
    echo -e "${YELLOW}⚠️  curl non disponible - impossible de tester le site en ligne${NC}"
fi

echo ""
echo -e "${BLUE}📊 3. Résumé et recommandations${NC}"
echo "=================================="

# Score SEO basique
score=0
total=10

[ "$h1_count" -gt 0 ] && score=$((score + 2))
[ "$h2_count" -gt 0 ] && score=$((score + 1))
[ "$external_links" -gt 0 ] && score=$((score + 2))
[ "$internal_links" -gt 5 ] && score=$((score + 1))
[ -f "$LOCAL_DIST/robots.txt" ] && score=$((score + 1))
[ -f "$LOCAL_DIST/sitemap.xml" ] && score=$((score + 1))
grep -q 'meta name="description"' "$LOCAL_DIST/index.html" && score=$((score + 1))
[ "$status_code" = "200" ] && score=$((score + 1))

percentage=$((score * 100 / total))

echo -e "🎯 Score SEO: ${score}/${total} (${percentage}%)"

if [ $percentage -ge 80 ]; then
    echo -e "${GREEN}🎉 Excellent! Votre site est bien optimisé pour le SEO${NC}"
elif [ $percentage -ge 60 ]; then
    echo -e "${YELLOW}⚠️  Bon, mais des améliorations sont possibles${NC}"
else
    echo -e "${RED}❌ Attention! Des problèmes SEO critiques détectés${NC}"
fi

echo ""
echo "🔧 Actions recommandées:"
[ "$h1_count" -eq 0 ] && echo -e "${RED}- URGENT: Ajouter un H1 heading${NC}"
[ "$external_links" -eq 0 ] && echo -e "${RED}- URGENT: Ajouter des liens externes${NC}"
[ "$internal_links" -lt 5 ] && echo -e "${YELLOW}- Améliorer la navigation interne${NC}"
[ ! -f "$LOCAL_DIST/robots.txt" ] && echo -e "${YELLOW}- Créer un fichier robots.txt${NC}"
[ "$status_code" != "200" ] && echo -e "${RED}- URGENT: Vérifier la configuration Hostinger${NC}"

echo ""
echo "🌐 URLs à tester manuellement:"
echo "- Page principale: $SITE_URL"
echo "- Google PageSpeed: https://pagespeed.web.dev/analysis?url=${SITE_URL}"
echo "- Google Rich Results: https://search.google.com/test/rich-results?url=${SITE_URL}"
echo "- W3C Validator: https://validator.w3.org/nu/?doc=${SITE_URL}"

echo ""
echo -e "${GREEN}✅ Validation terminée!${NC}"
