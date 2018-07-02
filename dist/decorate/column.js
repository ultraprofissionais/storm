"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var norm_service_1 = require("../norm-service");
function Column(model, target) {
    norm_service_1.setColumnTable(model.constructor.name.toLowerCase(), target);
    return this;
}
exports.Column = Column;
