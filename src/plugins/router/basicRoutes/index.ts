/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 09:04:53
 * @Descripttion:
 */

import { BasicLayout, LoginLayout } from '/@/layouts/index'

export default [
  // // 管理员后台界面
  {
    path: '/',
    redirect: '/admin/home',
    meta: { requiresAuth: true },
    component: BasicLayout,
    children: [
      {
        path: '/admin/home',
        meta: { requiresAuth: true },
        name: '工作台',
        component: () => import('/@/views/home/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: '登录',
        component: () => import('/@/views/login/login.vue'),
      },
    ],
  },
  //默认404
  {
    path: '/error',
    component: LoginLayout,
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('/@/components/exception/[...404].vue'),
      },
    ],
  },
]
