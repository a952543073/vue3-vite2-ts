import type { App } from 'vue'

/**
 * 可手动 import 引入,也可由框架(./config/vite/plugins 插件目录里的 vue-auto 插件)自动引入
 */

// import { createPinia } from 'pinia'

export default (app: App) => app.use(createPinia())
