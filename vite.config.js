import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [react()],
  css: {
    postcss: {
      plugins: []
    }
  },
  build: {
    target: 'es2020',
    cssTarget: 'es2020'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
})
