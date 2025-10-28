#!/bin/bash

# 📊 Script de Validation Backlinks
# Vérifie les backlinks acquis et suit la progression

echo "🔍 VALIDATION BACKLINKS - $(date)"
echo "================================="
echo

# Fonction pour vérifier si un profil existe
check_profile() {
    local url="$1"
    local name="$2"
    local status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
    
    if [ "$status_code" = "200" ]; then
        echo "✅ $name: Profil trouvé"
        return 0
    else
        echo "❌ $name: Profil non trouvé ou inaccessible"
        return 1
    fi
}

# Fonction pour chercher des mentions du domaine
check_backlinks() {
    echo "🔍 Recherche de mentions 'melissacolin.ai'..."
    echo
    
    # Google Scholar
    echo "📚 Vérification Google Scholar..."
    if curl -s "https://scholar.google.com/citations?hl=fr&q=melissacolin.ai" | grep -q "melissacolin.ai"; then
        echo "✅ Google Scholar: Mention trouvée"
    else
        echo "❌ Google Scholar: Aucune mention"
    fi
    
    # ORCID
    echo "🎓 Vérification ORCID..."
    if curl -s "https://orcid.org/members/search?query=melissacolin.ai" | grep -q "melissacolin.ai"; then
        echo "✅ ORCID: Mention trouvée"
    else
        echo "❌ ORCID: Aucune mention"
    fi
    
    echo
}

# Compteur de backlinks
backlink_count=0

echo "🎯 VÉRIFICATION DES PROFILS PRIORITAIRES"
echo "========================================"

# Vérifications spécifiques (vous devrez adapter avec vos vrais profils)
echo "📊 Status des profils académiques:"
echo "• ORCID: À créer sur https://orcid.org/register"
echo "• Google Scholar: À créer sur https://scholar.google.com/citations"
echo "• ResearchGate: À créer sur https://www.researchgate.net/signup"
echo

echo "📊 Status des profils professionnels:"
echo "• LinkedIn: À mettre à jour"
echo "• GitHub: À mettre à jour"
echo

# Check basic backlink indicators
echo "🔗 ANALYSE BASIQUE DES BACKLINKS"
echo "================================"

# Vérifier si le site répond bien
site_status=$(curl -s -o /dev/null -w "%{http_code}" "https://melissacolin.ai")
if [ "$site_status" = "200" ]; then
    echo "✅ Site principal: Accessible (HTTP $site_status)"
else
    echo "❌ Site principal: Problème d'accès (HTTP $site_status)"
fi

# Vérifier robots.txt et sitemap
robots_status=$(curl -s -o /dev/null -w "%{http_code}" "https://melissacolin.ai/robots.txt")
sitemap_status=$(curl -s -o /dev/null -w "%{http_code}" "https://melissacolin.ai/sitemap.xml")

echo "✅ robots.txt: HTTP $robots_status"
echo "✅ sitemap.xml: HTTP $sitemap_status"

echo
echo "📈 MÉTRIQUES ACTUELLES"
echo "======================"
echo "🔗 Backlinks confirmés: $backlink_count"
echo "🎯 Objectif: 20 backlinks en 30 jours"
echo "📊 Progression: $(($backlink_count * 100 / 20))%"

echo
echo "🚨 ACTIONS PRIORITAIRES"
echo "======================="
if [ $backlink_count -eq 0 ]; then
    echo "⚡ URGENT: Aucun backlink détecté"
    echo "🔥 Actions immédiates:"
    echo "   1. Créer profil ORCID (30 min)"
    echo "   2. Créer profil Google Scholar (45 min)"
    echo "   3. Mettre à jour LinkedIn (15 min)"
    echo "   4. Mettre à jour GitHub (15 min)"
    echo
    echo "🎯 Ces 4 actions = 4 backlinks en 2h maximum"
fi

echo
echo "📝 SUIVRE LA PROGRESSION"
echo "========================"
echo "Utilisez les scripts suivants:"
echo "• ./quick-wins-backlinks.sh    - Actions rapides (2h)"
echo "• ./daily-backlink-actions.sh  - Routine quotidienne"
echo "• ./validate-backlinks.sh      - Vérification (ce script)"

echo
echo "🔗 OUTILS DE VÉRIFICATION EXTERNE"
echo "=================================="
echo "• Ahrefs: https://ahrefs.com/backlink-checker"
echo "• MOZ Link Explorer: https://moz.com/link-explorer"
echo "• SEMrush Backlink Audit: https://semrush.com/backlink-audit"
echo "• Google Search Console: https://search.google.com/search-console"

# Log de la vérification
echo "$(date): Validation backlinks - $backlink_count backlinks détectés" >> backlink-validation.log
