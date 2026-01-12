# Guide Rapide - Clone et Déploiement

## 🚀 Pour cloner et démarrer rapidement

### Option 1 : Clone automatique avec submodules (RECOMMANDÉ)
```bash
git clone --recurse-submodules git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio
pnpm install
```

### Option 2 : Clone puis setup automatique
```bash
git clone git@github.com:melissa-colin/my-portfolio.git
cd my-portfolio
./setup.sh
```

## 📦 Le submodule my-portfolio-dist

### Qu'est-ce que c'est ?
- Un repository Git séparé pour GitHub Pages
- Contient la version buildée du site
- Géré automatiquement par `deploy.sh`

### Pourquoi cette architecture ?
- **Séparation** : Code source dans `my-portfolio`, site build dans `my-portfolio-dist`
- **GitHub Pages** : GitHub Pages sert le contenu de `my-portfolio-dist`
- **Historique propre** : L'historique des builds est séparé du code source

### Pas besoin de gérer manuellement !
Le script `deploy.sh` gère tout automatiquement :
1. Vérifie si le submodule est initialisé
2. L'initialise si nécessaire
3. Build le site
4. Copie dans `my-portfolio-dist`
5. Commit et push automatiquement

## 🎯 Commandes essentielles

```bash
# Développement
./run-dev.sh

# Déploiement (fait TOUT automatiquement)
./deploy.sh
```

## ⚠️ Important

**Après un `git clone` classique :**
- Le dossier `my-portfolio-dist` existe mais est vide
- **Solution** : Lancez `./deploy.sh`, il initialisera automatiquement le submodule
- Ou lancez `./setup.sh` pour tout configurer d'un coup

**Ne JAMAIS modifier manuellement `my-portfolio-dist`**
- C'est un dossier généré automatiquement
- Toutes vos modifications seront écrasées au prochain build

## 🔧 Configuration Git

### Pour toujours cloner avec les submodules automatiquement
```bash
git config --global submodule.recurse true
```

Après cette config, tous les futurs `git clone` initialiseront automatiquement les submodules !
