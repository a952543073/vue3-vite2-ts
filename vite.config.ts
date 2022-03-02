/*
 * @Author: ShiJunJie
 * @Date: 2021-08-03 14:25:29
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 16:30:43
 * @Descripttion:
 */
import { defineConfig, loadEnv, Alias } from 'vite'
import { envToType, formatEnv } from '/#/vite/server/utils'
import { createVitePlugins, createViteBuild, createViteServer } from '/#/vite'
import pkg from './package.json'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  envToType()
  const { dependencies, devDependencies, name, version } = pkg
  const viteEnv = formatEnv(loadEnv(mode, `./config/`))
  const isDev = mode === 'development'
  const isBuild = command === 'build'

  // 引用资源标识别名
  const alias: Alias[] = [
    { find: '/@', replacement: resolve(__dirname, 'src') },
    { find: '/#', replacement: resolve(__dirname, 'config') },
  ]

  // 开发环境解决警告: You are running the esm-bundler build of vue-i18n.
  isDev && alias.push({ find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.cjs.js' })

  // 项目全局变量
  const __APP__ = {
    pkg: { name, version, dependencies, devDependencies },
    env: viteEnv,
    lastBuildTime: new Date().toUTCString(),
  }

  const vitePluginsData = { envs: viteEnv, isBuild, command, mode }
  console.log(vitePluginsData)

  return {
    mode: viteEnv.VITE_NODE_ENV == 'pro' ? 'production' : 'development',
    base: viteEnv.VITE_APP_BASE_URL || '',
    define: { __APP__: JSON.stringify(__APP__) },
    build: createViteBuild(__APP__, vitePluginsData),
    plugins: await createVitePlugins(vitePluginsData),
    server: createViteServer(vitePluginsData),
    resolve: { alias, dedupe: ['vue'] },
    // 自动引入scss/less全局文件
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@import '/@/assets/style/global/config.scss' ;`,
        },
        // less: {
        //   javascriptEnabled: true,
        //   additionalData: `@import (reference) "${resolve(__dirname, 'src/style/global/config.less')}";`,
        // },
      },
    },
    optimizeDeps: {},
  }
})
