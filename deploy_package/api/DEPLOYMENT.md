# AI Researcher Portfolio Deployment Guide

## English

### Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn package manager
- Web hosting service with Node.js support

### Deployment Steps

#### 1. Database Setup

1. **Create a MySQL database on your hosting service**
   - Log into your hosting control panel (cPanel, Plesk, etc.)
   - Navigate to the MySQL or Database section
   - Create a new database (e.g., `portfolio`)
   - Create a MySQL user and grant all privileges on this database
   - **Take note of**: MySQL hostname, database name, username, and password

2. **Import the database schema**
   - Download the `portfolio_db_schema.sql` file from the repository
   - Access your database management tool (phpMyAdmin)
   - Select your newly created database
   - Go to the "Import" tab, choose the file, and click "Execute"

#### 2. Backend Deployment

1. **Prepare backend files**
   ```bash
   npm install
   ```

2. **Create environment configuration**
   Create a `.env` file in the backend root directory:
   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_long_random_secure_string
   PORT=3000
   FRONTEND_URL=https://your-domain.com
   ```

3. **Upload backend files**
   - Upload all backend files to your server
   - For shared hosting, place them in a subfolder like `api`
   - For dedicated Node.js hosting, follow their specific deployment instructions

4. **Start the server**

   For shared hosting with SSH access:
   ```bash
   npm install -g pm2
   pm2 start start.js --name "portfolio-backend"
   pm2 save
   ```

   For managed Node.js platforms (Heroku, Railway.app, etc.):
   - Set the environment variables in their dashboard
   - The platform will handle the server startup process

#### 3. Frontend Deployment

1. **Build the frontend**
   ```bash
   cd react_template
   npm install
   npm run build
   ```

2. **Upload frontend files**
   - Upload all files from the `dist` directory to your web root
   - If using the same server for both frontend and backend:
     - Ensure the backend is in a subdirectory (e.g., `/api`)
     - Configure proper URL routing

3. **Configure server for client-side routing**
   Create a `.htaccess` file in your web root:
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

#### 4. First Login and System Setup

1. **Access the admin panel**:
   - Navigate to your domain: `https://your-domain.com/admin`
   - Log in with default credentials:
     - Username: `admin`
     - Password: `admin123`

2. **Change default password immediately**:
   - Go to profile settings
   - Update the admin password to a secure one

3. **Configure system settings**:
   - Set up your profile information
   - Add languages (if not already present)
   - Begin adding content to your portfolio

#### 5. Troubleshooting

- **Database connection issues**:
  - Verify credentials in `.env` file
  - Check if database user has proper permissions
  - Ensure host allows external connections (if applicable)

- **CORS errors**:
  - Make sure `FRONTEND_URL` in `.env` matches exactly with your actual domain
  - Check for protocol mismatch (http vs https)

- **File upload issues**:
  - Verify permissions on `uploads` directory
  - Run `chmod -R 755 uploads` if necessary

## Français

### Prérequis

- Node.js (v14+)
- MySQL (v5.7+)
- Gestionnaire de paquets npm ou yarn
- Service d'hébergement web avec support Node.js

### Étapes de déploiement

#### 1. Configuration de la base de données

1. **Créez une base de données MySQL sur votre service d'hébergement**
   - Connectez-vous à votre panneau de contrôle d'hébergement (cPanel, Plesk, etc.)
   - Accédez à la section MySQL ou Base de données
   - Créez une nouvelle base de données (ex: `portfolio`)
   - Créez un utilisateur MySQL et accordez-lui tous les privilèges sur cette base de données
   - **Notez**: Nom d'hôte MySQL, nom de la base de données, nom d'utilisateur et mot de passe

2. **Importez le schéma de la base de données**
   - Téléchargez le fichier `portfolio_db_schema.sql` du dépôt
   - Accédez à votre outil de gestion de base de données (phpMyAdmin)
   - Sélectionnez votre base de données nouvellement créée
   - Allez dans l'onglet "Importer", choisissez le fichier et cliquez sur "Exécuter"

#### 2. Déploiement du backend

1. **Préparez les fichiers du backend**
   ```bash
   npm install
   ```

2. **Créez la configuration d'environnement**
   Créez un fichier `.env` dans le répertoire racine du backend :
   ```
   DB_HOST=votre_hote_mysql
   DB_USER=votre_utilisateur_mysql
   DB_PASSWORD=votre_mot_de_passe_mysql
   DB_NAME=votre_nom_de_base_de_donnees
   JWT_SECRET=votre_chaine_aleatoire_securisee_longue
   PORT=3000
   FRONTEND_URL=https://votre-domaine.com
   ```

3. **Téléchargez les fichiers backend**
   - Téléchargez tous les fichiers backend sur votre serveur
   - Pour un hébergement partagé, placez-les dans un sous-dossier comme `api`
   - Pour un hébergement Node.js dédié, suivez leurs instructions de déploiement spécifiques

4. **Démarrez le serveur**

   Pour un hébergement partagé avec accès SSH :
   ```bash
   npm install -g pm2
   pm2 start start.js --name "portfolio-backend"
   pm2 save
   ```

   Pour les plateformes Node.js gérées (Heroku, Railway.app, etc.) :
   - Définissez les variables d'environnement dans leur tableau de bord
   - La plateforme gérera le processus de démarrage du serveur

#### 3. Déploiement du frontend

1. **Construisez le frontend**
   ```bash
   cd react_template
   npm install
   npm run build
   ```

2. **Téléchargez les fichiers frontend**
   - Téléchargez tous les fichiers du répertoire `dist` dans votre racine web
   - Si vous utilisez le même serveur pour le frontend et le backend :
     - Assurez-vous que le backend est dans un sous-répertoire (ex : `/api`)
     - Configurez le routage d'URL approprié

3. **Configurez le serveur pour le routage côté client**
   Créez un fichier `.htaccess` dans votre racine web :
   ```
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

#### 4. Premier login et configuration du système

1. **Accédez au panneau d'administration** :
   - Naviguez vers votre domaine : `https://votre-domaine.com/admin`
   - Connectez-vous avec les identifiants par défaut :
     - Nom d'utilisateur : `admin`
     - Mot de passe : `admin123`

2. **Changez immédiatement le mot de passe par défaut** :
   - Allez dans les paramètres du profil
   - Mettez à jour le mot de passe admin avec un mot de passe sécurisé

3. **Configurez les paramètres du système** :
   - Configurez vos informations de profil
   - Ajoutez des langues (si elles ne sont pas déjà présentes)
   - Commencez à ajouter du contenu à votre portfolio

#### 5. Dépannage

- **Problèmes de connexion à la base de données** :
  - Vérifiez les identifiants dans le fichier `.env`
  - Vérifiez si l'utilisateur de la base de données a les permissions appropriées
  - Assurez-vous que l'hôte autorise les connexions externes (si applicable)

- **Erreurs CORS** :
  - Assurez-vous que `FRONTEND_URL` dans `.env` correspond exactement à votre domaine réel
  - Vérifiez s'il y a une incompatibilité de protocole (http vs https)

- **Problèmes de téléchargement de fichiers** :
  - Vérifiez les permissions sur le répertoire `uploads`
  - Exécutez `chmod -R 755 uploads` si nécessaire
