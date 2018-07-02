"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const torm_service_1 = require("../service/torm-service");
function Column(model, target) {
    torm_service_1.setColumnTable(model.constructor.name.toLowerCase(), target);
    return this;
}
exports.Column = Column;
//# sourceMappingURL=column.js.map