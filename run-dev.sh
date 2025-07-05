#!/bin/bash

echo "🧪 Test du déploiement local avec rechargement automatique..."

# Lancer le frontend avec vite (ou adapte selon ton stack)
echo "🌐 Démarrage du serveur frontend (développement)..."
cd frontend
pnpm install
pnpm add -D vite
npx vite &
FRONTEND_PID=$!
cd ..

echo "✅ Serveurs lancés. Modifie ton code, les changements seront pris en compte automatiquement."
echo "Appuyez sur Entrée pour arrêter."
read

kill $BACKEND_PID $FRONTEND_PID
echo "🛑 Serveurs arrêtés."