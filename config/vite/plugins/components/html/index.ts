/**
 * ---------------------------------------
 * html插件(变量替换、压缩) 
 * =======================================
 * nodejs <= 13.14 use => vite-plugin-html v2+ 
 * nodejs >= 14 use => vite-plugin-html v3+
 * ---------------------------------------
 */

import { minifyHtml, injectHtml } from 'vite-plugin-html' //v2+ 语法
// import { createHtmlPlugin } from 'vite-plugin-html' //v3+ 语法

export default (options?:viteUserOptions) => {
    const plugins =  [
        // 压缩html文档
        minifyHtml(),

        // 注入变量给html文档使用
        injectHtml({
            injectData: {
                appName: options.envs.VITE_APP_NAME,
                appTitle: options.envs.VITE_APP_TITLE,
                injectScript: `<script src="/assets/js/jquery.min.js"></script>`
            }
        }),

        // vite-plugin-html v3+ 用法
        // createHtmlPlugin({
        //     minify: true,
        //     inject: {
        //         data: {
        //             appName: options.envs.VITE_APP_NAME,
        //             appTitle: options.envs.VITE_APP_TITLE,
        //             injectScript: `<script src="/assets/js/jquery.min.js"></script>`,
        //         },
        //     },
        // }),
    ]
    
    return { plugins };
}