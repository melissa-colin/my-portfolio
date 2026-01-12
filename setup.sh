#!/bin/bash

echo "🚀 Configuration initiale du projet my-portfolio..."

# Vérifier que nous sommes dans un repository git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce n'est pas un repository git"
    exit 1
fi

# Initialiser les submodules
echo "📦 Initialisation des submodules..."
git submodule update --init --recursive

# Vérifier que le submodule est bien initialisé
if [ -d "my-portfolio-dist/.git" ]; then
    echo "✅ Submodule my-portfolio-dist initialisé"
    cd my-portfolio-dist
    git checkout main
    git pull origin main
    cd ..
else
    echo "❌ Erreur: Le submodule n'a pas pu être initialisé"
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances pnpm..."
if command -v pnpm &> /dev/null; then
    pnpm install
    echo "✅ Dépendances installées"
else
    echo "⚠️  pnpm n'est pas installé. Installation avec npm..."
    npm install -g pnpm
    pnpm install
fi

# Rendre les scripts exécutables
echo "🔧 Configuration des permissions des scripts..."
chmod +x *.sh
chmod +x scripts/*.js 2>/dev/null || true

echo ""
echo "🎉 Configuration terminée avec succès!"
echo ""
echo "📋 Commandes disponibles:"
echo "  ./run-dev.sh          - Démarrer le serveur de développement"
echo "  ./deploy.sh           - Déployer en production"
echo "  ./build-optimized.sh  - Build optimisé sans déploiement"
echo ""
