/**
 * 不要在该声明文件中使用 import { **** } from 'xxxx' 语法
 * 应使用 typeof import('xxxx')['****'] 来引入TS声明
 */

// 声明新的全局变量
declare var define: any;
declare var requirejs: any;
declare const __APP__: AppEnv;

// 声明新的window全局变量
declare interface Window {
  __APP__: AppEnv;
  // 更多window全局变量声明...
}