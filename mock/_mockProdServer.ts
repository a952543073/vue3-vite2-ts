//  mockProdServer.ts 生产环境使用演示数据
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

// 逐一导入您的mock目录下文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 亦可以使用 import.meta.glob 功能来进行全部导入
//import userModule from './user'

// const mockModules: Array<string> = [];
// mockModules.push(...userModule);

// 批量加载
// const modules = import.meta.globEager('./mock/*.ts');
// Object.keys(modules).forEach((key) => {
//     if (key.includes('/_')) {
//         return;
//     }
//     mockModules.push(...modules[key].default);
// });

export function setupProdMockServer() {
    //createProdMockServer(...userModule);
}