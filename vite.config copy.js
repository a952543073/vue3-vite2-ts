/*
 * @Author: ShiJunJie
 * @Date: 2021-08-03 14:25:29
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 18:24:00
 * @Descripttion:
 */
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig, Plugin, loadEnv } from 'vite'

import viteCompression from 'vite-plugin-compression'
import viteSvgIcons from 'vite-plugin-svg-icons'

// https://cn.vitejs.dev/config/
// vite.config.js # or vite.config.ts

// 生产环境判断

export default defineConfig(({ command, mode }) => {
  console.log(mode)
  const isEnvProduction = loadEnv(mode, process.cwd()).VITE_NODE_ENV === 'production'
  console.log(loadEnv(mode, process.cwd()), isEnvProduction)

  return {
    plugins: [
      vue({
        script: {
          refSugar: true,
          refTransform: true,
        },
      }),
      viteSvgIcons({
        // 配置路劲在你的src里的svg存放文件
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons-svg')],
        symbolId: 'svg-[dir]-[name]',
        // symbolId: 'icon-[name]'
      }),
      viteCompression({
        // Whether to output the compressed result in the console
        verbose: true,
        // Whether to disable
        disable: false,
        // It will be compressed if the volume is larger than threshold, the unit is b
        threshold: 1025,
        // Compression algorithm, optional ['gzip','brotliCompress' ,'deflate','deflateRaw']
        algorithm: 'gzip',
        ext: '.gz',
        // Whether to delete source files after compression
        deleteOriginFile: false,
      }),
    ],
    resolve: {
      alias: {
        // 键必须以斜线开始和结束
        '/@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import (reference) "${path.resolve(__dirname, 'src/style/global/config.less')}";`,
        },
      },
    },
    cacheDir: '.viteCacheDir',
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: isEnvProduction ? '/' : './',
    server: {
      host: '0.0.0.0',
      port: 3000,
      // 是否自动在浏览器打开
      open: false,
      // 是否开启 https
      https: false,
      // 服务端渲染
      ssr: false,
      // 反向代理，此处应该特别注意，网上很多教程是直接设置proxy，并没有向官网那样添加 server，可能会导致失败，vite官网：https://vitejs.dev/guide/features.html#async-chunk-loading-optimization
      proxy: {
        // "/mps": {
        // 	target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
        // 	changeOrigin: true,
        // 	rewrite: (path) => path /*.replace(/^(\/mps||\/cms)/, "")*/,
        // },
        '/cms': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path /*.replace(/^(\/mps||\/cms)/, "")*/,
        },
      },
    },
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    build: {
      target: 'chrome85',
      outDir: isEnvProduction ? 'dist' : 'test',
      assetsDir: './admin/assets',
      assetsInlineLimit: 2048,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
      // Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
      minify: isEnvProduction ? 'terser' : 'esbuild',
      terserOptions: {
        compress: {
          // 生产环境去除console
          drop_console: isEnvProduction,
        },
      },
    },
  }
})
