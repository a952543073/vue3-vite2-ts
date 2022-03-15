/*
 * @Author: ShiJunJie
 * @Date: 2022-02-23 15:49:57
 * @LastEditors: ShiJunJie
 * @LastEditTime: 2022-03-15 09:59:01
 * @Descripttion: 
 */
/**
 * 不要在该声明文件中使用 import { **** } from 'xxxx' 语法
 * 应使用 typeof import('xxxx')['****'] 来引入TS声明
 */

// 声明新的全局变量
declare const define: any;
declare const requirejs: any;
declare const $: jQuery;
declare const __APP__: AppEnv;

// 声明新的window全局变量
declare interface Window {
  $?: jQuery;
  __APP__: AppEnv;
  // 更多window全局变量声明
  //...
}
