/*
 * @Author: ShiJunJie
 * @Date: 2021-09-07 11:13:45
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:08:39
 * @Descripttion: 入口文件
 */
/**
 * ======================================================================
 * 项目入口[此文件基本不需要进行修改，更多扩展组件插件请在plugins目录统一维护]
 * ----------------------------------------------------------------------
 * Author: 曹操<pgcao@qq.com>(https://gitee.com/pgcao/vue3-vite2-ts)
 * ----------------------------------------------------------------------
 */
import { createApp } from 'vue'
import bootstrapPlugins from "./plugins"
import App from './App.vue'

import 'ant-design-vue/dist/antd.css'
// css 样式重写
import './assets/style/index.scss'
// 设置ant 时间组件的语言
import dayjs from 'dayjs'
import zh_CN from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh_CN)
dayjs.extend(relativeTime)

const app = createApp(App)

// 引导装载项目所依赖的第三方组件插件, 放在plugins目录统一维护
void bootstrapPlugins(app, () => app.mount('#app'))
