/*
 * @Author: ShiJunJie
 * @Date: 2022-03-15 11:15:05
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 12:05:34
 * @Descripttion: 
 */
/**
 * 插件功能：从 src/views 目录自动生成文件路由
 */

import type { App } from 'vue'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import customBasicRoutes from './basicRoutes'
import autoBasicRoutes from 'virtual:generated-pages'

import { createRoutes, createGuard } from './guards'

const isUseHash = import.meta.env.VITE_APP_HTTP_ENV === 'hash'

// 根据配置项采用组件自动路由还是 手动编写的固定路由
const routes = import.meta.env.VITE_APP_ROUTES === 'auto' ? createRoutes(autoBasicRoutes) : [...customBasicRoutes]
console.log('routes', routes)
console.log('autoBasicRoutes', autoBasicRoutes)
console.log('customBasicRoutes', customBasicRoutes)

const router = createRouter({
  history: isUseHash ? createWebHashHistory() : createWebHistory(import.meta.env.VITE_APP_BASE_URL || '/'),
  scrollBehavior: () => ({ el: '.ant-layout-content .main', top: 0 }),
  routes,
})

export default async (app: App) => {
  app.use(router)
  createGuard(router)
  await router.isReady()
}
