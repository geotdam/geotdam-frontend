import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  optimizeDeps: {
    include: ['socket.io-client', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/socket.io-client/, /node_modules\/react/, /node_modules\/react-dom/]
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'kakao-sdk': ['kakao-maps-sdk']
        }
      }
    }
  },
  assetsInclude: ['**/*.svg'],
  resolve: {
    alias: {
      '@assets': '/src/assets'
    }
  },
  define: {
    global: 'window'
  }
})