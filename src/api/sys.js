/*
 * @Author: ShiJunJie
 * @Date: 2021-11-15 15:48:44
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:59:34
 * @Descripttion:
 */

import https from '/@/utils/https'
import { message } from 'ant-design-vue'

const user_url = '/sys/user'

export const USER = {
  /** 获取用户列表 */
  getList: (parameter) => https.get(`${user_url}/page`, { parameter }),
  /** 添加用户信息 */
  add: (parameter) => https.post(`${user_url}`, { parameter }),
  /** 修改用户信息 */
  update: (parameter) => https.put(`${user_url}`, { parameter }),
  /** 根据ID删除用户信息 */
  delById: (id) => https.delete(`${user_url}/${id}`),
  /** 根据ID获取用户信息 */
  getById: (id) => https.get(`${user_url}/${id}`),
}

const role_url = '/sys/role'
/** 角色接口 */
export const ROLE = {
  /** 获取角色列表 */
  getList: (parameter) => https.get(`${role_url}/page`, { parameter }),
  /** 获取所有角色清单 */
  getAll: () => https.get(`${role_url}s`),
  /** 添加角色信息 */
  add: (parameter) => https.post(`${role_url}`, { parameter }),
  /** 修改角色信息 */
  update: (parameter) => https.put(`${role_url}`, { parameter }),
  /** 根据角色ID删除信息 */
  delById: (id) => https.delete(`${role_url}/${id}`),
  /** 根据角色ID获取相信信息 */
  getById: (id) => https.get(`${role_url}/${id}`),
}

const fun_url = '/sys/fun'
export const FUN = {
  /** 获取功能列表清单 (添加角色时使用) */
  get: () => https.get(fun_url),
}

const sync_url = '/sys/sync'
export const SYNC = {
  /** 保存同步设置信息 */
  setData: (parameter) => https.post(`${sync_url}/setup`, { parameter }),
  /** 获取同步配置信息 */
  getData: () => https.get(`${sync_url}/setup`),
  /** 获取用户同步数据信息  */
  getDataLog: () => https.get(`${sync_url}/data/log`),
  /** 开始同步数据 */
  startSyncData: (id) => https.get(`${sync_url}/data/${id}`),

  /** 获取员工查询状态 */
  getEmploy: () => https.get(`sys/employ/search/status`),
  /** 保存员工查询状态 */
  setEmploy: (parameter) => https.post(`sys/employ/search/status`, { parameter }),
}

const send_url = '/sys/send/email'
export const SEND = {
  /** 获取发信邮箱配置 */
  getData: () => https.get(send_url),
  /** 保存发信服务器设置 */
  setData: (parameter) => https.post(send_url, { parameter }),
}

const alarm_url = 'sys/alarm/config'
export const ALARM = {
  /** 获取报警配置信息 */
  getData: () => https.get(alarm_url),
  /** 保存报警配置 */
  setData: (parameter) => https.post(alarm_url, { parameter }),
}

const tag_url = '/sys/tag'
export const TAG = {
  /** 查询标签分页列表 */
  getDataList: (parameter) => https.get(`${tag_url}/page`, { parameter }),
  /** 根据主键获取标签信息 */
  getDataById: (id) => https.get(`${tag_url}/${id}`),
  /** 添加标签 */
  add: (parameter) => https.post(tag_url, { parameter }),
  /** 修改标签 */
  update: (parameter) => https.put(tag_url, { parameter }),
  /** 删除标签 */
  delById: (id) => https.delete(`${tag_url}/${id}`),
  /** 获取所有标签信息 */
  getAllTags: () => https.get(`${tag_url}s`),
}

/** 修改密码 */
export const updatePassword = (parameter) => https.patch(`account/password`, { parameter })

/** 系统级二次验证 */
export const SYS = {
  /** 二次验证-- 发送邮件 */
  sendEmail: (token) => https.get(`/sys/email/send/${token}`),
  /** 验证邮箱同步设置 */
  postEmailCode: (parameter) => https.post(`/sys/config/email/verify`, { parameter }),
  /** 关于系统信息 */
  getConfig: () => https.get(`system/config`),
}

/** 验证配置接口 */
export const VERIFY = {
  /** 获取验证配置 */
  getData: () => https.get(`/sys/verify/config`),
  /** 保存验证配置 */
  setData: (parameter) => https.post(`/sys/verify/config`, { parameter }),
}
