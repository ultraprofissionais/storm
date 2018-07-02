"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const table_metadata_1 = require("../metadatas/table-metadata");
function setTormTable(table) {
    const tablename = table.toLowerCase();
    if (!index_1.getTormStorage()[tablename]) {
        index_1.getTormStorage()[tablename] = new table_metadata_1.TableMetadata(tablename);
    }
}
exports.setTormTable = setTormTable;
function setColumnTable(table, column) {
    const tablename = table.toLowerCase();
    setTormTable(tablename);
    index_1.getTormStorage()[tablename].columns.push(column);
}
exports.setColumnTable = setColumnTable;
function setFkColumnTable(table, column) {
    const tablename = table.toLowerCase();
    setTormTable(tablename);
    index_1.getTormStorage()[tablename].fkcolumns.push(column);
}
exports.setFkColumnTable = setFkColumnTable;
function insertSqlQuery(tablename) {
    const table = index_1.getTormStorage()[tablename.toLowerCase()];
    let columnSql = table.columns.join(', ');
    const valueSql = [];
    let indice = 1;
    table.columns.forEach(() => {
        valueSql.push('$' + indice++);
    });
    table.fkcolumns.forEach((element) => {
        const fkcolumn = element.split('.');
        columnSql = `${columnSql}, ${fkcolumn[1]}`;
        valueSql.push('$' + indice++);
    });
    const insertSql = `INSERT INTO ${tablename.toLowerCase()}(${columnSql}) VALUES (${valueSql.join(', ')}) RETURNING * `;
    console.log('insertSql: ', insertSql);
    return insertSql;
}
exports.insertSqlQuery = insertSqlQuery;
function valueSqlQuery(bean) {
    const tablename = bean.constructor.name.toLowerCase();
    const values = [];
    index_1.getTormStorage()[tablename].columns.forEach((column) => {
        if (bean[column] === undefined) {
            values.push(null);
        }
        else {
            values.push(bean[column]);
        }
    });
    index_1.getTormStorage()[tablename].fkcolumns.forEach((element) => {
        const fkcolumn = element.split('.');
        values.push(bean[fkcolumn[0]][fkcolumn[1]]);
    });
    console.log('valueSqlQuery: ', values);
    return values;
}
exports.valueSqlQuery = valueSqlQuery;
//# sourceMappingURL=torm-service.js.map