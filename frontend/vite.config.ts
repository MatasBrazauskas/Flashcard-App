import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Your React dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Your Spring Boot backend
        changeOrigin: true,
        secure: false, // For local dev
      },
    },
    // --- ADD OR MODIFY THIS HMR SECTION ---
    hmr: {
      clientPort: 80, // Tell the client to connect back to port 80 (Nginx's port)
      host: 'localhost', // Tell the client to connect back to 'localhost'
      // If you were using HTTPS with Nginx, you'd add: protocol: 'wss'
    }
  }
})
