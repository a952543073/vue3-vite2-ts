/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-02 15:09:08
 * @Descripttion:
 */
declare interface ViteEnv {
  EVENT: string
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_APP_NAME: string
  VITE_APP_TITLE: string
  VITE_APP_DESC: string
  VITE_NODE_ENV: string
  VITE_APP_API_URL: string
  VITE_APP_BASE_URL: string
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
}

declare interface viteUserOptions {
  envs: ViteEnv
  isBuild: boolean
  command: 'build' | 'serve'
  mode: string
}
