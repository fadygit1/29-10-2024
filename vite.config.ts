import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'comlink',
      'crypto-js',
      'secp256k1',
      'bs58',
      'buffer'
    ]
  }
})