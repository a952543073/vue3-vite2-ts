/*
 * @Author: ShiJunJie
 * @Date: 2022-02-22 14:26:17
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 11:15:59
 * @Descripttion:
 */
import type { Plugin } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { viteMockServe } from 'vite-plugin-mock'
import { configUnpluginPlugin } from './plugins/unplugin'
import { configHtmlPlugin } from './plugins/html'
import Prism from 'markdown-it-prism'
import Markdown from 'vite-plugin-md'
import viteSvgIcons from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'

//// 想写一个自动引入vite插件器，但失败了 -_-!
// import { imports } from "./demo/auto-plugin"

//// 学习写一个vite插件 (^-^)
// import demo from "./demo/vite-plugin-demo"

// vite build && vite server
import { createViteBuild } from './build'
import { createViteServer } from './server'
export { createViteBuild, createViteServer }

export function createVitePlugins(envs: ViteEnv, isBuild: boolean) {
  const vitePlugins: (Plugin | Plugin[])[] = [
    // 官方VUE模板解析器增加支持md文件
    vue({
      include: [/\.vue$/, /\.md$/],
      script: {
        refSugar: true,
        refTransform: true,
      },
    }),

    //[使用本地Svg图标]https://github.com/alloc/vite-plugin-svg-icons
    viteSvgIcons({
      // 配置路劲在你的src里的svg存放文件
      iconDirs: [resolve(process.cwd(), 'src/assets/icons-svg')],
      symbolId: 'svg-[dir]-[name]',
      // symbolId: 'icon-[name]'
    }),

    // [Jsx支持](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),

    // [实现Markdown用作Vue组件](https://github.com/lymanlai/vite-plugin-md)
    Markdown({
      wrapperClasses: 'mdbox', // md模板外层包裹样式
      markdownItSetup(md) {
        md.use(Prism) // 使用prism突出显示代码块
      },
    }),

    // [文件路由](https://github.com/hannoeru/vite-plugin-pages/)
    Pages({
      pagesDir: [
        { dir: 'src/views', baseRoute: '' },
        { dir: 'src/features/**/views', baseRoute: 'features' },
      ],
      extensions: ['vue', 'md', 'tsx'],
      exclude: ['**/components/*'],
      nuxtStyle: true,
    }),

    // [布局系统](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
    // Layouts({
    //   layoutsDirs: 'src/layouts', //默认布局文件目录位置
    //   defaultLayout: 'default', //默认布局，新增布局文件要重启vite
    // }),

    // [实现i18n国际化支持SFC](https://github.com/intlify/vite-plugin-vue-i18n)
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve(process.cwd(), './src/langs/**')],
    }),

    // [mock服务](https://github.com/vbenjs/vite-plugin-mock)
    viteMockServe(),

    // [大牛antfu的自动化开发](https://github.com/antfu)
    configUnpluginPlugin(),
  ]

  //// 学习开发vite自定义插件
  // vitePlugins.push(demo());

  // 压缩与参数替换插件
  vitePlugins.push(configHtmlPlugin(envs, isBuild))

  // [生产环境资源压缩，结合nginx gzip部署丝滑无比](https://github.com/alloc/vite-plugin-compress)
  isBuild && vitePlugins.push(viteCompression())

  return vitePlugins
}
