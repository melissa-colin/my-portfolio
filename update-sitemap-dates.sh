#!/bin/bash

# Script pour mettre à jour automatiquement les dates lastmod dans sitemap.xml
# Utilise la date actuelle au format ISO 8601

SITEMAP_FILE="public/sitemap.xml"
CURRENT_DATE=$(date -u +"%Y-%m-%dT%H:%M:%S+00:00")

echo "📅 Mise à jour des dates dans sitemap.xml..."
echo "   Date actuelle: $CURRENT_DATE"

# Remplacer toutes les balises <lastmod> avec la date actuelle
sed -i "s|<lastmod>.*</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" "$SITEMAP_FILE"

# Vérifier si la mise à jour a réussi
if [ $? -eq 0 ]; then
    echo "✅ Sitemap mis à jour avec succès!"
    
    # Afficher un aperçu
    echo "   Aperçu des premières dates:"
    grep -m 3 "<lastmod>" "$SITEMAP_FILE" | sed 's/^/   /'
else
    echo "❌ Erreur lors de la mise à jour du sitemap"
    exit 1
fi
