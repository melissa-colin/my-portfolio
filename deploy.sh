#!/bin/bash

set -e

echo "🚀 Initialisation du déploiement du portfolio..."

# Nettoyage et création de la structure
DEPLOY_DIR="deploy_package"
FRONT_DIR="$DEPLOY_DIR"
BACK_DIR="$DEPLOY_DIR/api"

rm -rf "$DEPLOY_DIR"
mkdir -p "$BACK_DIR"

# --- Backend ---
echo "🔧 Préparation du backend..."
cp -r backend_implementation/* "$BACK_DIR/"
rm -rf "$BACK_DIR/node_modules" "$BACK_DIR/.env"

cat > "$BACK_DIR/.env" <<EOL
DB_HOST=127.0.0.1
DB_USER=u436612612_melissa
DB_PASSWORD=WQ\$KDR3e7GI8Xg8c
DB_NAME=u436612612_contnt_portfol
JWT_SECRET=your_long_random_secure_string
PORT=3000
FRONTEND_URL=https://melissacolin.site
EOL
echo "✅ Fichier .env backend créé dans $BACK_DIR"

# --- Frontend ---
echo "🏗️ Construction du frontend..."
cd react_template
npm install
npm run build
cd ..

rm -rf "$FRONT_DIR/dist"
cp -r react_template/dist "$FRONT_DIR/dist"

# --- .htaccess pour le routage SPA ---
cat > "$FRONT_DIR/.htaccess" <<EOL
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
EOL
echo "✅ Fichier .htaccess créé à la racine du déploiement"

echo "📂 Structure prête dans $DEPLOY_DIR :"
tree "$DEPLOY_DIR" || ls -R "$DEPLOY_DIR"

echo "
📋 Instructions de déploiement :
1. Uploadez tout le contenu du dossier '$DEPLOY_DIR' à la racine de votre hébergement.
2. Le backend doit être accessible dans le sous-dossier '/api'.
3. Le frontend (site) est dans '/dist' à la racine.
4. Placez le fichier .htaccess à la racine pour le routage côté client.
5. Configurez la base de données MySQL et modifiez le fichier .env dans /api selon vos accès.
6. Installez les dépendances backend sur le serveur : cd api && npm install
7. Lancez le backend avec pm2 ou selon votre hébergeur : pm2 start start.js --name 'portfolio-backend'
"

echo "✅ Déploiement local prêt. Suivez les instructions ci-dessus pour finaliser sur l'hébergeur."
