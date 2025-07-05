#!/bin/bash

echo "🧪 Tests complets SEO et Performance - Portfolio Mélissa Colin"
echo "=============================================================="

# Fonction pour afficher les résultats avec couleurs
print_result() {
    if [ $1 -eq 0 ]; then
        echo "✅ $2"
    else
        echo "❌ $2"
    fi
}

print_info() {
    echo "ℹ️  $1"
}

print_warning() {
    echo "⚠️  $1"
}

# Test 1: Vérifier la structure des fichiers SEO
echo ""
echo "📁 Test 1: Vérification des fichiers SEO critiques"
echo "---------------------------------------------------"

test -f "public/sitemap.xml" && print_result 0 "sitemap.xml présent" || print_result 1 "sitemap.xml manquant"
test -f "public/robots.txt" && print_result 0 "robots.txt présent" || print_result 1 "robots.txt manquant"
test -f "public/.htaccess" && print_result 0 ".htaccess présent" || print_result 1 ".htaccess manquant"
test -f ".env" && print_result 0 ".env présent (Google Analytics)" || print_result 1 ".env manquant"

# Test 2: Vérifier les images optimisées
echo ""
echo "🖼️  Test 2: Vérification des images optimisées"
echo "----------------------------------------------"

if [ -d "public/assets/images" ]; then
    image_count=$(find public/assets/images -name "*.jpg" -o -name "*.png" | wc -l)
    large_images=$(find public/assets/images -name "*.jpg" -o -name "*.png" -size +500k | wc -l)
    
    print_info "Images trouvées: $image_count"
    
    if [ $large_images -eq 0 ]; then
        print_result 0 "Toutes les images sont optimisées (<500KB)"
    else
        print_warning "$large_images images dépassent 500KB"
        echo "Images lourdes détectées:"
        find public/assets/images -name "*.jpg" -o -name "*.png" -size +500k -exec ls -lh {} \;
    fi
else
    print_result 1 "Dossier images manquant"
fi

# Test 3: Build du projet
echo ""
echo "🏗️  Test 3: Build du projet"
echo "---------------------------"

print_info "Installation des dépendances..."
if pnpm install --silent > /dev/null 2>&1; then
    print_result 0 "Installation des dépendances réussie"
else
    print_result 1 "Échec de l'installation des dépendances"
    exit 1
fi

print_info "Build du projet..."
if pnpm build > build.log 2>&1; then
    print_result 0 "Build réussi"
    
    # Vérifier la taille des bundles
    if [ -d "dist" ]; then
        echo ""
        echo "📊 Analyse des bundles générés:"
        echo "------------------------------"
        
        # Taille totale du build
        total_size=$(du -sh dist | cut -f1)
        print_info "Taille totale du build: $total_size"
        
        # Taille des fichiers JS
        if [ -d "dist/assets" ]; then
            js_files=$(find dist/assets -name "*.js" -exec ls -lh {} \; | awk '{print $5 " " $9}')
            echo "Fichiers JavaScript:"
            echo "$js_files"
            
            # Vérifier si des bundles dépassent 1MB
            large_js=$(find dist/assets -name "*.js" -size +1M | wc -l)
            if [ $large_js -eq 0 ]; then
                print_result 0 "Tous les bundles JS sont < 1MB"
            else
                print_warning "$large_js bundles JS dépassent 1MB"
            fi
        fi
        
        # Vérifier que le HTML contient l'ID Google Analytics
        if grep -q "VITE_GOOGLE_ANALYTICS_ID" dist/index.html; then
            print_warning "L'ID Google Analytics n'est pas injecté dans le build"
        else
            print_result 0 "Google Analytics correctement configuré dans le build"
        fi
    fi
else
    print_result 1 "Échec du build"
    echo "Erreurs de build:"
    cat build.log
    exit 1
fi

# Test 4: Linter et qualité du code
echo ""
echo "🔍 Test 4: Qualité du code"
echo "--------------------------"

if pnpm lint > lint.log 2>&1; then
    print_result 0 "Pas d'erreurs de linting détectées"
else
    print_warning "Erreurs de linting détectées"
    echo "Erreurs de linting:"
    cat lint.log
fi

# Test 5: Vérification des composants SEO
echo ""
echo "🔎 Test 5: Intégration des composants SEO"
echo "-----------------------------------------"

seo_components=("SEOHead" "WebVitalsMonitor" "OptimizedImage")
for component in "${seo_components[@]}"; do
    if grep -r "$component" src/ > /dev/null; then
        print_result 0 "Composant $component utilisé"
    else
        print_result 1 "Composant $component non utilisé"
    fi
done

# Test 6: Test du serveur de développement
echo ""
echo "🌐 Test 6: Démarrage du serveur de développement"
echo "------------------------------------------------"

print_info "Démarrage du serveur de développement..."
print_info "Le serveur sera accessible sur http://localhost:5173"
print_info "Vérifiez manuellement:"
print_info "  • Les images se chargent rapidement avec lazy loading"
print_info "  • Les Web Vitals s'affichent dans la console"
print_info "  • Les métadonnées SEO sont présentes dans chaque page"
print_info "  • Le Google Analytics fonctionne (réseau dans DevTools)"

echo ""
echo "⚡ Conseils d'optimisation supplémentaires:"
echo "------------------------------------------"
echo "1. Utilisez Lighthouse pour auditer le site déployé"
echo "2. Testez la vitesse sur PageSpeed Insights"
echo "3. Vérifiez l'indexation avec Google Search Console"
echo "4. Surveillez les Core Web Vitals en production"
echo "5. Testez les meta données avec l'outil Facebook Debugger"

echo ""
echo "🚀 Pour déployer:"
echo "• Exécutez: ./deploy.sh"
echo "• Ou utilisez: ./build-optimized.sh pour un build avec optimisations"

echo ""
echo "Appuyez sur Entrée pour démarrer le serveur de développement (Ctrl+C pour arrêter)..."
read

# Démarrer le serveur de développement
pnpm dev
