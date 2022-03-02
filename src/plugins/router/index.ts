/*
 * @Author: ShiJunJie
 * @Date: 2021-01-11 15:43:12
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 14:59:07
 * @Descripttion: 全局路由守卫
 */
import { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import customBasicRoutes from './basicRoutes'
import autoBasicRoutes from 'virtual:generated-pages'

import { createRoutes, createGuard } from './guards'

const isUseHash = import.meta.env.VITE_HTTP_ENV === 'hash'

// 根据配置项采用组件自动路由还是 手动编写的固定路由
const routes = import.meta.env.VITE_ROUTES === 'auto' ? createRoutes(autoBasicRoutes) : [...customBasicRoutes]
console.log(routes)

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
