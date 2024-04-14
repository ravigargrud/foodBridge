import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    // Proxy all requests to 'http://localhost:8000'
    '*': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\//, '') // Remove leading '/'
    }
  }
})
