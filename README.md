<!--
 * @Author: ShiJunJie
 * @Date: 2021-10-19 10:48:02
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-02-23 15:53:17
 * @Descripttion:
-->

# Vue 3 + Typescript + Vite 2 + And Design Vue 3

vue3-vite2-ts-ant3 UI 脚手架

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 安装依赖

```
cnpm i
```

## 运行

```
npm run dev
```

## 打包

```
npm run build
```
