import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    server: {
        port: 3000,
        host: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true,

                rewrite: (path) => path.replace(/^\/api/, '/api')
            },
        }
    },
    build: {
        outDir: 'dist/client',
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[hash].js',
                chunkFileNames: 'assets/[hash].js',
                assetFileNames: 'assets/[hash].[ext]'
            }
        }
    }
})
