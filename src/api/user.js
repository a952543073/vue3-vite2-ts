/*
 * @Author: ShiJunJie
 * @Date: 2021-02-01 16:26:05
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-28 09:26:00
 * @Descripttion: 用户相关 APi 接口
 */

import https from '../utils/https'
import storage from 'good-storage'

import router from '/@/router/index'

import { message } from 'ant-design-vue'

const api = {
  user: '/user/v1/',
}

export const USER = {
  /**
   * 用户登录
   * @param {*} parameter
   * @param {*} type admin employ
   * @returns
   */
  login: async (data, type) => {
    const res = await https.post(`/login/${type}`, { data })
    // const res = { code: 0, data: { userId: 1 } }
    if (res.code === 0) {
      console.log('登录返回体', res.data)
      if (res.data.userId) {
        // message.info(`${JSON.stringify(res.data)}`)
        storage.set('USER_TOKEN', { ...res.data, type })
        // const routerData = await USER.getRouter()
        const routerData = await USER.getRouterByUserId(res.data.userId)
        if (!routerData.code) {
          storage.set('USER_ROUTERS', routerData.data)
        }
      } else if (res.data.accountId) {
        storage.set('USER_TOKEN', { ...res.data, type })
        console.log(storage.get('USER_TOKEN'))
      }
    }
    return res
  },
  getRouterByUserId: (id) => https.get(`account/${id}/menu`),
  getRouter: () => {
    const res = [
      {
        name: '企业配置',
        path: '/enterprise',
        component: 'BasicLayout',
        children: [
          {
            path: '/enterprise/email/archive',
            name: '归档配置',
            component: '/enterprise/email/archive/archivePage',
            meta: {},
            buttons: [{ a: 2 }, { a: 3 }],
          },
          { path: '/enterprise/user/page', name: '账户管理', component: '/enterprise/sys/user/userPage' },
          { path: '/enterprise/role/page', name: '角色管理', component: '/enterprise/sys/role/rolePage' },
          { path: '/enterprise/email/unit', name: '员工管理', component: '/enterprise/email/unit/unitPage' },
          { path: '/enterprise/email/letter', name: '发信配置', component: '/enterprise/email/archive/letterPage' },
          { path: '/enterprise/email/alarm', name: '报警配置', component: '/enterprise/email/archive/alarmPage' },
          { path: '/enterprise/email/verify', name: '验证配置', component: '/enterprise/email/archive/verifyPage' },
        ],
      },
      {
        name: '邮件搜索',
        path: '/',
        component: 'BasicLayout',
        children: [
          { path: '/search', name: '搜索列表', component: '/email/search/page' },
          { path: '/search/:code', name: '邮件详情', component: '/email/search/pageListMail' },
        ],
      },
      {
        name: '邮件审计',
        path: '/audit',
        component: 'BasicLayout',
        children: [
          {
            path: '/audit/page',
            name: '审计管理',
            component: '/email/audit/index',
            children: [
              {
                path: '/audit/page/:id',
                name: '审计列表',
                component: '/email/audit/index',
                children: [{ path: '/audit/page/:id/:code', name: '审计邮件', component: '/email/audit/index' }],
              },
              { path: '/audit/page/report/:id', name: '审计报表', component: '/email/audit/index' },
            ],
          },
          {
            path: '/audit/approve',
            name: '申请审批',
            component: '/email/approve/page',
          },
        ],
      },
      {
        name: '辅助工具',
        path: '/tool',
        component: 'BasicLayout',
        children: [
          { path: '/tool/archive', name: '标签管理', component: '/tool/archive/page' },
          { path: '/tool/label', name: '归档备份', component: '/tool/label/page' },
        ],
      },
      {
        name: '日志管理',
        path: '/log',
        component: 'BasicLayout',
        children: [
          { path: '/log/search', name: '搜索日志', component: 'log/search/page' },
          { path: '/log/auditTask', name: '审计任务日志', component: 'log/auditTask/page' },
          { path: '/log/auditMail', name: '审计邮件日志', component: 'log/auditMail/page' },
          { path: '/log/login', name: '登录日志', component: 'log/login/page' },
          { path: '/log/browse', name: '查看日志', component: 'log/browse/page' },
          { path: '/log/archive', name: '归档日志', component: 'log/archive/page' },
          { path: '/log/backup', name: '备份日志', component: 'log/backup/page' },
          { path: '/log/synchronous', name: '同步日志', component: 'log/synchronous/page' },
        ],
      },
      {
        name: '关于系统',
        path: '/about',
        component: 'BasicLayout',
        children: [{ path: '/about', name: '关于系统', component: '/about/page' }],
      },
      {
        name: '',
        path: '/account',
        component: 'BasicLayout',
        children: [{ path: '/account/password', name: '修改密码', component: '/system/accountPassword' }],
      },
    ]
    storage.set('USER_ROUTERS', res)
  },
  loginOut: (parameter) => https.get('/account/login/out', { parameter }),
}

export const verify = {
  get: (data) => https.get(`/image/verify/${data}`, { data }),
  post: (data) => https.post(`/image/verify`, { data }),
}

export const EMAIL = {
  get: (token) => https.get(`/login/email/send/${token}`),
  forgetpassword: (parameter) => https.get(`/login/forget/password`, { parameter }),
  post: async (parameter) => {
    const res = await https.post(`/login/email/verify`, { parameter })
    if (!res.code) {
      console.log('登录返回体', res.data)
      if (res.data.userId) {
        message.info(`${JSON.stringify(res.data)}`)
        storage.set('USER_TOKEN', res.data)
        console.log(storage.get('USER_TOKEN'))
        if (storage.get('USER_TOKEN')) {
          await USER.getRouter()
        }
      }
    }
    return res
  },
}

export const ACCOUNT = {
  /** 修改密码 */
  setPassword: (parameter) => https.patch('/account/password', { parameter }),
  /** 找回密码 */
  forgetPassword: (parameter) => https.post('/login/forget/change/password', { parameter }),
}
