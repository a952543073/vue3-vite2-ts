import { App } from 'vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { createRoutes, createGuard } from './guards';

import basicRoutes from 'virtual:generated-pages';
const routes = createRoutes(basicRoutes);
console.log('路由集', routes);

const isUseHash = import.meta.env.VITE_HTTP_ENV === 'hash';

export const router = createRouter({
	history: isUseHash ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL||'/'),
    routes
})

export default async (app: App) => {
    app.use(router)
    createGuard(router)
    await router.isReady()
}
