declare interface AppEnv {
    pkg: {
        name: string;
        version: string;
        dependencies: Recordable<string>;
        devDependencies: Recordable<string>;
    };
    env: ViteEnv;
    lastBuildTime: string;
}