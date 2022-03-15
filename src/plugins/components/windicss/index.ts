
/**
 * ================================================================================
 * [下一代工具类 CSS 框架](https://cn.windicss.org/)
 * --------------------------------------------------------------------------------
 * 自动构建CSS工具类框架 Windi CSS, 完美兼容 Tailwind CSS v2 风格代码
 * 更多UI模型：https://tailwindui.com/ or https://tailwindcomponents.com/
 * --------------------------------------------------------------------------------
 */

// see https://cn.windicss.org/integrations/vite.html#layers-ordering

/* 若使用 windi.css 将会按顺序导入全部三个层 base - components - utilities */
import 'virtual:windi.css'

/* 你还可以使自定义的 css 能够被某些层覆盖： */
// import 'virtual:windi-base.css' //基础样式类
// import 'virtual:windi-components.css' //组件样式类
// import '/@/assets/base.css' //这里可以导入自己的全局样式
// import 'virtual:windi-utilities.css' //按需生成工具类

/* 开发工具类，请谨慎使用它 */
// import 'virtual:windi-devtools'

export { }
