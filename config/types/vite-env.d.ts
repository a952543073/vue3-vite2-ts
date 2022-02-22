declare interface ViteEnv {
    EVENT: string;
    VITE_PORT: number;
    VITE_USE_MOCK: boolean;
    VITE_APP_NAME: string;
    VITE_APP_TITLE: string;
    VITE_APP_DESC: string;
    VITE_NODE_ENV: string;
    VITE_APP_API_URL: string;
    VITE_APP_BASE_URL: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
}

