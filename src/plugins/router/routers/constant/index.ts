/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 16:30:42
 * @Descripttion:
 */

import { BasicLayout, LoginLayout } from '/@/layouts/index'

export const constantRouter = [
  // // 管理员后台界面
  {
    path: '/',
    redirect: '/admin/home',
    component: BasicLayout,
    children: [
      {
        path: '/admin/home',
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
        name: '账号登录',
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
