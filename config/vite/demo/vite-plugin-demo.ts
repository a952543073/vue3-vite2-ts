/**
 * 学习用，不想研究vite插件，就删了吧
 */
import { IncomingMessage, ServerResponse } from 'http';
import { Plugin } from 'vite';


interface Options {
    logger?: boolean;
}

interface RespThisType {
    req: IncomingMessage;
    res: ServerResponse;
    parseJson: () => any;
}

const root = process.cwd();

export default function demo(opt?: Options): Plugin {
    // const configureServer = [
    //     async ({ app }) => {
    //         app.use(async (ctx, next) => {
    //             if (ctx.path.startsWith('/@modules/vue-auto-routes')) {
    //                 ctx.type = 'js'
    //                 ctx.body = moduleContent
    //             } else {
    //                 await next()
    //             }
    //         })
    //     },
    // ]
    
    return { 
        name: 'vite-plugin-demo',
        buildStart() {
            console.log("auto install ...");
        },
        buildEnd(_this) {
            console.log("auto end ...");
        },
        async resolveId(id, importer) {
            // entry module ignore.
            if (!importer) return id;
            //....
            return id;
        },
        configureServer: async ({middlewares}) => {
            async function requestMiddleware(opt?: Options) {
                const middleware = async (req: IncomingMessage, res: ServerResponse, next: any) => {
                    console.log('载入的文件', req.url, res.statusCode);
                    next();
                }
                return middleware;
            }
            
            const middleware = await requestMiddleware(opt);
            middlewares.use(middleware);
        },
    }
}