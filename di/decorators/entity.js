"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableoptions_1 = require("../models/tableoptions");
const torm_service_1 = require("../service/torm-service");
function Entity(entity, tableoptions) {
    console.log('TableInheritance 1: ', entity);
    if (!tableoptions) {
        tableoptions = new tableoptions_1.TableOptions();
    }
    if (!tableoptions.table) {
        tableoptions.table = entity.name.toLowerCase();
    }
    torm_service_1.setTormTable(tableoptions.table);
    if (tableoptions.fkcolumn !== undefined) {
        if (!tableoptions.pkcolumn) {
            tableoptions.pkcolumn = tableoptions.fkcolumn;
        }
        torm_service_1.setColumnTable(tableoptions.table, tableoptions.pkcolumn);
    }
    function newConstructor(...args) {
        new entity(args);
    }
    newConstructor.prototype = entity.prototype;
    newConstructor.prototype.getSql = () => {
        return ` inner join ${tableoptions.fktable} on ${tableoptions.fktable}.${tableoptions.fkcolumn}=${tableoptions.table}.${tableoptions.fkcolumn} `;
    };
    Object.defineProperty(newConstructor.prototype, 'save', {
        value: function () {
            console.log('Entity OBJ: ', this);
            torm_service_1.insertSqlQuery(tableoptions.table);
            torm_service_1.valueSqlQuery(this);
            return true;
        },
    });
    newConstructor.prototype.delete = () => {
        return true;
    };
    console.log('TableInheritance 2: ', newConstructor.prototype);
    return newConstructor;
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map