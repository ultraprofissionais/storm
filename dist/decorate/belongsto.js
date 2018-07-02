"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var norm_service_1 = require("../norm-service");
function belongsTo(fkcolumn) {
    function actualDecorator(model, property) {
        // console.log('TARGET: ', tablename);
        // console.log('PROPERTY: ', property);
        // console.log('FKCOLUMN: ', fkcolumn);
        norm_service_1.setFkColumnTable(model.constructor.name.toLowerCase(), fkcolumn);
    }
    return actualDecorator;
}
exports.belongsTo = belongsTo;
