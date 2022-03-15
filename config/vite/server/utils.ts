import { readFileSync, existsSync, writeFileSync, lstatSync } from "fs"
import path from 'path';

declare type Recordable<T = any> = Record<string, T>;

function pathResolve(dir: string) {
    return path.resolve(process.cwd(), '.', dir);
}

function parse(envStr = '') {
    const keyValuePattern = /^\s*([\w.-]+)\s*=\s*("[^"]*"|'[^']*'|[^#]*)?(\s*|\s*#.*)?$/;

    // Covert to string when buffer & split by new line.
    return envStr.toString().split('\n').map(line => {
        const parsedLine = keyValuePattern.exec(line);
        // Ignore lines that do not match. When correctly parsed - len is always 4.
        if (parsedLine && parsedLine.length === 4) {
            const { 1: envKey = null, 2: envValue = '' } = parsedLine;
            if (envKey) {
                const isDoubleQuoted = envValue.startsWith('"') && envValue.endsWith('"');
                const isSingleQuoted = envValue.startsWith("'") && envValue.endsWith("'");
                // When single or double quoted, remove quotes
                const unquotedEnvValue = isDoubleQuoted || isSingleQuoted
                    ? envValue.slice(1, -1)
                    : envValue;

                return {
                    key: envKey,
                    value: unquotedEnvValue,
                    isEnvVar: true,
                };
            }
        }

        return {
            key: null,
            value: line.trim(),
            isEnvVar: false,
        };
    });
}

function writeEnvTypes(path: string, filteredEnvString: []) {
    const existingModuleDeclaration = existsSync(path) && readFileSync(path, { encoding: "utf-8" });

    const moduleDeclaration = `declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ${filteredEnvString.map(({ key }, i) => {
        if (!existingModuleDeclaration) {
            return `${i ? "      " : ""}${key}: string;`;
        }
        const existingPropertySignature = existingModuleDeclaration
            .split("\n")
            .find((line) => line.includes(`${key}:`));
        if (!existingPropertySignature) {
            return `${i ? "      " : ""}${key}: string;`;
        }
        return `${i ? "      " : ""}${existingPropertySignature.trim()}`;
    })
            .join("\n")}
      }
    }
    export {}`;
}

export function envToType() {
    const envPath = pathResolve('./config/.env')
    const envString = readFileSync(envPath, {
        encoding: "utf8",
    });

    const parsedEnvString = parse(envString);
    const filteredEnvString = parsedEnvString.filter((line: any) => line.isEnvVar);

    filteredEnvString.map(({ key, value }, i) => {
        let line = `${key}: ${toString.call(value).toString()};`;
        console.log(line);
    });
}

// Read all environment variable configuration files to process.env
export function formatEnv(envs: Recordable): ViteEnv {
    const ret: any = {};
    for (const envName of Object.keys(envs)) {
        let realName = envs[envName].replace(/\\n/g, '\n');
        realName = realName === 'true' ? true : realName === 'false' ? false : realName;

        if (envName === 'VITE_HTTP_PORT') {
            realName = Number(realName);
        }
        
        ret[envName] = realName;
        process.env[envName] = realName;
    }
    return ret;
}
