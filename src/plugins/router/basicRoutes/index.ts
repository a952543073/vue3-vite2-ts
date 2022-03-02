/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 16:52:17
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
        name: 'home',
        component: () => import('/@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('/@/views/login/index.vue'),
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
