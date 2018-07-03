"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
var fs_1 = require("fs");
exports.ReadStream = fs_1.ReadStream;
var events_1 = require("events");
exports.EventEmitter = events_1.EventEmitter;
var stream_1 = require("stream");
exports.Readable = stream_1.Readable;
exports.Writable = stream_1.Writable;
const chalk = require('chalk');
class PlatformTools {
    static getGlobalVariable() {
        return global;
    }
    static load(name) {
        try {
            switch (name) {
                case 'mongodb':
                    return require('mongodb');
                case 'mysql':
                    return require('mysql');
                case 'mysql2':
                    return require('mysql2');
                case 'oracledb':
                    return require('oracledb');
                case 'pg':
                    return require('pg');
                case 'pg-native':
                    return require('pg-native');
                case 'pg-query-stream':
                    return require('pg-query-stream');
                case 'redis':
                    return require('redis');
                case 'sqlite3':
                    return require('sqlite3');
                case 'mssql':
                    return require('mssql');
                case 'mkdirp':
                    return require('mkdirp');
                case 'path':
                    return require('path');
                case 'debug':
                    return require('debug');
                default:
                    return require(name);
            }
        }
        catch (err) {
            if (!path.isAbsolute(name) && name.substr(0, 2) !== './' && name.substr(0, 3) !== '../') {
                return require(path.resolve(process.cwd() + '/node_modules/' + name));
            }
            throw err;
        }
    }
    static pathNormalize(pathStr) {
        return path.normalize(pathStr);
    }
    static pathExtname(pathStr) {
        return path.extname(pathStr);
    }
    static pathResolve(pathStr) {
        return path.resolve(pathStr);
    }
    static fileExist(pathStr) {
        return fs.existsSync(pathStr);
    }
    static readFileSync(filename) {
        return fs.readFileSync(filename);
    }
    static appendFileSync(filename, data) {
        fs.appendFileSync(filename, data);
    }
    static writeFile(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, fail) => {
                fs.writeFile(path, data, (err) => {
                    if (err)
                        fail(err);
                    ok();
                });
            });
        });
    }
    static getEnvVariable(name) {
        return process.env[name];
    }
    static logInfo(prefix, info) {
        console.log(chalk.gray.underline(prefix), info);
    }
    static logError(prefix, error) {
        console.log(chalk.underline.red(prefix), error);
    }
    static logWarn(prefix, warning) {
        console.log(chalk.underline.yellow(prefix), warning);
    }
    static log(message) {
        console.log(chalk.underline(message));
    }
    static warn(message) {
        return chalk.yellow(message);
    }
}
PlatformTools.type = 'node';
exports.PlatformTools = PlatformTools;
//# sourceMappingURL=platformtools.js.map