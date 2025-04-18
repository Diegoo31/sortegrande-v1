import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Desativa a verificação de tipos por parte do plugin React
      jsxRuntime: 'classic'
    })
  ],
  build: {
    sourcemap: true,
    // Ignorar warnings como erros
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Desativa a verificação de tipos
    tsconfigRaw: {
      compilerOptions: {
        jsx: 'react-jsx',
        jsxImportSource: 'react'
      }
    }
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      ignored: ['**/tsconfig.app.json']
    }
  }
}) 