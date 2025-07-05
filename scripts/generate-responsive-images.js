import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

class ResponsiveImageGenerator {
  constructor(options = {}) {
    this.inputDir = options.inputDir || 'public/assets/images';
    this.outputDir = options.outputDir || 'public/assets/images-optimized';
    this.formats = options.formats || ['webp', 'avif'];
    this.sizes = options.sizes || [320, 640, 768, 1024, 1280, 1920];
    this.quality = options.quality || 75;
  }

  async generateResponsiveImages() {
    const files = await this.getImageFiles();
    
    for (const file of files) {
      await this.processImage(file);
    }
  }

  async getImageFiles() {
    const entries = await fs.readdir(this.inputDir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subFiles = await this.getImageFiles(path.join(this.inputDir, entry.name));
        files.push(...subFiles);
      } else if (this.isImageFile(entry.name)) {
        files.push(path.join(this.inputDir, entry.name));
      }
    }

    return files;
  }

  isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.tiff', '.bmp'].includes(ext);
  }

  async processImage(inputPath) {
    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();
      const filename = path.basename(inputPath, path.extname(inputPath));
      const relativePath = path.relative(this.inputDir, path.dirname(inputPath));
      const outputPath = path.join(this.outputDir, relativePath);

      // Créer le dossier de sortie
      await fs.mkdir(outputPath, { recursive: true });

      // Générer les différentes tailles
      for (const size of this.sizes) {
        if (size > metadata.width) continue; // Ne pas agrandir

        // Redimensionner l'image
        const resized = image.clone().resize(size, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });

        // Générer l'image originale redimensionnée
        const originalExt = path.extname(inputPath);
        await resized
          .jpeg({ quality: this.quality })
          .toFile(path.join(outputPath, `${filename}_${size}w${originalExt}`));

        // Générer les formats modernes
        for (const format of this.formats) {
          const formatOptions = this.getFormatOptions(format);
          await resized
            .toFormat(format, formatOptions)
            .toFile(path.join(outputPath, `${filename}_${size}w.${format}`));
        }
      }

      console.log(`✅ Processed: ${inputPath}`);
    } catch (error) {
      console.error(`❌ Error processing ${inputPath}:`, error);
    }
  }

  getFormatOptions(format) {
    switch (format) {
      case 'webp':
        return { quality: this.quality, effort: 4 };
      case 'avif':
        return { quality: this.quality, effort: 4 };
      case 'jpeg':
        return { quality: this.quality, progressive: true };
      case 'png':
        return { quality: this.quality, compressionLevel: 8 };
      default:
        return { quality: this.quality };
    }
  }

  // Méthode pour nettoyer les anciens fichiers
  async cleanOutputDir() {
    try {
      await fs.rm(this.outputDir, { recursive: true, force: true });
      await fs.mkdir(this.outputDir, { recursive: true });
      console.log(`🧹 Cleaned output directory: ${this.outputDir}`);
    } catch (error) {
      console.error('Error cleaning output directory:', error);
    }
  }
}

// Script à exécuter
async function main() {
  const generator = new ResponsiveImageGenerator({
    inputDir: 'public/assets/images',
    outputDir: 'public/assets/images-optimized',
    formats: ['webp', 'avif'],
    sizes: [320, 640, 768, 1024, 1280, 1920],
    quality: 75
  });

  console.log('🚀 Starting responsive image generation...');
  
  // Nettoyer le dossier de sortie
  await generator.cleanOutputDir();
  
  // Générer les images responsives
  await generator.generateResponsiveImages();
  
  console.log('✨ Responsive image generation completed!');
}

// Exporter pour utilisation en module
export default ResponsiveImageGenerator;

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
