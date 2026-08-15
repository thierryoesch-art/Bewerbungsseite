import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Im Dev-Betrieb laeuft Vite auf 5173 und der Express-Server auf 3000.
      // Ohne diesen Proxy wuerde /api/login von Vite beantwortet — mit der
      // index.html und Status 200. Der Browser sieht so beide unter derselben
      // Herkunft, darum funktionieren auch die Cookies wie spaeter im Betrieb.
      '/api': 'http://localhost:3000',
    },
  },
})
