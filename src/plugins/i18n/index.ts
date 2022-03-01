import { App } from 'vue'
import { createI18n } from 'vue-i18n'

let langMessages = {};
const messages = Object.fromEntries(
	Object.entries(
		import.meta.globEager('../../langs/*.{json,y(a)?ml}')
	).map(([key, value]) => {
		const filseName = key.replace(/(.*\/)*([^.]+).*/ig,"$2")
		const result = Object.assign(langMessages[filseName]||{}, value.default);
		langMessages[filseName] = result;
		return [filseName, result]
	})
)

console.log('默认语言集', messages);

langMessages = {};
const defaultLocale = localStorage.getItem('app-locale') || 'zh-CN';

export interface LangType {
    label: String;// 语种名称
    value: string;// 语种文件名
}[];

export const LangList: LangType[] = [
    { label: '中文', value: 'zh-CN' },
    { label: 'English', value: 'en' },
];

export default (app: App) => {
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
