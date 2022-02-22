/*
 * @Author: ShiJunJie
 * @Date: 2020-11-03 14:11:08
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-22 17:48:27
 * @Descripttion: 全局组件自动注册
 * @Ps: 在该文件夹编写的组件会自动全局注册 确保该组件可以是最外层组件 且复用性高
 */

const requireComponent = import.meta.globEager('./**/*.vue')
const globalResult = Object.keys(requireComponent).filter((item) => true)

export default (globalComponents: { component: (arg0: any, arg1: any) => void }) => {
  globalResult.forEach((fileName) => {
    // 获取组件配置
    const componentConfig = requireComponent[fileName]
    const componentName =
      componentConfig.default.name ||
      componentConfig.name ||
      fileName.match(/\/[a-zA-Z]+\.vue/g)[0].replace(/(^\/?)|(\.vue?$)/g, '')
    // console.log(componentName, componentConfig)

    // 全局注册组件

    // 此处的name,是组件属性定义的name
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    globalComponents.component(componentName, componentConfig.default)
  })
}
