"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tableoptions_1 = require("../models/tableoptions");
var norm_service_1 = require("../norm-service");
function Entity(entity, tableoptions) {
    console.log('TableInheritance 1: ', entity);
    if (!tableoptions) {
        tableoptions = new tableoptions_1.TableOptions();
    }
    if (!tableoptions.table) {
        tableoptions.table = entity.name.toLowerCase();
    }
    norm_service_1.setNormTable(tableoptions.table);
    if (tableoptions.fkcolumn !== undefined) {
        if (!tableoptions.pkcolumn) {
            tableoptions.pkcolumn = tableoptions.fkcolumn;
        }
        norm_service_1.setColumnTable(tableoptions.table, tableoptions.pkcolumn);
    }
    function newConstructor() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        new entity(args);
    }
    newConstructor.prototype = entity.prototype;
    newConstructor.prototype.getSql = function () {
        // 'inner join fktable on fktable.fkcolumn=table.fkcolumn'
        return " inner join " + tableoptions.fktable + " on " + tableoptions.fktable + "." + tableoptions.fkcolumn + "=" + tableoptions.table + "." + tableoptions.fkcolumn + " ";
    };
    Object.defineProperty(newConstructor.prototype, 'save', {
        value: function () {
            console.log('Entity OBJ: ', this);
            norm_service_1.insertSqlQuery(tableoptions.table);
            norm_service_1.valueSqlQuery(this);
            return true;
        },
    });
    /*
    newConstructor.prototype.save = (bean: any): boolean => {
        console.log('Entity OBJ 1: ', bean.get() );
        console.log('Entity OBJ 2: ', this );
        console.log('Entity OBJ 3: ', newConstructor);
        insertSqlQuery(tableoptions.table);
        valueSqlQuery(bean);
        return true;
    };
    */
    newConstructor.prototype.delete = function () {
        return true;
    };
    console.log('TableInheritance 2: ', newConstructor.prototype);
    return newConstructor;
}
exports.Entity = Entity;
