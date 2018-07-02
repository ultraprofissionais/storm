"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var table_metadata_1 = require("../metadatas/table-metadata");
function setNormTable(table) {
    var tablename = table.toLowerCase();
    // console.log('getNormTable 1: ', getNormStorage() );
    if (!index_1.getNormStorage()[tablename]) {
        index_1.getNormStorage()[tablename] = new table_metadata_1.TableMetadata(tablename);
    }
    // console.log('getNormTable 2: ', getNormStorage()[tablename] );
}
exports.setNormTable = setNormTable;
function setColumnTable(table, column) {
    var tablename = table.toLowerCase();
    setNormTable(tablename);
    index_1.getNormStorage()[tablename].columns.push(column);
}
exports.setColumnTable = setColumnTable;
function setFkColumnTable(table, column) {
    var tablename = table.toLowerCase();
    setNormTable(tablename);
    index_1.getNormStorage()[tablename].fkcolumns.push(column);
}
exports.setFkColumnTable = setFkColumnTable;
function insertSqlQuery(tablename) {
    var table = index_1.getNormStorage()[tablename.toLowerCase()];
    var columnSql = table.columns.join(', ');
    var valueSql = [];
    var indice = 1;
    // console.log('COLUMNS: ', table.columns );
    table.columns.forEach(function () {
        valueSql.push('$' + indice++);
    });
    // console.log('FK COLUMNS: ', table.fkcolumns );
    table.fkcolumns.forEach(function (element) {
        var fkcolumn = element.split('.');
        columnSql = columnSql + ", " + fkcolumn[1];
        valueSql.push('$' + indice++);
    });
    var insertSql = "INSERT INTO " + tablename.toLowerCase() + "(" + columnSql + ") VALUES (" + valueSql.join(', ') + ") RETURNING * ";
    console.log('insertSql: ', insertSql);
    return insertSql;
}
exports.insertSqlQuery = insertSqlQuery;
function valueSqlQuery(bean) {
    var tablename = bean.constructor.name.toLowerCase();
    // console.log('BEAN: ', bean);
    // console.log('COLUMNS: ', getNormStorage()[tablename].columns);
    // console.log('FK COLUMNS: ', getNormStorage()[tablename].fkcolumns);
    var values = [];
    index_1.getNormStorage()[tablename].columns.forEach(function (column) {
        // console.log(`${column}`, bean[column]);
        if (bean[column] === undefined) {
            values.push(null);
        }
        else {
            values.push(bean[column]);
        }
    });
    index_1.getNormStorage()[tablename].fkcolumns.forEach(function (element) {
        var fkcolumn = element.split('.');
        values.push(bean[fkcolumn[0]][fkcolumn[1]]);
    });
    console.log('valueSqlQuery: ', values);
    return values;
}
exports.valueSqlQuery = valueSqlQuery;
