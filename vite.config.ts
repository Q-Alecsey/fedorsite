import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/fedorsite/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@scss': path.resolve(__dirname, './src/utils/scss'),
      '@components': path.resolve(__dirname, './src/components'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@CustomHooks': path.resolve(__dirname, './src/CustomHooks'),
    },
  },
})
