/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 15:12:30
 * @Descripttion:
 */
import { ServerOptions } from 'vite'

export function createViteServer(options: viteUserOptions) {
  const Options: ServerOptions = {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: options.envs.VITE_APP_API_URL, // 你的云服务URL
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  }
  return Options
}
