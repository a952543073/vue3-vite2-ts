/*
 * @Author: ShiJunJie
 * @Date: 2022-02-22 14:27:04
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 15:11:28
 * @Descripttion:
 */

/**
 * ---------------------------------------
 * html插件(变量替换、压缩)
 * =======================================
 * nodejs <= 13.14 use => vite-plugin-html v2+
 * nodejs >= 14 use => vite-plugin-html v3+
 * ---------------------------------------
 */
import { Plugin } from 'vite'
// https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md

// import { minifyHtml, injectHtml } from 'vite-plugin-html' //v2+ 语法
import { createHtmlPlugin } from 'vite-plugin-html' //v3+ 语法

export function configHtmlPlugin(options: viteUserOptions): Plugin | Plugin[] {
  //return [
  // minifyHtml(),
  // injectHtml({
  //     injectData: {
  //         appName: options.envs.VITE_APP_NAME,
  //         appTitle: options.envs.VITE_APP_TITLE,
  //         injectScript: `<script src="/assets/js/require.min.js"></script>`
  //     }
  // })
  //]
  return createHtmlPlugin({
    minify: true,
    inject: {
      data: {
        appName: options.envs.VITE_APP_NAME,
        appTitle: options.envs.VITE_APP_TITLE,
        injectScript: `<script src="./inject.js"></script>`,
      },
    },
  })
}
