import type Options from 'unplugin-auto-import/types'

// [VueUse函数库](https://vueuse.org/functions.html)
const vueUseImports: Options.ImportsMap = {
    '@vueuse/core': [
        // 可在这里定义vueuse常用的方法
        'useMouse',     //声明后不用 import { useMouse } from '@vueuse/core' 导入,
        'useDark',      //[黑暗模式](https://vueuse.org/core/useDark/)
        'useToggle',    //[布尔值速切换器](https://vueuse.org/shared/useToggle/)

        // 可在这里定义vueuse别名
        ['useFetch', 'useMyFetch'] //声明后不用 import { useFetch as useMyFetch } from '@vueuse/core' 导入,
    ]
}

export default vueUseImports