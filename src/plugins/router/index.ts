/*
 * @Author: ShiJunJie
 * @Date: 2021-01-11 15:43:12
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 18:03:26
 * @Descripttion: 全局路由守卫
 */
import { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import basicRoutes from './basicRoutes'

import { createRoutes, createGuard } from './guards'

const isUseHash = import.meta.env.VITE_HTTP_ENV === 'hash'

// 管理端UI
const routes = [...basicRoutes] || createRoutes(basicRoutes)

const router = createRouter({
  history: isUseHash ? createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL || '/'),
  scrollBehavior: () => ({ el: '.ant-layout-content .main', top: 0 }),
  routes,
})

export default async (app: App) => {
  app.use(router)
  createGuard(router)
  await router.isReady()
}
