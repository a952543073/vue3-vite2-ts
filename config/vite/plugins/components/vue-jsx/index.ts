import vueJsx from '@vitejs/plugin-vue-jsx'

export default (options?: viteUserOptions) => {
    // [Jsx支持](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)
    const plugins = vueJsx()

    return { plugins }
}