import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/new',
  publicDir: 'public',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-htaccess',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'public/.htaccess'),
          resolve(__dirname, 'dist/.htaccess')
        )
      }
    }
  ],
})
