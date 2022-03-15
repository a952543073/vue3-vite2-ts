/*
 * @Author: ShiJunJie
 * @Date: 2022-03-15 10:04:15
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 12:01:20
 * @Descripttion: 
 */
import vue from '@vitejs/plugin-vue'

export default (options?: viteUserOptions) => {
  // 官方VUE模板解析器增加支持md文件解析
  const plugins = vue({
    include: [/\.vue$/, /\.md$/],
    script: {
      refSugar: true,
      refTransform: true,
    },
  })

  return { plugins }
}
