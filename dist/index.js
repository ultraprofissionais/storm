"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platformtools_1 = require("./models/platformtools");
function getTormStorage() {
    const globalScope = platformtools_1.PlatformTools.getGlobalVariable();
    if (!globalScope.torm)
        globalScope.torm = [];
    return globalScope.torm;
}
exports.getTormStorage = getTormStorage;
//# sourceMappingURL=index.js.map