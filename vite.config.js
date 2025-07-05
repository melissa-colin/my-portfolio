import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Plugin pour remplacer les variables d'environnement dans l'index.html
const htmlEnvPlugin = () => {
  return {
    name: 'html-env',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html, ctx) {
        return html.replace(/%VITE_GOOGLE_ANALYTICS_ID%/g, process.env.VITE_GOOGLE_ANALYTICS_ID || '')
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), htmlEnvPlugin()],
  server: {
    port: 3000
  },
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // (optional) increase warning limit to 1000kB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  preview: {
    port: 3000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})