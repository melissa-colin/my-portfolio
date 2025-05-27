# Melissa Colin - AI Researcher Portfolio

Ce projet est un site web portfolio pour présenter les compétences, projets et publications de Melissa Colin, chercheuse en intelligence artificielle.

## Configuration Technique

- **Frontend**: React avec Vite, Tailwind CSS
- **Langues**: Support multilingue (français et anglais)

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou pnpm

## Installation

```bash
# Installer les dépendances
pnpm install
# ou
npm install
```

## Développement Local

```bash
# Lancer le serveur de développement
pnpm run dev
# ou
npm run dev
```

## Préparation pour la Production

```bash
# Construire le projet pour la production
pnpm run build
# ou
npm run build
```

## Déploiement sur Hostinger

1. Construire le projet avec `pnpm run build`
2. Télécharger uniquement le contenu du dossier `dist` sur votre hébergement Hostinger
3. Assurez-vous que le fichier `.htaccess` est bien présent à la racine du site

## Remarques Importantes pour le Déploiement

- Les fichiers `.htaccess` et `_redirects` sont déjà configurés dans le dossier `public`
- Le fichier `vite.config.js` est configuré pour utiliser des chemins relatifs (`base: './'`)
- Vérifiez que tous les chemins dans `index.html` commencent par `./` après la construction

## Résolution des problèmes courants

Si vous rencontrez des problèmes de MIME type:

1. Vérifiez que le fichier `.htaccess` est bien présent sur votre hébergement
2. Contactez le support de votre hébergeur pour configurer correctement les types MIME pour JavaScript
3. Considérez l'utilisation de Netlify comme alternative simple

## Structure du Projet

- `/public`: Contient les ressources statiques
- `/src`: Code source
  - `/components`: Composants React
  - `/pages`: Pages du site
  - `/context`: Contextes React
  - `/data`: Données et traductions
  - `/utils`: Utilitaires
