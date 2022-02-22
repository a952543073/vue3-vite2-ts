/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 10:01:50
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:42:03
 * @Descripttion:
 */
import axios from 'axios'
import storage from 'good-storage'

import { message } from 'ant-design-vue'

// 创建 axios 实例
const base_url = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_BASE_URL : ''
const request = axios.create({
  // API 请求的默认前缀
  baseURL: base_url,
  timeout: 20000, // 请求超时时间
})

window['BASE_URL'] = import.meta.env.VITE_BASE_URL
console.log('BASE_URL', import.meta.env.VITE_BASE_URL)
// 异常拦截处理器

const errorHandler = (error: { response: { data: { message: any }; status: number }; message: any }) => {
  // console.log(error)
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const user = storage.get('USER_TOKEN')
    if (error.response.status === 403) {
      console.error({
        message: 'Forbidden',
        description: data.message,
      })
    }
    if (error.response.status === 401 && !(data['result'] && data['result']['isLogin'])) {
      console.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      })
      if (user) {
        storage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    }
  }

  const errMsgMap = {
    'Network Error': '无法连接网络，请确认网络连接是否正常',
    'Request failed with status code 500': '服务器响应异常 - 请联系管理员',
    'Request failed with status code 400': '参数格式不正确 - 请联系管理员',
    'timeout of 5000ms exceeded': '请求超时 请重试',
  }

  const errMsg =
    errMsgMap[error?.response?.data?.message || error?.message] || error?.response?.data?.message || error?.message
  const ret = { code: 999999, msg: errMsg, data: error?.response?.data }
  if (errMsg !== '中断请求') {
    message.destroy()
    message.error(errMsg)
    console.error('错误拦截器', '\n', ret, '\n', error)
  }
  return ret
}

// 定义全局参数
window['axiosCancel'] = []
// request interceptor  请求拦截器
request.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.cancelToken = new axios.CancelToken(cancel => {
      window['axiosCancel'].push({
        cancel,
      })
    })

    console.warn(`调用了 get 请求`)
    let parameter = config['parameter']
    if (parameter) {
      let urlCode = parameter ? '?' : ''
      for (const k in parameter) {
        const v = parameter[k]
        urlCode += `${k}=${v}&`
      }
      urlCode = urlCode.substring(0, urlCode.length - 1)
      config.url += urlCode
    }
  }

  const method = ['post', 'put', 'patch', 'delete']
  if (method.indexOf(config.method) !== -1) {
    console.warn(`调用了 ${config.method} 请求`)
    // headers:{'Content-Type':'multipart/form-data'}
    config.headers['Content-Type'] = 'application/json'

    config.data = config?.data?.parameter || config['parameter'] || null
  }

  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  const user = storage.get('USER_TOKEN')
  if (user) {
    config.headers['Authorization'] = user.authorization || user.token || 'test'
  }
  console.log('请求拦截器\n', config)
  return config
}, errorHandler)

// response interceptor  响应拦截器
request.interceptors.response.use(response => {
  const _response = { ...response.data }
  if (_response.code !== 0) {
    const resData = _response.data
    let msg = ''
    if (resData) {
      Object.keys(resData).forEach(e => {
        msg += `${resData[e]}`
      })
    }
    console.log(msg, _response.msg)
    message.warn(msg || _response.msg)

    if (_response.code === 601) {
      message.warn('非法请求 请重新登录')
      storage.clear()
      // window.location.push && window.location.push('/')
      setTimeout(() => {
        window.location.reload()
      }, 1500)
      // router.replace('/')
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000)
    }
  }
  console.log(`响应拦截器`, _response)
  return Promise.resolve(_response)
}, errorHandler)

export default request
