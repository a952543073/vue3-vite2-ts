/*
 * @Author: ShiJunJie
 * @Date: 2022-03-15 10:04:15
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 10:06:49
 * @Descripttion: 
 */
/**
 * -------------------------------------------------------------------------
 * vue模块自动化按需引入，源码来源 https://github.com/antfu
 * =========================================================================
 * 支持以下模块自动引用，无需使用 import * from ***
 * NaiveUi、AntDesign、ElementPlus、pinia、vue-composition-api、vue-i18n、vue-router、@vueuse/core等...
 * 当然，你习惯手工引用也是可以的，并且开发界面项目建议使用 NaiveUi 框架，真心不错
 * -------------------------------------------------------------------------
 */
import type { Plugin, UserConfig } from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ArcoResolver,
  NaiveUiResolver,
  AntDesignVueResolver,
  ElementPlusResolver,
  VueUseComponentsResolver
} from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import vueUseImports from './vueuse-core'
import PkgConfig from 'vite-plugin-package-config'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import IconsResolver from 'unplugin-icons/resolver'

export default (options?: viteUserOptions) => {
  const plugins = [
    // 从 package.json 文件内读取vite预构建依赖清单，自动实现 optimizeDeps: { include: [] } 配置
    // see https://www.npmjs.com/package/vite-plugin-package-config
    PkgConfig(),
    // 强制预构建依赖，加快启动速度，防止修改 vite.config.ts 配置重启时自动化获取所需依赖缓慢而导致出错
    // see https://www.npmjs.com/package/vite-plugin-optimize-persist
    OptimizationPersist(),

    // [import自动引入](https://www.npmjs.com/package/unplugin-auto-import)
    AutoImport({
      dts: resolve(process.cwd(), './config/types/auto-imports.d.ts'),
      imports: [
        'vue',
        'pinia',
        'vue-i18n',
        'vue-router',
        vueUseImports
      ],
      resolvers: [
        NaiveUiResolver(),
        ElementPlusResolver(),
        AntDesignVueResolver(),
        VueUseComponentsResolver()
      ]
    }),

    // [组件自动按需引入](https://www.npmjs.com/package/unplugin-vue-components)
    Components({
      extensions: ['vue', 'md', 'tsx'],
      include: [/\.vue$/, /\.md$/, /\.tsx$/],
      dts: resolve(process.cwd(), './config/types/components.d.ts'),
      resolvers: [
        IconsResolver({
          customCollections: ['svg'],
          componentPrefix: 'icon',// 图标标签别名前缀
        }),

        // ArcoResolver(),
        NaiveUiResolver(),
        ElementPlusResolver(),
        AntDesignVueResolver(),
        VueUseComponentsResolver()
      ]
    }),

    // [CSS 按需自动生成](https://cn.windicss.org/guide/)
    WindiCSS()
  ]

  return { plugins }
}
