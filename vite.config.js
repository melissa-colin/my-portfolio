import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Plugin pour remplacer les variables d'environnement dans l'index.html
const htmlEnvPlugin = (env) => {
  return {
    name: 'html-env',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, ctx) {
        // Remplacer les variables d'environnement
        let transformedHtml = html.replace(/%VITE_GOOGLE_ANALYTICS_ID%/g, env.VITE_GOOGLE_ANALYTICS_ID || '');
        
        // S'assurer que les meta tags SEO essentiels sont présents
        if (!transformedHtml.includes('<meta name="description"')) {
          const descriptionMeta = '<meta name="description" content="Mélissa Colin, étudiante ingénieure en intelligence artificielle à l\'ENSEIRB-MATMECA, spécialisée en vision par ordinateur et deep learning." />';
          transformedHtml = transformedHtml.replace('<meta name="viewport"', descriptionMeta + '\n  <meta name="viewport"');
        }
        
        return transformedHtml;
      }
    }
  }
}

// Plugin pour copier les fichiers spéciaux comme .htaccess
const copySpecialFilesPlugin = () => {
  return {
    name: 'copy-special-files',
    writeBundle(options, bundle) {
      const fs = require('fs');
      const path = require('path');
      
      // Copier .htaccess depuis public/ vers le dossier de build
      const htaccessSource = path.resolve('public/.htaccess');
      const htaccessDest = path.resolve(options.dir, '.htaccess');
      
      if (fs.existsSync(htaccessSource)) {
        fs.copyFileSync(htaccessSource, htaccessDest);
        console.log('✓ .htaccess copié dans le dossier de build');
      }
    }
  }
}

// Plugin pour générer un manifest de preload
const preloadManifestPlugin = () => {
  return {
    name: 'preload-manifest',
    generateBundle(options, bundle) {
      const preloadAssets = [];
      
      Object.entries(bundle).forEach(([fileName, asset]) => {
        if (asset.type === 'asset' && asset.fileName.includes('index')) {
          preloadAssets.push({
            file: asset.fileName,
            type: fileName.endsWith('.css') ? 'style' : 'script'
          });
        }
      });
      
      this.emitFile({
        type: 'asset',
        fileName: 'preload-manifest.json',
        source: JSON.stringify(preloadAssets, null, 2)
      });
    }
  }
}

export default defineConfig(({ command, mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
  plugins: [
    react(), 
    htmlEnvPlugin(env),
    preloadManifestPlugin(),
    copySpecialFilesPlugin()
  ],
  server: {
    port: 3000
  },
  base: './',
  build: {
    outDir: 'my-portfolio-dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    // Copier les fichiers spéciaux
    copyPublicDir: true,
    // Optimisations des assets
    assetsInlineLimit: 4096, // Inline les assets < 4kb pour réduire les requêtes
    cssCodeSplit: true,
    minify: 'esbuild', // Utiliser esbuild pour une minification plus rapide
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Séparer les dépendances vendor pour un meilleur cache
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          // Organiser les assets par type pour un meilleur cache
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/woff2?|ttf|eot/i.test(ext)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        }
      },
      // Optimiser les dépendances externes
      external: [],
    }
  },
  // Optimisations pour le dev
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion',
      'react-router-dom',
      'react-helmet'
    ]
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@data': resolve(__dirname, 'src/data'),
      '@assets': resolve(__dirname, 'src/assets')
    }
  }
  }
})