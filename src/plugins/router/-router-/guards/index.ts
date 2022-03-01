/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 09:41:47
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 11:10:44
 * @Descripttion:
 */
import { Router } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'

import NotFound from '/@/components/exception/[...404].vue'

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
  router.beforeEach((to, from, next) => {
    // window.$loadingBar?.start();

    //在跳转路由之前，先清除所有的请求(结合axios使用)
    // clearPending();

    const needLogin = Boolean(to.meta?.requiresAuth)
    if (needLogin && !localStorage.getItem('app-token')) {
      // 此路由需要授权，请检查是否已登录
      next({ name: 'login', query: { redirect: to.fullPath } })
    }

    next()
  })

  router.afterEach((to, from, fail) => {
    if (fail) {
      // window.$loadingBar?.error()
    } else {
      // window.$loadingBar?.finish()
    }
  })

  router.onError((error) => {
    console.log(error, '路由错误')
  })
}
