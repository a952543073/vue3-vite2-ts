/*
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 17:48:58
 * @Descripttion: 入口文件
 */
import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:svg-icons-register'

import router from '/@/router/index'
import globalComponents from '/@/components/global/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// css 样式重写
import './style/index.less'

const app = createApp(App)

// 设置ant 时间组件的语言
import dayjs from 'dayjs'
import zh_CN from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh_CN)
dayjs.extend(relativeTime)

app.use(Antd)
app.use(globalComponents)
app.use(router)
app.mount('#app')

window.global = window
