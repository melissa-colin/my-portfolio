# Configuration Git recommandée pour ce projet

# Pour toujours cloner les submodules automatiquement (config globale)
git config --global submodule.recurse true

# Ou juste pour ce projet (config locale)
git config submodule.recurse true

# Initialiser les submodules après un clone sans --recurse-submodules
git submodule update --init --recursive

# Mettre à jour tous les submodules
git submodule update --remote

# Voir le statut des submodules
git submodule status
