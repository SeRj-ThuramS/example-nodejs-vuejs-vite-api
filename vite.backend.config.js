import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import externals from 'vite-plugin-node-externals'

// Задаём порты для dev и prod
const PORTS = {
    development: 3001,
    production: 8084,

};

export default defineConfig(({ mode }) => {
    const PORT = PORTS[mode] || PORTS.development;

    return {
        define: {
            'import.meta.env.VITE_PORT': JSON.stringify(PORT),
        },
        plugins: [
            externals(),
            VitePluginNode({
                adapter: 'express',
                appPath: './server/server.js',
                exportName: 'viteNodeApp',
                tsCompiler: 'esbuild',
                initAppOnBoot: true,
                reloadAppOnFileChange: true,
                env: {
                    PORT, // передаём в Express через process.env.PORT
                },
            }),
        ],
        server: {
            port: PORT,
            host: true,
        },
        build: {
            outDir: './dist',
            copyPublicDir: false,
            emptyOutDir: false,
            minify: true,
            ssr: true,
        },
    };
});
