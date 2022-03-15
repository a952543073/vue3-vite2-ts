/**
 * ==================================================================
 * 配置项目所用到的vite插件，注意：修改此文件或子目录文件后，需要重启vite
 * ------------------------------------------------------------------
 * 小提醒：对项目根目录下的vite.config.ts文件进行保存一下即可触发vite重启
 * ------------------------------------------------------------------
 */

import type { Plugin } from 'vite'
import fs from "fs"
import path from "path"
import viteCompression from 'vite-plugin-compression'

// vite plugin
export default async (options?: viteUserOptions): Promise<Plugin[]> => {
    var vite = require('vite');
    const currentDirPath = path.resolve(__dirname, 'components');
    const plugins:Plugin[] = await Promise.all(fs.readdirSync(currentDirPath).map(async (fname) => {
        const filePath = path.join(currentDirPath, fname);
        const jsconfigFile = path.resolve(filePath, 'index.ts');
        if (fs.existsSync(jsconfigFile)) {
            const loadResult = await vite.loadConfigFromFile(options, jsconfigFile);
            if(loadResult.config.plugins){
                return loadResult.config.plugins
            }
        }
    }));

    // [生产环境资源压缩，结合nginx gzip部署丝滑无比](https://github.com/alloc/vite-plugin-compress)
    (options.isBuild && options.mode == 'production') && plugins.push(viteCompression())

    return plugins;
}