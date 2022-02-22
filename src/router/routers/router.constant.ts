/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 10:14:06
 * @Descripttion:
 */

import { BasicLayout, LoginLayout } from '../../layouts/index'

export const constantRouter = [
  // 员工后台界面
  // {
  //   path: '/employ',
  //   redirect: '/employ/home',
  //   component: BasicLayout,
  //   children: [
  //     {
  //       path: 'home',
  //       name: '归档邮件查询',
  //       component: () => import('/@/views/employ/home.vue'),
  //     },
  //     {
  //       path: 'list',
  //       name: '邮件恢复队列',
  //       component: () => import('/@/views/employ/list.vue'),
  //     },
  //   ],
  // },
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
  // {
  //   path: '/login',
  //   component: LoginLayout,
  //   children: [
  //     {
  //       path: '',
  //       name: '账号登录',
  //       component: () => import('/@/views/login/login.vue'),
  //     },
  //     {
  //       path: 'email',
  //       name: '邮箱验证',
  //       component: () => import('/@/views/login/email.vue'),
  //     },
  //     {
  //       path: 'forgotpassword',
  //       name: '忘记密码',
  //       component: () => import('/@/views/login/forgotpassword.vue'),
  //     },
  //     {
  //       path: 'password',
  //       name: '找回密码',
  //       component: () => import('/@/views/login/password.vue'),
  //     },
  //   ],
  // },
  // //默认404
  // {
  //   path: '/error',
  //   component: LoginLayout,
  //   children: [
  //     {
  //       path: '/404',
  //       name: '404',
  //       component: () => import('/@/views/exception/404.vue'),
  //     },
  //   ],
  // },
]
