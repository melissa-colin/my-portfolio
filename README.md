# Melissa Colin - AI Researcher Portfolio

Ce projet est un site web portfolio pour présenter les compétences, projets et publications de Melissa Colin, chercheuse en intelligence artificielle.

## Configuration Technique

- **Frontend**: React avec Vite, Tailwind CSS
- **Langues**: Support multilingue (français et anglais)
- **Déploiement**: GitHub Pages avec submodule `my-portfolio-dist`

## Prérequis

- Node.js (version 14 ou supérieure)
- pnpm (recommandé) ou npm
- Git

## Installation

### Méthode 1 : Clone avec submodules (Recommandée)

```bash
# Cloner le projet avec les submodules automatiquement
git clone --recurse-submodules git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio

# Installer les dépendances
pnpm install
```

### Méthode 2 : Clone puis initialisation

```bash
# Cloner le projet
git clone git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio

# Lancer le script de setup (initialise submodules + dépendances)
./setup.sh
```

### Méthode 3 : Installation manuelle

```bash
# Cloner le projet
git clone git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio

# Initialiser les submodules
git submodule update --init --recursive

# Installer les dépendances
pnpm install
```

## Développement Local

```bash
# Lancer le serveur de développement
./run-dev.sh
# ou
pnpm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Build et Déploiement

### Déploiement automatique en production

```bash
# Build optimisé + déploiement sur GitHub Pages
./deploy.sh
```

Ce script :
- ✅ Initialise automatiquement le submodule si nécessaire
- ✅ Build le projet avec optimisations
- ✅ Optimise les images (WebP, AVIF)
- ✅ Met à jour le sitemap
- ✅ Vérifie le SEO
- ✅ Déploie sur GitHub Pages (my-portfolio-dist)
- ✅ Push les changements

### Build uniquement (sans déploiement)

```bash
# Build optimisé sans déployer
./build-optimized.sh
```

## Remarques Importantes

### Submodule my-portfolio-dist

Ce projet utilise un submodule Git pour le déploiement sur GitHub Pages :
- Le dossier `my-portfolio-dist` est un repository séparé
- Il contient la version buildée du site
- Le script `deploy.sh` gère automatiquement le submodule

**Après un clone, le submodule sera automatiquement initialisé au premier `./deploy.sh`**

### Configuration du déploiement

- Les fichiers `.htaccess` et `_redirects` sont déjà configurés dans le dossier `public`
- Le fichier `vite.config.js` est configuré pour utiliser des chemins relatifs (`base: './'`)
- Vérifiez que tous les chemins dans `index.html` commencent par `./` après la construction

## Résolution des problèmes courants

### Submodule non initialisé

Si vous voyez `my-portfolio-dist` vide après un clone :

```bash
# Solution automatique (recommandée)
./setup.sh

# Ou manuellement
git submodule update --init --recursive
```

### Problèmes de MIME type

Si vous rencontrez des problèmes de MIME type:

1. Vérifiez que le fichier `.htaccess` est bien présent sur votre hébergement
2. Contactez le support de votre hébergeur pour configurer correctement les types MIME pour JavaScript
3. Considérez l'utilisation de Netlify comme alternative simple

## Structure du Projet

- `/public`: Ressources statiques
- `/src`: Code source React
  - `/components`: Composants réutilisables
  - `/pages`: Pages du site
  - `/context`: Contextes React (langue, thème)
  - `/data`: Données et traductions
  - `/utils`: Utilitaires
- `/my-portfolio-dist`: Submodule pour GitHub Pages (auto-géré)
- `/scripts`: Scripts d'optimisation

## Scripts Disponibles

| Script | Description |
|--------|-------------|
| `./setup.sh` | Configuration initiale (submodules + dépendances) |
| `./run-dev.sh` | Serveur de développement |
| `./deploy.sh` | Build + déploiement automatique |
| `./build-optimized.sh` | Build optimisé sans déploiement |
| `./optimize-images.sh` | Optimisation des images (WebP, AVIF) |
| `./seo-audit.sh` | Audit SEO du site |
| `./validate-seo.sh` | Validation SEO post-build |

## Workflow de Développement Recommandé

```bash
# 1. Premier clone
git clone --recurse-submodules git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio

# 2. Développement
./run-dev.sh

# 3. Test et validation
./build-optimized.sh
./seo-audit.sh

# 4. Déploiement
./deploy.sh
```

## Site en Production

🔗 **https://melissacolin.ai**

Le site est automatiquement déployé sur GitHub Pages via le submodule `my-portfolio-dist`.
