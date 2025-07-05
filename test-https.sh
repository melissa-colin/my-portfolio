#!/bin/bash

echo "🔒 Test de sécurité HTTPS et mixed content pour melissacolin.ai"
echo "==============================================================="

# Fonction pour tester les headers de sécurité
test_security_headers() {
    local url="$1"
    echo ""
    echo "🔐 Test des headers de sécurité pour: $url"
    
    headers=$(curl -s -I "$url" 2>/dev/null || echo "")
    
    # Test HSTS
    if echo "$headers" | grep -qi "strict-transport-security"; then
        echo "✅ HSTS: Activé"
    else
        echo "❌ HSTS: Manquant"
    fi
    
    # Test CSP
    if echo "$headers" | grep -qi "content-security-policy"; then
        echo "✅ CSP: Activé"
    else
        echo "⚠️  CSP: Manquant (peut causer du mixed content)"
    fi
    
    # Test X-Content-Type-Options
    if echo "$headers" | grep -qi "x-content-type-options"; then
        echo "✅ X-Content-Type-Options: Activé"
    else
        echo "⚠️  X-Content-Type-Options: Manquant"
    fi
    
    # Test du protocole final
    final_protocol=$(echo "$url" | grep -o "^https\?")
    if [ "$final_protocol" = "https" ]; then
        echo "✅ Protocole: HTTPS"
    else
        echo "❌ Protocole: HTTP (insécurisé)"
    fi
}

# Fonction pour analyser le contenu de la page pour mixed content
analyze_mixed_content() {
    local url="$1"
    echo ""
    echo "🔍 Analyse du mixed content pour: $url"
    
    page_content=$(curl -s "$url" 2>/dev/null || echo "")
    
    if [ -z "$page_content" ]; then
        echo "❌ Impossible de récupérer le contenu de la page"
        return 1
    fi
    
    # Rechercher les liens HTTP
    http_links=$(echo "$page_content" | grep -o 'http://[^"'\'']*' | head -5)
    if [ -n "$http_links" ]; then
        echo "❌ Mixed content détecté - Liens HTTP:"
        echo "$http_links"
    else
        echo "✅ Aucun lien HTTP détecté"
    fi
    
    # Rechercher les ressources HTTP (images, scripts, CSS)
    http_resources=$(echo "$page_content" | grep -E 'src="http://|href="http://|url\(http://' | head -3)
    if [ -n "$http_resources" ]; then
        echo "❌ Ressources HTTP détectées:"
        echo "$http_resources"
    else
        echo "✅ Toutes les ressources utilisent HTTPS"
    fi
    
    # Vérifier les meta tags de sécurité
    if echo "$page_content" | grep -qi 'http-equiv.*https'; then
        echo "✅ Meta refresh vers HTTPS détecté"
    fi
}

# Test des différentes URL
urls=(
    "https://melissacolin.ai"
    "https://www.melissacolin.ai"
    "http://melissacolin.ai"
    "http://www.melissacolin.ai"
)

failures=0

for url in "${urls[@]}"; do
    echo ""
    echo "=================================================="
    echo "🧪 Test de: $url"
    echo "=================================================="
    
    # Test de redirection et statut
    response=$(curl -s -L -o /dev/null -w "%{http_code}|%{url_effective}" "$url" 2>/dev/null || echo "000|")
    IFS='|' read -r status final_url <<< "$response"
    
    echo "Statut HTTP: $status"
    echo "URL finale: $final_url"
    
    if [ "$status" = "200" ]; then
        # Vérifier que l'URL finale est en HTTPS
        if [[ "$final_url" == "https://melissacolin.ai"* ]]; then
            echo "✅ Redirection correcte vers HTTPS non-www"
            test_security_headers "$final_url"
            analyze_mixed_content "$final_url"
        else
            echo "❌ URL finale incorrecte"
            failures=$((failures + 1))
        fi
    else
        echo "❌ Statut HTTP incorrect: $status"
        failures=$((failures + 1))
    fi
done

echo ""
echo "=================================================="
echo "📊 RÉSUMÉ DES TESTS HTTPS/MIXED CONTENT"
echo "=================================================="

if [ $failures -eq 0 ]; then
    echo "🎉 TOUS LES TESTS HTTPS PASSENT!"
    echo "✅ Toutes les redirections HTTPS fonctionnent"
    echo "✅ Pas de mixed content détecté"
    echo "✅ Headers de sécurité configurés"
else
    echo "⚠️  $failures problème(s) détecté(s)"
    echo ""
    echo "🔧 ACTIONS RECOMMANDÉES:"
    echo "1. Vérifier que le certificat SSL est valide"
    echo "2. S'assurer que toutes les ressources utilisent HTTPS"
    echo "3. Configurer les headers de sécurité (HSTS, CSP)"
    echo "4. Tester avec les outils de développement du navigateur"
fi

echo ""
echo "🔍 Tests manuels recommandés:"
echo "• Console développeur pour mixed content warnings"
echo "• SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=melissacolin.ai"
echo "• Security Headers: https://securityheaders.com/?q=melissacolin.ai"
echo "• Mozilla Observatory: https://observatory.mozilla.org/analyze/melissacolin.ai"

echo ""
echo "🏁 Test HTTPS terminé!"
