/*
 * @Author: ShiJunJie
 * @Date: 2022-03-15 10:04:15
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 12:24:28
 * @Descripttion: 
 */
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default (options?: viteUserOptions) => {
  const plugins = [
    // [文件路由](https://github.com/hannoeru/vite-plugin-pages/)
    Pages({
      pagesDir: [{ dir: 'src/views', baseRoute: 'BasicLayout' }, { dir: 'src/extends/**/views', baseRoute: 'extends' }],
      extensions: ['vue', 'md', 'tsx'],
      exclude: ['**/components/*'],
      nuxtStyle: true
    }),

    // [布局系统](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
    Layouts({
      layoutsDirs: 'src/layouts', //默认布局文件目录位置
      defaultLayout: 'LoginLayout' //默认布局，新增布局文件要重启vite
    })
  ]
  return { plugins }
}
