import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from "./middleware/loadLayoutMiddleware"

// Importing components
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'

import Error_404 from '../pages/error_404.vue'

// We determine routes
const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            layout: "AppDefaultLayout",
        }
    },
    {
        path: '/about',
        component: About,
        meta: {
            layout: "AppDefaultLayout1",
        }
    },
    {
        path: '/:pathMatch(.*)*',
        component: Error_404,
        meta: {
            layout: "AppNotFoundLayout",
        }
    }
]

// Let's create a router
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(loadLayoutMiddleware)

export default router
