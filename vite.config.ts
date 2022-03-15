/*
 * @Author: ShiJunJie
 * @Date: 2021-08-03 14:25:29
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:32:44
 * @Descripttion:
 */
import type { Alias } from 'vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import bootstrapConfig from '/#/vite'
import { envToType } from '/#/vite/server/utils'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  //envToType()

  return await bootstrapConfig({ command, mode }).then((config) => {
    // 引用资源标识别名
    const alias: Alias[] = [
      {
        find: '/@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: /\/#\//,
        replacement: resolve(__dirname, 'config')
      }
    ]

    /**
     * ---------------------------------------------------------------------------------------
     * 解除开发环境警告: You are running the esm-bundler build of vue-i18n.
     * 安装 @intlify/vite-plugin-vue-i18n 插件(注意选用插件版本)并使用后，可以注释掉亦能解除该警告 
     * ---------------------------------------------------------------------------------------
     */
    //mode === 'development' && alias.push({ find: 'vue-i18n', replacement: 'vue-i18n/dist/vue-i18n.cjs.js' })

    config.resolve.alias = alias

    return config;
  })
})
