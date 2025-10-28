#!/bin/bash

echo "🖼️ Optimisation des images avec formats modernes en cours..."

# Créer un dossier pour les images optimisées
mkdir -p public/assets/images-optimized

# Fonction pour optimiser une image avec conversion vers formats modernes
optimize_image() {
    local input="$1"
    local output_base="$2"
    local quality="$3"
    local width="$4"
    
    if command -v convert &> /dev/null; then
        echo "Optimisation de $input..."
        
        # Nom de base sans extension
        local base_name="${output_base%.*}"
        
        # Créer version originale optimisée
        convert "$input" -quality "$quality" -resize "${width}x${width}>" -strip "$output_base"
        echo "✅ $input optimisée vers $output_base"
        
        # Créer version WebP (meilleure compression)
        if command -v cwebp &> /dev/null; then
            cwebp -q "$quality" -resize "$width" "$width" "$input" -o "${base_name}.webp"
            echo "✅ Version WebP créée: ${base_name}.webp"
        else
            # Fallback avec ImageMagick
            convert "$input" -quality "$quality" -resize "${width}x${width}>" -strip "${base_name}.webp"
            echo "✅ Version WebP créée avec ImageMagick: ${base_name}.webp"
        fi
        
        # Créer version AVIF (format le plus moderne)
        if command -v avifenc &> /dev/null; then
            avifenc --min 0 --max 63 --speed 4 -a end-usage=q -a cq-level="$((quality*63/100))" "$input" "${base_name}.avif"
            echo "✅ Version AVIF créée: ${base_name}.avif"
        elif command -v convert &> /dev/null && convert -list format | grep -q AVIF; then
            convert "$input" -quality "$quality" -resize "${width}x${width}>" -strip "${base_name}.avif"
            echo "✅ Version AVIF créée avec ImageMagick: ${base_name}.avif"
        else
            echo "⚠️ AVIF non supporté, seulement WebP généré"
        fi
        
    else
        echo "❌ ImageMagick n'est pas installé. Copie de l'image originale."
        cp "$input" "$output_base"
    fi
}

# Optimiser les images de profil (réduire à 800px max)
if [ -f "public/assets/images/profile-image.jpeg" ]; then
    optimize_image "public/assets/images/profile-image.jpeg" "public/assets/images-optimized/profile-image.jpeg" 80 800
fi

if [ -f "public/assets/images/profile-image1.jpg" ]; then
    optimize_image "public/assets/images/profile-image1.jpg" "public/assets/images-optimized/profile-image1.jpg" 80 800
fi

# Optimiser les images de projets (réduire à 1200px max)
mkdir -p public/assets/images-optimized/projects
for img in public/assets/images/projects/*.png public/assets/images/projects/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        optimize_image "$img" "public/assets/images-optimized/projects/$filename" 85 1200
    fi
done

# Optimiser les images de blog (réduire à 1000px max)
if [ -f "public/assets/images/blog-yolov8.jpg" ]; then
    optimize_image "public/assets/images/blog-yolov8.jpg" "public/assets/images-optimized/blog-yolov8.jpg" 85 1000
fi

# Copier les autres images sans modification
cp -r public/assets/images/logos public/assets/images-optimized/ 2>/dev/null || true
cp public/assets/images/favicon.* public/assets/images-optimized/ 2>/dev/null || true
cp public/assets/images/eirbia.jpeg public/assets/images-optimized/ 2>/dev/null || true

echo "🎉 Optimisation terminée! Les images optimisées sont dans public/assets/images-optimized/"
echo "📊 Comparaison des tailles:"
echo "Avant:"
du -sh public/assets/images
echo "Après:"
du -sh public/assets/images-optimized
