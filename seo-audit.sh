#!/bin/bash

echo "📊 Audit SEO complet - Portfolio Mélissa Colin"
echo "=============================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_section() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_check() {
    if [ $1 -eq 0 ]; then
        echo -e "  ${GREEN}✅ $2${NC}"
    else
        echo -e "  ${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "  ${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "  ${BLUE}ℹ️  $1${NC}"
}

# Vérifier si on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}Erreur: Ce script doit être exécuté à la racine du projet${NC}"
    exit 1
fi

print_section "🔍 1. AUDIT DES FICHIERS SEO ESSENTIELS"

# Vérifier les fichiers SEO de base
files=("public/sitemap.xml" "public/robots.txt" "public/.htaccess" ".env")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        print_check 0 "$file présent"
        # Vérifier le contenu spécifique
        case $file in
            "public/sitemap.xml")
                urls_count=$(grep -c "<url>" "$file" 2>/dev/null || echo "0")
                print_info "URLs dans le sitemap: $urls_count"
                ;;
            "public/robots.txt")
                if grep -q "Sitemap:" "$file"; then
                    print_check 0 "Sitemap référencé dans robots.txt"
                else
                    print_check 1 "Sitemap non référencé dans robots.txt"
                fi
                ;;
            ".env")
                if grep -q "VITE_GOOGLE_ANALYTICS_ID" "$file"; then
                    print_check 0 "Google Analytics ID configuré"
                else
                    print_check 1 "Google Analytics ID manquant"
                fi
                ;;
        esac
    else
        print_check 1 "$file manquant"
    fi
done

print_section "🖼️ 2. AUDIT DES IMAGES ET PERFORMANCE"

if [ -d "public/assets/images" ]; then
    # Compter les images
    total_images=$(find public/assets/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | wc -l)
    print_info "Total d'images: $total_images"
    
    # Vérifier les images lourdes (>500KB)
    large_images=$(find public/assets/images -type f \( -name "*.jpg" -o -name "*.png" \) -size +500k)
    large_count=$(echo "$large_images" | grep -c . || echo "0")
    
    if [ $large_count -eq 0 ]; then
        print_check 0 "Toutes les images sont optimisées (<500KB)"
    else
        print_warning "$large_count images dépassent 500KB"
        echo "$large_images" | while read -r img; do
            if [ -n "$img" ]; then
                size=$(du -h "$img" | cut -f1)
                print_warning "  $(basename "$img"): $size"
            fi
        done
    fi
    
    # Vérifier la présence d'images WebP
    webp_count=$(find public/assets/images -name "*.webp" | wc -l)
    if [ $webp_count -gt 0 ]; then
        print_check 0 "Images WebP présentes ($webp_count)"
    else
        print_warning "Aucune image WebP trouvée (recommandé pour la performance)"
    fi
    
    # Vérifier les images critiques
    critical_images=("profile-image.jpeg" "favicon.ico" "screen.png")
    for img in "${critical_images[@]}"; do
        if find public/assets/images -name "$img" | grep -q .; then
            print_check 0 "Image critique présente: $img"
        else
            print_check 1 "Image critique manquante: $img"
        fi
    done
else
    print_check 1 "Dossier images manquant"
fi

print_section "⚛️ 3. AUDIT DES COMPOSANTS REACT"

# Vérifier les composants SEO
components=("SEOHead" "OptimizedImage" "WebVitalsMonitor")
for component in "${components[@]}"; do
    if find src -name "*.jsx" -exec grep -l "$component" {} \; | grep -q .; then
        print_check 0 "Composant $component utilisé"
        usage_count=$(find src -name "*.jsx" -exec grep -l "$component" {} \; | wc -l)
        print_info "  Utilisé dans $usage_count fichiers"
    else
        print_check 1 "Composant $component non utilisé"
    fi
done

# Vérifier les hooks SEO
hooks=("useGoogleAnalytics" "usePageTitle")
for hook in "${hooks[@]}"; do
    if find src -name "*.js" -o -name "*.jsx" -exec grep -l "$hook" {} \; | grep -q .; then
        print_check 0 "Hook $hook utilisé"
    else
        print_check 1 "Hook $hook non utilisé"
    fi
done

print_section "📦 4. AUDIT DU BUILD DE PRODUCTION"

