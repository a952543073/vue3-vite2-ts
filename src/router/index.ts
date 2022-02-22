/*
 * @Author: ShiJunJie
 * @Date: 2021-01-11 15:43:12
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 15:59:01
 * @Descripttion: 全局路由守卫
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import storage from 'good-storage'
import { createRouter, createWebHistory, createWebHashHistory, RouteLocationRaw } from 'vue-router'
import { constantRouter } from './routers/router.constant.js'
import { getAsyncRoutes } from './routers/asyncRouter.js'

// 管理端UI
const routes = [...constantRouter]
const router = createRouter({
  history: import.meta.env.VITE_NODE_ENV === 'development' ? createWebHashHistory() : createWebHistory(),
  scrollBehavior: () => ({ el: '.ant-layout-content .main', top: 0 }),
  // history: createWebHashHistory(),
  routes,
})
// 配置NProgress进度条选项 —— 动画效果
NProgress.configure({ speed: 500, showSpinner: false })

// 不需要鉴权的路由
const whiteList = ['/login', '/login/email', '/404', '/login/password', '/login/forgotpassword']

let createNewRouterType = false
if (!createNewRouterType) {
  if (storage.get('USER_ROUTERS')) {
    try {
      const accessRoutes = getAsyncRoutes(storage.get('USER_ROUTERS'))
      // 动态添加格式化过的路由
      console.log('自动生成的路由', accessRoutes, ...accessRoutes)
      accessRoutes.forEach(e => {
        router.addRoute(e)
      })
      console.log('开始创建生成动态路由')
      createNewRouterType = true
    } catch (error) {
      console.log('出错了', error)
    }
  }
}

router.beforeEach((to, from, next) => {
  if (!createNewRouterType) {
    if (storage.get('USER_ROUTERS')) {
      try {
        const accessRoutes = getAsyncRoutes(storage.get('USER_ROUTERS'))
        // 动态添加格式化过的路由
        console.log('自动生成的路由', accessRoutes, ...accessRoutes)
        accessRoutes.forEach(e => {
          router.addRoute(e)
        })
        console.log('开始创建生成动态路由')
        createNewRouterType = true
      } catch (error) {
        console.log('出错了', error)
      }
    }
  }

  // 获取路由 meta 中的title，并设置给页面标题
  document.title = '景邮箱本地归档3.0 - ' + (to.meta.title || to.name)
  // NProgress开始进度条
  NProgress.start()
  console.log('路由监听', `from:${from.path}`, `to:${to.path}`)

  // 获取用户登录的token
  if (storage.get('USER_TOKEN')) {
    if (!to.matched.length) {
      next('/404')
    } else {
      if (to.path === '/admin/home' && storage.get('USER_TOKEN').type !== 'admin') {
        next({ path: '/employ' })
      } else {
        if (to.query.redirect) {
          next(`${to.query.redirect}`)
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('非权限路由可访问')
      next()
    } else {
      // if (!to.matched.length) {
      //   next({ name: '404' })
      // } else {
      console.log('用户未登录 请登录')
      next(`/login?redirect=${to.path}`)
      // }
    }
  }
})
// console.log(router.getRoutes())
// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
  NProgress.done() // NProgress结束进度条
  // console.log(transition)
})

window.location['push'] = (urlData: RouteLocationRaw) => {
  router.push(urlData)
}

export default router
