import { ServerOptions } from 'vite'

export function createViteServer(envs: ViteEnv, isBuild: boolean){
    const Options: ServerOptions = {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: envs.VITE_APP_API_URL, // 你的云服务URL
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, ''),
            },
        }
    };
    return Options;
}
