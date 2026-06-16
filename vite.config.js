import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Customer storefront runs on 3001 (backend API = 3000, admin panel = 3002).
  // strictPort: fail loudly if 3001 is taken instead of silently using another.
  server: { port: 3001, strictPort: true },
  preview: { port: 3001, strictPort: true },
})
