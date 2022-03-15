/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:29:57
 * @Descripttion:
 */
declare interface ViteEnv {
  readonly EVENT: string;
  readonly NODE_ENV: string;
  readonly VITE_HTTP_PORT: number;
  readonly VITE_HTTP_HASH: boolean;
  readonly VITE_APP_USE_I18N: boolean;
  readonly VITE_APP_USE_MOCK: boolean;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_DESC: string;
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_HTTP_ENV: string;
  readonly VITE_APP_ROUTES: string;
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
}

declare interface ImportMeta {
  readonly env: ViteEnv
}

declare interface viteUserOptions {
  readonly envs: ViteEnv,
  readonly isBuild: boolean,
  readonly command: "build" | "serve",
  readonly mode: string
}
