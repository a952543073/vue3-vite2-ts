/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-28 10:04:22
 * @Descripttion: vue模块自动化按需引入
 */
/**
 * ---------------------------------------
 * vue模块自动化按需引入
 * =======================================
 * 支持以下模块自动引用，无需使用 import * from ***
 * NaiveUi(比较适合前台网站)、ElementPlus(中位)、AntDesign(比较适合后台网站)、pinia、vue、vue-i18n、vue-router
 * 当然，你习惯手工引用也是可以的，并且开发界面项目建议使用 NaiveUi 框架，真心不错 (当前项目使用的AntDesign)
 * ---------------------------------------
 */
import { Plugin } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  // ArcoResolver,
  NaiveUiResolver,
  AntDesignVueResolver,
  // ElementPlusResolver,
  VueUseComponentsResolver,
} from 'unplugin-vue-components/resolvers'

export function configUnpluginPlugin(envs?: ViteEnv, isBuild?: boolean): Plugin | Plugin[] {
  return [
    // 组件自动按需引入
    Components({
      extensions: ['vue', 'md', 'tsx'],
      include: [/\.vue$/, /\.md$/, /\.tsx$/],
      dts: resolve(process.cwd(), './config/types/components.d.ts'),
      resolvers: [
        AntDesignVueResolver(),
        // ArcoResolver(),
        NaiveUiResolver(),
        // ElementPlusResolver(),
        VueUseComponentsResolver(),
      ],
    }),
    // import自动引入
    AutoImport({
      dts: resolve(process.cwd(), './config/types/auto-imports.d.ts'),
      imports: ['vue', 'pinia', 'vue-i18n', 'vue-router'],
      resolvers: [
        NaiveUiResolver(),
        //ElementPlusResolver(),
        AntDesignVueResolver(),
        VueUseComponentsResolver(),
      ],
    }),
  ]
}
