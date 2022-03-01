/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 15:36:07
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 18:11:22
 * @Descripttion: 路由守卫
 */

import { Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import storage from 'good-storage'

import { setupLayouts } from 'virtual:generated-layouts'

import getAsyncRoutes from './asyncRouter'

import NotFound from '/@/components/exception/[...404].vue'

// 配置NProgress进度条选项 —— 动画效果
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ speed: 500, showSpinner: false })

const REDIRECT_NAME = 'Redirect'

interface RouteConst {
  /** 路由名称 */
  name: String
  /** 路由路径 */
  path: string
  /** 路由标题 */
  title: string
}

// reset router
export function resetRouter(router: Router) {
  const resetWhiteNameList = ['Login', REDIRECT_NAME]
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function createRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  routes.push({ path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { layout: 'blank' } })
  return setupLayouts(routes)
}

export function createGuard(router: Router) {
  /** 动态路由 */
  let createNewRouterType = false
  const createNewRouterFun = () => {
    if (!createNewRouterType) {
      if (storage.get('USER_ROUTERS')) {
        try {
          const accessRoutes = getAsyncRoutes(storage.get('USER_ROUTERS'))
          // 动态添加格式化过的路由
          console.log('自动生成的路由', accessRoutes, ...accessRoutes)
          accessRoutes.forEach((e) => {
            router.addRoute(e)
          })
          console.log('开始创建生成动态路由')
          createNewRouterType = true
        } catch (error) {
          console.log('出错了', error)
        }
      }
    }
  }
  createNewRouterFun()

  router.beforeEach((to, from, next) => {
    createNewRouterFun()
    // 获取路由 meta 中的title，并设置给页面标题
    document.title = '景邮箱本地归档3.0 - ' + (to.meta.title || to.name)
    // NProgress开始进度条
    NProgress.start()
    console.log('路由监听', `from:${from.path}`, `to:${to.path}`)

    //在跳转路由之前，先清除所有的请求(结合axios使用)
    // clearPending();

    const needLogin = Boolean(to.meta?.requiresAuth)
    if (needLogin && !storage.get('USER_TOKEN')) {
      // 此路由需要授权，请检查是否已登录
      next({ name: 'login', query: { redirect: to.fullPath } })
    }

    next()
  })

  router.afterEach((to, from, fail) => {
    if (fail) {
      // window.$loadingBar?.error()
    } else {
      NProgress.done() // NProgress结束进度条
      // window.$loadingBar?.finish()
    }
  })

  router.onError((error) => {
    console.log('路由错误', error)
  })
}
