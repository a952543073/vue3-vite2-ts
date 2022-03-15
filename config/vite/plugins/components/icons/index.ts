import type { Plugin } from 'vite'
import { resolve } from 'path'
import http from 'http'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

function HttpRequest(options: http.RequestOptions, callback?: (text: string) => void) {
    let content: string = '';  //存放请求后的数据
    const req = http.request(options, function (res: http.IncomingMessage) {
        res.setEncoding('utf-8'); //设置响应字符集
        let resTimeout = setTimeout(() => {
            res.destroy(); //结束响应
            content = '';
            callback && callback(content);
        }, 10000);//10s后没有响应信息结束响应，并返回空数据
        res.on('data', function (chuck) { //响应返回数据，并追加内容
            if (chuck) content += chuck;
        }).on('end', function () { //数据返回完毕
            clearTimeout(resTimeout);
            callback && callback(content);
        });
    });
    req.on('error', function (e: Error) { //响应出错调用函数
        console.log('Request error: ', options.path, e.message);
        callback && callback('');
    });
    req.write(''); //发送请求
    req.end(); //结束请求
}

const collections = ["mdi", "mdi-light", "ic", "ph", "icon-park-outline", "icon-park", "uil", "bx", "ri", "la", "iconoir", "jam", "ion", "bi", "clarity", "carbon", "cil", "gg", "tabler", "teenyicons", "fa-solid", "fa-regular", "vaadin", "icomoon-free", "eva", "pixelarticons", "majesticons", "ci", "eos-icons", "dashicons", "entypo", "zondicons", "flat-color-icons", "octicon", "codicon", "ant-design", "lucide", "fe", "radix-icons", "line-md", "system-uicons", "akar-icons", "uiw", "uim", "uit", "uis", "gridicons", "mono-icons", "heroicons-outline", "heroicons-solid", "file-icons", "mi", "ps", "el", "foundation", "typcn", "subway", "raphael", "icons8", "wpf", "iwwa", "topcoat", "ei", "bytesize", "fluent", "grommet-icons", "pepicons", "maki", "oi", "et", "vscode-icons", "fontisto", "fa", "zmdi", "whh", "si-glyph", "ls", "simple-line-icons", "flat-ui", "vs", "websymbol", "il", "bpmn", "fontelico", "feather", "noto", "noto-v1", "twemoji", "openmoji", "emojione", "emojione-monotone", "emojione-v1", "fxemoji", "logos", "cib", "simple-icons", "fa-brands", "brandico", "entypo-social", "cryptocurrency", "gis", "map", "geo", "cif", "fad", "wi", "healthicons", "medical-icon", "ep"];
const NotFound = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--codicon" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.5 1a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13zm0 12a5.5 5.5 0 1 1 0-11a5.5 5.5 0 0 1 0 11zm1.55-8.42a1.84 1.84 0 0 0-.61-.42A2.25 2.25 0 0 0 7.53 4a2.16 2.16 0 0 0-.88.17c-.239.1-.45.254-.62.45a1.89 1.89 0 0 0-.38.62a3 3 0 0 0-.15.72h1.23a.84.84 0 0 1 .506-.741a.72.72 0 0 1 .304-.049a.86.86 0 0 1 .27 0a.64.64 0 0 1 .22.14a.6.6 0 0 1 .16.22a.73.73 0 0 1 .06.3c0 .173-.037.343-.11.5a2.4 2.4 0 0 1-.27.46l-.35.42c-.12.13-.24.27-.35.41a2.33 2.33 0 0 0-.27.45a1.18 1.18 0 0 0-.1.5v.66H8v-.49a.94.94 0 0 1 .11-.42a3.09 3.09 0 0 1 .28-.41l.36-.44a4.29 4.29 0 0 0 .36-.48a2.59 2.59 0 0 0 .28-.55a1.91 1.91 0 0 0 .11-.64a2.18 2.18 0 0 0-.1-.67a1.52 1.52 0 0 0-.35-.55zM6.8 9.83h1.17V11H6.8V9.83z" clip-rule="evenodd"></path></svg>'
export default (options?: viteUserOptions) => {
    const localPath = resolve(process.cwd(), './src/assets/icons/svg/');
    
    const plugins = [
        // see https://www.npmjs.com/package/unplugin-icons
        Icons({
            compiler: 'vue3', //plain SVG content for vue3
            iconSource: 'auto',//图标使用现代集还是历史集，默认自动
            autoInstall: false, //不存在的图标集是否允许自动安装到本地
            defaultClass: 'iconify',//svg标签默认样式
            customCollections: {
                // 自动获取本地和线上图标集
                'svg': async (iconName) => {
                    iconName = iconName.replace(/([a-z])(\d+)/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                    iconName = iconName.replace(':', '-');

                    // 本地图标，存放于 ./src/assets/icons/svg 目录下
                    const customs = FileSystemIconLoader(localPath);
                    const customIcon = await customs(iconName);
                    if (customIcon) return customIcon.replace(/^<svg /, '<svg fill="currentColor" ');

                    // 从线上获取
                    return await new Promise((resolve) => {
                        const collection = collections.find((i) => {
                            return iconName.startsWith(`${i}-`)
                        }) || collections.find((i) => {
                            return iconName.startsWith(i)
                        });

                        if (!collection) resolve(NotFound);

                        const icons = iconName.replace(collection + '-', '');

                        const fallBackAPISources = [
                            "https://api.simplesvg.com",
                            "https://api.unisvg.com",
                            "https://api.iconify.design"
                        ];
                        const apiUrl = fallBackAPISources[Math.floor(Math.random() * fallBackAPISources.length)];

                        // const iconUrl = `${apiUrl}/${collection}.json?icons=${icons}`;
                        const iconUrl = `${apiUrl}/${collection}:${icons}.svg`;

                        HttpRequest({
                            hostname: 'api.iconify.design',
                            port: 80,
                            path: iconUrl,
                            method: 'GET',
                            headers: { //请求头信息
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36'
                            }
                        }, (data) => {
                            if (data.startsWith("<svg ")) {
                                resolve(data.replace(/^<svg /, '<svg fill="currentColor" '))
                            } else {
                                console.log('Icon not found: ', iconUrl, data);
                                resolve(NotFound)
                            }
                        })
                    })
                }
            }
        })
    ]

    return { plugins }
}