/*
 * @Author: ShiJunJie
 * @Date: 2022-02-22 14:27:04
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 10:02:55
 * @Descripttion:
 */import { resolve } from 'path';
import type { BuildOptions } from 'vite'
import type { PreRenderedAsset } from 'rollup'
import pkg from '../../../package.json'

export default (options?: viteUserOptions) => {
  const { version } = pkg;

  //打包整个项目配置
  let buildAPP: BuildOptions = {
    target: 'chrome85',
    sourcemap: options.isBuild && options.mode == 'development',
    brotliSize: false,
    // 打包文件大小警告的限制 https://cn.vitejs.dev/config/#build-chunksizewarninglimit    
    chunkSizeWarningLimit: 800,
    // 禁用 gzip 压缩大小报告, 提高大型项目的构建性能
    reportCompressedSize: false,
    // development模式打包使用esbuild
    minify: 'esbuild',
    rollupOptions: {
      output: {
        chunkFileNames: `assets/js/[name]-[hash].js`,
        entryFileNames: `assets/js/main-[hash].${version}.js`,
        assetFileNames: (chunkInfo: PreRenderedAsset) => {
          if ((chunkInfo.name).includes('.css')) {
            return `assets/css/[name]-[hash].[ext]`
          }
          return `assets/res/[name]-[hash].[ext]`
        }
      },
    },
  };

  // production模式打包发布生产版本时删除全部 console 打印
  // https://esbuild.github.io/api/#ignore-annotations
  // https://terser.org/docs/api-reference#minify-options  
  if (options.isBuild && options.mode == 'production') {
    buildAPP.minify = 'terser';
    buildAPP.terserOptions = {
      compress: {
        keep_infinity: true,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.*']
      },
    }
  }

  //打包独立模块配置示例(供远程调用，实验性阶段)
  if (process.env.npm_lifecycle_event == 'comp:dev' || process.env.npm_lifecycle_event == 'comp:pro') {
    buildAPP = {
      minify: options.mode == 'production', //是否压缩
      cssCodeSplit: true, // 将组件的 style 打包到 js 文件中
      outDir: './src/assets/js/async-components',
      lib: {
        formats: ['umd'],
        entry: resolve(process.cwd(), './async-components/index.js'),
        name: '[name]',
        fileName: (format: any) => `index.${version}.${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          }
        }
      }
    };
  }

  return buildAPP;
}
