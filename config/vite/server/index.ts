/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 10:07:19
 * @Descripttion:
 */
import type { ServerOptions } from 'vite'

export default (options?: viteUserOptions) => {
  const server: ServerOptions = {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: options.envs.VITE_APP_API_URL, // 你的云服务URL
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    }
  };

  if (options.envs.VITE_HTTP_PORT) {
    server.port = options.envs.VITE_HTTP_PORT
  }

  return server;
}
