/*
 * @Author: ShiJunJie
 * @Date: 2022-02-22 14:27:04
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 16:48:00
 * @Descripttion:
 */
import { resolve } from 'path'
import { BuildOptions } from 'vite'

export function createViteBuild(app: AppEnv, isBuild: boolean) {
  //整个打包项目配置
  let buildAPP: BuildOptions = {
    target: 'chrome85',
    sourcemap: isBuild && app.env.VITE_NODE_ENV == 'dev',
    //chunk 大小警告的限制 https://cn.vitejs.dev/config/#build-chunksizewarninglimit
    brotliSize: false,
    chunkSizeWarningLimit: 800,
    // 禁用 gzip 压缩大小报告, 提高大型项目的构建性能
    reportCompressedSize: false,
    // 发布时删除全部 console 打印 https://github.com/terser/terser#minify-options
    minify: 'terser',
    terserOptions: {
      //https://terser.org/docs/api-reference#minify-options
      compress: {
        keep_infinity: true,
        drop_console: isBuild,
        drop_debugger: isBuild,
        pure_funcs: ['console.*'],
      },
    },
    rollupOptions: {
      // 二，主动宰割包名输入 chunkSizeWarningLimit 配置大小
      output: {
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: `assets/js/entry.${app.pkg.version}-[hash].js`,
        assetFileNames: `assets/resource/[name]-[hash].[ext]`,
        //@ts-ignore
        manualChunks(id: any) {
          if (id.includes('node_modules') || id.includes('plugin-vue:export-helper')) {
            if (id.includes('jquery')) {
              return 'jquery'
            }
            return 'vendor'
          }
        },
      },
    },
  }

  if (process.env.npm_lifecycle_event == 'comp:dev' || process.env.npm_lifecycle_event == 'comp:pro') {
    //打包独立模块配置示例(供远程调用)
    buildAPP = {
      minify: app.env.VITE_NODE_ENV == 'pro', //是否压缩
      cssCodeSplit: true, // 将组件的 style 打包到 js 文件中
      outDir: './src/assets/js/async-component',
      lib: {
        formats: ['umd'],
        entry: resolve(process.cwd(), './modules/index.js'),
        name: '[name]',
        fileName: (format: any) => `index.${app.pkg.version}.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        // input: {
        //   'a/index': './modules/index.js'
        // },
        output: {
          // entryFileNames: 'async-[name].js',
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    }
  }

  return buildAPP
}
