#!/bin/bash

echo "🔄 Test complet des redirections pour melissacolin.ai"
echo "=================================================="

# Fonction pour tester une redirection
test_redirect() {
    local url="$1"
    local expected="$2"
    local description="$3"
    
    echo ""
    echo "🧪 Test: $description"
    echo "URL testée: $url"
    echo "Redirection attendue: $expected"
    
    # Obtenir le statut HTTP et l'URL finale
    response=$(curl -s -L -o /dev/null -w "%{http_code}|%{url_effective}|%{redirect_url}" "$url" 2>/dev/null || echo "000||")
    
    IFS='|' read -r status final_url redirect_url <<< "$response"
    
    echo "Statut HTTP: $status"
    echo "URL finale: $final_url"
    
    if [ "$status" = "200" ] && [[ "$final_url" == "$expected"* ]]; then
        echo "✅ SUCCÈS: Redirection correcte"
        return 0
    elif [ "$status" = "301" ] || [ "$status" = "302" ]; then
        echo "🔄 Redirection intermédiaire détectée"
        if [[ "$final_url" == "$expected"* ]]; then
            echo "✅ SUCCÈS: URL finale correcte"
            return 0
        else
            echo "❌ ÉCHEC: URL finale incorrecte"
            return 1
        fi
    else
        echo "❌ ÉCHEC: Statut $status ou URL finale incorrecte"
        return 1
    fi
}

# Tests des redirections critiques
failures=0

# Test 1: www vers non-www
test_redirect "https://www.melissacolin.ai" "https://melissacolin.ai/" "www → non-www"
failures=$((failures + $?))

# Test 2: HTTP vers HTTPS  
test_redirect "http://melissacolin.ai" "https://melissacolin.ai/" "HTTP → HTTPS"
failures=$((failures + $?))

# Test 3: HTTP www vers HTTPS non-www
test_redirect "http://www.melissacolin.ai" "https://melissacolin.ai/" "HTTP www → HTTPS non-www"
failures=$((failures + $?))

# Test 4: Ancien domaine GitHub Pages
test_redirect "https://melissacolin.ai/my-portfolio-dist/" "https://melissacolin.ai/" "Ancien GitHub Pages → nouveau domaine"
failures=$((failures + $?))

# Test 5: URLs avec trailing slash
test_redirect "https://melissacolin.ai/projects/" "https://melissacolin.ai/projects" "Suppression trailing slash"
# Ce test peut échouer selon la config, c'est normal

echo ""
echo "=================================================="
echo "📊 RÉSUMÉ DES TESTS"
echo "=================================================="

if [ $failures -eq 0 ]; then
    echo "🎉 TOUS LES TESTS PASSENT!"
    echo "✅ Toutes les redirections fonctionnent correctement"
    echo "✅ SEO: Pas de duplicate content"
    echo "✅ Canonicalisation: OK"
else
    echo "⚠️  $failures test(s) ont échoué"
    echo "❌ Des problèmes de redirection peuvent affecter le SEO"
    echo ""
    echo "🔧 ACTIONS RECOMMANDÉES:"
    echo "1. Vérifier que le fichier .htaccess est bien déployé sur Hostinger"
    echo "2. S'assurer que mod_rewrite est activé"
    echo "3. Vérifier la configuration DNS"
    echo "4. Contacter le support Hostinger si nécessaire"
fi

echo ""
echo "🔍 Tests supplémentaires manuels:"
echo "• Google Search Console: https://search.google.com/search-console"
echo "• Test de compatibilité mobile: https://search.google.com/test/mobile-friendly"
echo "• PageSpeed Insights: https://pagespeed.web.dev/"
echo "• Test de données structurées: https://search.google.com/test/rich-results"

# Test de contenu SEO critique
echo ""
echo "🏷️  Vérification du contenu SEO..."

main_page=$(curl -s "https://melissacolin.ai" 2>/dev/null || echo "")
if [ -n "$main_page" ]; then
    # Vérifier H1
    h1_content=$(echo "$main_page" | grep -o '<h1[^>]*>.*</h1>' | head -1 | sed 's/<[^>]*>//g' | xargs)
    if [ -n "$h1_content" ]; then
        echo "✅ H1 trouvé: $h1_content"
    else
        echo "⚠️  H1 non détecté (peut être injecté par JavaScript)"
    fi
    
    # Vérifier meta description
    meta_desc=$(echo "$main_page" | grep -o 'meta name="description" content="[^"]*"' | head -1)
    if [ -n "$meta_desc" ]; then
        echo "✅ Meta description trouvée"
    else
        echo "⚠️  Meta description non détectée"
    fi
    
    # Vérifier canonical
    canonical=$(echo "$main_page" | grep -o 'rel="canonical" href="[^"]*"' | head -1)
    if [[ "$canonical" == *"melissacolin.ai"* ]]; then
        echo "✅ URL canonique correcte"
    else
        echo "⚠️  URL canonique non trouvée ou incorrecte"
    fi
else
    echo "❌ Impossible de récupérer le contenu de la page principale"
fi

echo ""
echo "🏁 Test terminé!"
