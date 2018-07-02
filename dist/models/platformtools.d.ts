/// <reference types="node" />
export { ReadStream } from 'fs';
export { EventEmitter } from 'events';
export { Readable, Writable } from 'stream';
export declare class PlatformTools {
    static type: 'browser' | 'node';
    static getGlobalVariable(): any;
    static load(name: string): any;
    static pathNormalize(pathStr: string): string;
    static pathExtname(pathStr: string): string;
    static pathResolve(pathStr: string): string;
    static fileExist(pathStr: string): boolean;
    static readFileSync(filename: string): Buffer;
    static appendFileSync(filename: string, data: any): void;
    static writeFile(path: string, data: any): Promise<void>;
    static getEnvVariable(name: string): any;
    static logInfo(prefix: string, info: any): void;
    static logError(prefix: string, error: any): void;
    static logWarn(prefix: string, warning: any): void;
    static log(message: string): void;
    static warn(message: string): any;
}
