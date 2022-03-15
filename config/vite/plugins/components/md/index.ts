import type { Plugin } from 'vite'
import Markdown from 'vite-plugin-md'

// [实现Markdown用作Vue组件](https://github.com/lymanlai/vite-plugin-md)
export default (options?:viteUserOptions) => {
    return { 
        plugins: Markdown({
            markdownItSetup(md) {
                // 更多markdown-it插件 see https://www.npmjs.com/search?q=keywords:markdown-it-plugin
                //.....
    
                /* 使用highlightjs插件突出显示代码块, 带有自动识别代码类型 */
                // md.use(require('markdown-it-highlightjs'))
    
                /* 使用prism插件突出显示代码块, 高亮粒度比highlightjs很细，但需要标识代码类型 */
                md.use(require('markdown-it-prism'), {defaultLanguageForUnknown: 'js',defaultLanguageForUnspecified: 'js'})
            },
            frontmatter: true, // 使用标题配置
            headEnabled: true, // 结合useHead自动配置页面标题信息
            wrapperClasses: "markdown-body",// md模板外层包裹样式
            wrapperComponent: 'markdown-code-box',//重新封装组件实现代码行号与代码复制
        })
    };
}