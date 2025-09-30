import os from 'os'
import express from 'express'
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";

// middleware
import { middlewareHTTPError404Next, middlewareHTTPError } from "./middleware/errors.js"

// router
import routerApiHello from './api/hello.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const viteNodeApp = express()

const PORT = process.env.PORT || import.meta.env.VITE_PORT;

// middleware
viteNodeApp.use(cors())
viteNodeApp.use(express.json())

// === API ===
viteNodeApp.use('/api', routerApiHello)

// dev
if (import.meta.env.MODE === 'development') {
    viteNodeApp.use(middlewareHTTPError404Next, middlewareHTTPError)

} else if (import.meta.env.MODE === 'production') {
// prod
    viteNodeApp.use('/assets',express.static(path.join(__dirname, 'client', 'assets')))

    viteNodeApp.use((req, res, next) => {
        if (req.method !== 'GET') return next()
        if (req.path.startsWith('/api')) return next()

        res.sendFile(path.join(__dirname, 'client', 'index.html'))
    })

    // all error
    viteNodeApp.use(middlewareHTTPError404Next, middlewareHTTPError)

    const server = viteNodeApp.listen(PORT, () => {
        const interfaces = os.networkInterfaces()
        const address = []

        console.log('🚀 Server Running')

        for (let iface of Object.values(interfaces)) {
            if (!iface) continue
            for (let i of iface) {
                if (i.family === 'IPv4' /*&& !i.internal*/) {
                    console.log(` ➤ http://${i.address}:${PORT}`)
                }
            }
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ Port ${PORT} is already in use`);
        } else {
            console.error('Server error:', err);
        }
    });
}