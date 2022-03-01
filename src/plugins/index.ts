/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 09:41:47
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-01 11:03:08
 * @Descripttion:
 */
/**
 * =================================================
 * Vue 自动引入第三方组件形式的插件装载进项目
 * -------------------------------------------------
 * 每一个插件 app.use 方法封装在本文件同根下的各子目录内
 * =================================================
 */
import { App } from 'vue'

export default (app: App, callbackfn: () => void) => {
  async function bootstrap(value: { [key: string]: any }, index: number, array: { [key: string]: any }[]) {
    const run_modules_num = index + 1
    if (typeof value.default === 'function') {
      await value.default(app)
      if (run_modules_num === array.length) {
        callbackfn() //自动装载完成所有插件后再实例化DOM
      }
    }
  }

  Object.values(import.meta.globEager('./*/*.ts')).forEach(bootstrap)
}
