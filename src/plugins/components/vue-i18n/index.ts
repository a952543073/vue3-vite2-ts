/**
 * ==========================================================
 * 使用 yml 文件格式时要用到 @intlify/vite-plugin-vue-i18n 插件
 * ----------------------------------------------------
 * 注意 @intlify/vite-plugin-vue-i18n 版本的选择
 * 3.3.0 版本浏览器会报 client.mjs.map 找不到提示
 * 推荐 @intlify/vite-plugin-vue-i18n 2.5.0 版本
 * ----------------------------------------------------
 */

import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

export interface LangType {
	label: String;// 语种名称
	value: string;// 语种文件名
}[];

export const LangList: LangType[] = [
	{ label: '中文', value: 'zh-CN' },
	{ label: 'English', value: 'en' },
];

export default (app: App) => {
	let langMessages = {};
	// 用fromEntries将entries出来的[键值对数组列表]转为[对象]	
	const messages = Object.fromEntries(
		Object.entries(
			// 支持 json, yml 文件格式，优先使用 yml 文件的语言配置			
			import.meta.globEager('../../../langs/*.{json(5)?,y(a)?ml}')
		).map(([key, value]) => {
			const filseName = key.replace(/(.*\/)*([^.]+).*/ig, "$2")
			//@ts-ignore
			const result = Object.assign(langMessages[filseName] || {}, value.default);
			//@ts-ignore
			langMessages[filseName] = result;
			return [filseName, result]
		})
	)
	langMessages = {};

	/* @__PURE__ */
	console.log('项目语言包', messages);

	const defaultLocale = localStorage.getItem('app-locale') || 'zh-CN';

	const i18n = createI18n({
		legacy: false, // 关闭 Composition API 模式
		globalInjection: true, // 全局注册 $t 方法
		useI18nComponentName: true, // 翻译组件使用元素标签名称
		fallbackWarn: false,//不显示 Fall back 警告
		missingWarn: false,//不显示 Not found 警告
		locale: defaultLocale,
		fallbackLocale: ['en'],//默认中文语言
		messages
	})

	app.use(i18n)
}
