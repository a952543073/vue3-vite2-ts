/**
 * 尝试自动引入vite插件目录plugins下所有插件加载到vite配置中去，实际没有成功，删了吧
 * 还是老老实实有多少vite插件要配置，就一个一个手工在 config/vite/index.ts 中配置吧
 */
import fs from "fs"
import NativeModule from 'module'
import vm from 'vm'
import util from 'util'

// fs.readFile = util.promisify(fs.readFile)
// const bundle = fs.readFile('./bundle.js', {encoding: 'utf-8'}) //此时的bundle为String

function globEager(currentDirPath: string, callback: any) {
    var fs = require('fs'), path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name: string) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            globEager(filePath, callback);
        }
    });
}

// const vitePlugins = [];
// function importPages (r: { (arg0: string): any; keys: () => string[]; }) {
// 	r.keys().forEach((key: string) => {
// 		vitePlugins.push({ path: (key.split('.'))[1], component: ()=>r(key)})
// 	});
// }
// //@ts-ignore
// importPages(require.context('src/views', true, /\.vue$/,'lazy'))

// import { imports } from "./files"
// console.log(imports);


    // const dir = resolve(process.cwd(), './config/vite/plugins');
    // function importLocale(locale: string) {
    //     const im = import(/* @vite-ignore */`./plugins/${locale}`);
    //     var promise = new Promise(function(resolve, reject) {
    //         // 异步处理结束后、调用resolve 或 reject
    //         resolve("123")
    //     });
    //     return promise
    // }
    // const s = importLocale('html');
    // s.then(resp => {
    //     console.log(resp);
    // })
    

    // 压缩与参数替换插件
    // const htmlPlugins = import('./plugins/html')
    // htmlPlugins.then(resp => {
    //     vitePlugins.push(resp.configHtmlPlugin(envs, isBuild))
    // })

    // const dir = resolve(process.cwd(), './config/vite/plugins');
    // globEager(dir, function(filePath: string, stat: any) {
    // 	// const modules = {
    // 	// 	filePath: () => import(`./${filePath}`)
    // 	// }
    // 	// Object.values(modules).forEach(m => {
    // 	// 	console.dir(m());
    // 	// })

    //     filePath = filePath.replace(dir, '').replace(/\\/ig, '/')
    //     const filseName = filePath.replace(/(.*\/)*([^.]+).*/ig,"$2")
    //     const filse = './plugins/'+filseName

    //     console.log(filePath, filseName, filse);

    //     const modules = {
    // 		aa: () => import(`${filse}`)
    // 	}

    //     // console.log(modules.aa());

    //     // modules.aa().then(resp => {
    //     //     console.log(resp);
    //     // })
    // });

function parsePagesDirectory() {
    const files = fs.readdirSync('./config/vite/plugins').map((f) => ({ 
        name: f.split('.')[0], 
        importPath: `./plugins/${f.split('.')[0]}`
    }))
    
    const imports = files.map((f) => `import ${f.name} from '${f.importPath}'`)

    const m = { exports: {} }
    const filename = 'html.ts'
    const wrapper = NativeModule.wrap(`
    //var __importDefault = (this && this.__importDefault) || function (mod) {
    //    return (mod && mod.__esModule) ? mod : { "default": mod };
    //};
    //Object.defineProperty(exports, "__esModule", { value: true });
    //const html = __importDefault(require('./config/vite/plugins/html.ts'))
    `)
    const script = new vm.Script(wrapper, { 
		filename,
		displayErrors: true
	})
	const result = script.runInThisContext() // 此处可以指定代码的执行环境，此api在nodejs文档中有介绍
	//result.call(m.exports, m.exports, require, m) // 执行wrapper函数，此处传入require就解决了第一种方法不能require的问题
   
    console.log(result, m);

    return { imports }
}

const { imports } = parsePagesDirectory()

// console.log(imports);

export { imports };