print_info "Construction du build de production..."
if pnpm build > build_audit.log 2>&1; then
    print_check 0 "Build de production réussi"
    
    if [ -d "dist" ]; then
        # Taille totale
        total_size=$(du -sh dist | cut -f1)
        print_info "Taille totale du build: $total_size"
        
        # Analyser les bundles JavaScript
        if [ -d "dist/assets" ]; then
            js_bundles=$(find dist/assets -name "*.js" -exec ls -la {} \; | awk '{print $5 " " $9}')
            largest_js=$(find dist/assets -name "*.js" -exec ls -la {} \; | awk '{print $5}' | sort -nr | head -1)
            
            if [ ! -z "$largest_js" ]; then
                largest_mb=$(echo "scale=2; $largest_js / 1024 / 1024" | bc -l 2>/dev/null || echo "N/A")
                if [ "$largest_mb" != "N/A" ] && (( $(echo "$largest_mb < 1" | bc -l) )); then
                    print_check 0 "Bundle JS principal < 1MB ($largest_mb MB)"
                else
                    print_warning "Bundle JS principal > 1MB ($largest_mb MB)"
                fi
            fi
        fi
        
        # Vérifier l'injection de l'ID Google Analytics
        if [ -f "dist/index.html" ]; then
            if grep -q "gtag" dist/index.html && ! grep -q "VITE_GOOGLE_ANALYTICS_ID" dist/index.html; then
                print_check 0 "Google Analytics correctement injecté dans le build"
            else
                print_warning "Problème avec l'injection Google Analytics"
            fi
            
            # Vérifier les meta tags SEO
            meta_tags=("description" "keywords" "og:title" "twitter:card")
            for tag in "${meta_tags[@]}"; do
                if grep -q "$tag" dist/index.html; then
                    print_check 0 "Meta tag '$tag' présent"
                else
                    print_check 1 "Meta tag '$tag' manquant"
                fi
            done
        fi
    fi
else
    print_check 1 "Échec du build de production"
    echo -e "${RED}Erreurs de build:${NC}"
    cat build_audit.log
fi

print_section "📋 5. AUDIT DE LA QUALITÉ DU CODE"

# Linting
if pnpm lint > lint_audit.log 2>&1; then
    print_check 0 "Aucune erreur de linting"
else
    print_warning "Erreurs de linting détectées"
    error_count=$(grep -c "error" lint_audit.log || echo "0")
    warning_count=$(grep -c "warning" lint_audit.log || echo "0")
    print_info "  Erreurs: $error_count, Avertissements: $warning_count"
fi

# Vérifier les dépendances de sécurité
if command -v pnpm audit &> /dev/null; then
    print_info "Audit de sécurité des dépendances..."
    if pnpm audit --audit-level moderate > audit.log 2>&1; then
        print_check 0 "Aucune vulnérabilité critique"
    else
        print_warning "Vulnérabilités détectées"
        print_info "  Voir audit.log pour les détails"
    fi
fi

print_section "🎯 6. RECOMMANDATIONS SEO"

echo -e "${BLUE}Optimisations supplémentaires recommandées:${NC}"
echo ""
echo "📈 SEO Technique:"
echo "  • Ajoutez un fichier manifest.json pour PWA"
echo "  • Implémentez un service worker pour la mise en cache"
echo "  • Configurez les données structurées Schema.org sur chaque page"
echo ""
echo "⚡ Performance:"
echo "  • Générez des images WebP/AVIF automatiquement"
echo "  • Implémentez le prefetching des routes"
echo "  • Optimisez les fonts avec font-display: swap"
echo ""
echo "🔍 Monitoring:"
echo "  • Configurez Google Search Console"
echo "  • Surveillez les Core Web Vitals en production"
echo "  • Utilisez Lighthouse CI pour les audits automatiques"
echo ""
echo "📊 Tests recommandés:"
echo "  • PageSpeed Insights: https://pagespeed.web.dev/"
echo "  • GTmetrix: https://gtmetrix.com/"
echo "  • Lighthouse dans Chrome DevTools"
echo "  • Test mobile-friendly: https://search.google.com/test/mobile-friendly"

print_section "🚀 RÉSUMÉ DE L'AUDIT"

print_info "Audit terminé ! Consultez les logs pour plus de détails:"
print_info "  • build_audit.log: Détails du build"
print_info "  • lint_audit.log: Résultats du linting"
print_info "  • audit.log: Audit de sécurité (si disponible)"

echo ""
echo -e "${GREEN}✨ Prochaines étapes:${NC}"
echo "1. Corrigez les erreurs identifiées"
echo "2. Testez en local avec ./test.sh"
echo "3. Déployez avec ./deploy.sh"
echo "4. Lancez un audit Lighthouse sur le site déployé"

# Nettoyage des fichiers temporaires
rm -f build_audit.log lint_audit.log audit.log 2>/dev/null

echo -e "\n${GREEN}🎉 Audit SEO terminé !${NC}"
