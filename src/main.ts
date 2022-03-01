/*
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 11:03:18
 * @Descripttion: 入口文件
 */

import { createApp } from 'vue'
import App from './App.vue'
import setupPlugin from './plugins/index'

import 'virtual:svg-icons-register'

// [vueRequest全局配置](https://www.attojs.com/api/#manual)
import { setGlobalOptions } from 'vue-request'
setGlobalOptions({
  manual: true, //当 manual 设置为 true 时，你需要手动触发 run 才会发起请求
  // refreshOnWindowFocus: true, // 浏览器视窗焦点触发
  // refocusTimespan: 1000, // 请求间隔时间
})

const app = createApp(App)

// 设置ant 时间组件的语言
import dayjs from 'dayjs'
import zh_CN from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh_CN)
dayjs.extend(relativeTime)

// 装载项目所依赖的第三方插件
setupPlugin(app, () => app.mount('#app'))

// css 样式重写
import './assets/style/index.scss'

window.global = window
