/*
 * @Author: ShiJunJie
 * @Date: 2022-02-22 14:26:17
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:12:16
 * @Descripttion:
 */
// import viteSvgIcons from 'vite-plugin-svg-icons'
// viteSvgIcons({
//   // 配置路劲在你的src里的svg存放文件
//   iconDirs: [resolve(process.cwd(), 'src/assets/icons-svg')],
//   symbolId: 'svg-[dir]-[name]',
//   // symbolId: 'icon-[name]'
// }),

import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import createViteDefine from './define'
import createViteBuild from './build'
import createViteServer from './server'
import createVitePlugins from './plugins'
import { formatEnv } from './server/utils'

export async function bootstrapConfig(config: ConfigEnv): Promise<UserConfig> {
  const { command, mode } = config
  const isBuild = command === 'build'
  const envs = formatEnv(loadEnv(mode, `./config/`));
  const options: viteUserOptions = { envs, isBuild, command, mode }

  // vite 基础配置
  const viteConfig: UserConfig = {
    mode: envs.NODE_ENV == 'pro' ? 'production' : 'development',
    base: envs.VITE_APP_BASE_URL || '/',
    resolve: { dedupe: ['vue'] },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     charset: false
      //   }
      // }
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
    }
  }

  // 全局变量配置
  viteConfig.define = createViteDefine(options)

  // 打包配置
  viteConfig.build = createViteBuild(options)

  // 开发服务容器环境配置
  viteConfig.server = createViteServer(options)

  // 异步导入项目所需的所有vite插件配置
  viteConfig.plugins = await createVitePlugins(options)

  return viteConfig
}

export { bootstrapConfig as default };
