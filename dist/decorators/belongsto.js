"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const torm_service_1 = require("../service/torm-service");
function belongsTo(fkcolumn) {
    function actualDecorator(model, property) {
        torm_service_1.setFkColumnTable(model.constructor.name.toLowerCase(), fkcolumn);
    }
    return actualDecorator;
}
exports.belongsTo = belongsTo;
//# sourceMappingURL=belongsto.js.map