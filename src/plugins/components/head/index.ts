/**
 * Document head manager for Vue 3.
 * see https://github.com/vueuse/head
 */
import type { App } from 'vue'
import { createHead } from '@vueuse/head'

export default (app: App) => app.use(createHead())
