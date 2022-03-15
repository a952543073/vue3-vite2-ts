/*
 * @Author: ShiJunJie
 * @Date: 2022-03-01 09:41:47
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 11:18:48
 * @Descripttion:
 */
/**
 * =================================================
 * Vue 自动引入第三方组件形式的插件装载进项目
 * -------------------------------------------------
 * 每一个插件 app.use 方法封装在本文件同根下的各子目录内
 * =================================================
 */
import type { App } from "vue";

export default async (app: App, callbackfn: () => void) => {
  // 批量装载VUE项目所需组件插件, 即 app.use('xxx') 的东西，每个子目录为一个依赖
  const pluginList = import.meta.globEager("./components/*/index.ts");
  await Promise.all(
    Object.values(pluginList).map(async (module) => {
      if (typeof module.default === "function") {
        await module.default(app);
      }
    })
  ); //esbuild打包编译时移除

  /* @__PURE__ */ console.log("[vite] vue plugins done");

  // 自动装载完成所有插件后再实例化到DOM
  callbackfn.call(null);
};
