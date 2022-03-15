/*
 * @Author: ShiJunJie
 * @Date: 2022-03-15 10:03:31
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 10:03:31
 * @Descripttion: 
 */
import pkg from '../../../package.json'

export default (options?: viteUserOptions) => {
  const { dependencies, devDependencies, name, version } = pkg;

  // 项目全局变量
  const __APP__: AppEnv = {
    pkg: { name, version, dependencies, devDependencies },
    envs: options.envs, version,
    lastBuildTime: (new Date()).toUTCString(),
  };

  return { __APP__: JSON.stringify(__APP__) }
}
