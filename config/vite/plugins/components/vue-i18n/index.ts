import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'

// [实现i18n国际化支持SFC](https://github.com/intlify/vite-plugin-vue-i18n)
export default (options?:viteUserOptions) => {
    return {
        plugins: vueI18n({
            runtimeOnly: true,
            compositionOnly: true,
            include: [resolve(process.cwd(), './**/langs/**')]
        })
    }
}