import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
  },
  // Add base path configuration
  base: './',
  // This ensures the router works correctly in production
  preview: {
    port: 3000
  },
})
