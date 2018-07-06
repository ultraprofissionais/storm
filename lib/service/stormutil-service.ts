import {TableMetadata} from '../metadatas/table-metadata';
import {getStormStorage} from '../index';

export class StormutilService {

    static setTable(table: string) {
        const tablename = table.toLowerCase();

        console.log('setStormTable - getStormTable 1: ', getStormStorage() );
        if (!getStormStorage()[tablename]){
            getStormStorage()[tablename] = new TableMetadata(tablename);
        }
        // console.log('getStormTable 2: ', getStormStorage()[tablename] );
    }

    static setColumnTable(table: string, column: string){
        const tablename = table.toLowerCase();
        this.setTable(tablename);
        getStormStorage()[tablename].columns.push( column );
    }

    static setFkColumnTable(table: string, column: string){
        const tablename = table.toLowerCase();
        this.setTable(tablename);
        getStormStorage()[tablename].fkColumns.push( column );
    }

    static setPkColumnTable(table: string, column: string){
        const tablename = table.toLowerCase();
        this.setTable(tablename);
        getStormStorage()[tablename].pkColumns.push( column );
    }

    static setInhColumnTable(table: string, column: string){
        const tablename = table.toLowerCase();
        this.setTable(tablename);
        getStormStorage()[tablename].inhColumns.push( column );
    }

    /*

        É preciso criar um mecanismo aonde eu faço assim:

        Pessoa [];
        Usuario []



     */


    static insertSqlQuery(tablename: string){
        const table: any = getStormStorage()[tablename.toLowerCase()];
        console.log('insertSqlQuery - table: ', table);

        let columnSql: string = table.columns.join(', ');
        const valueSql: string[] = [];
        let indice: number = 1;

        console.log('insertSqlQuery - COLUMNS: ', table.columns );
        table.columns.forEach( () => {
            valueSql.push('$' + indice++ );
        });

        console.log('insertSqlQuery - FK COLUMNS: ', table.fkcolumns );
        table.fkcolumns.forEach( (element) => {
            const fkcolumn = element.split('.');
            columnSql = `${columnSql}, ${fkcolumn[1]}`;
            valueSql.push('$' + indice++ );
        });

        console.log('insertSqlQuery - INH COLUMNS: ', table.fkcolumns );
        table.fkcolumns.forEach( (element) => {
            const fkcolumn = element.split('.');
            columnSql = `${columnSql}, ${fkcolumn[1]}`;
            valueSql.push('$' + indice++ );
        });

        const insertSql:string = `INSERT INTO ${tablename.toLowerCase()}(${columnSql}) VALUES (${valueSql.join(', ')}) RETURNING * `;
        console.log('insertSqlQuery - insertSql: ', insertSql);
        return insertSql;

    }

    static valueSqlQuery(bean: Object){
        const tablename: string = bean.constructor.name.toLowerCase();

        console.log('valueSqlQuery - BEAN: ', bean);
        console.log('valueSqlQuery - COLUMNS: ', getStormStorage()[tablename].columns);
        console.log('valueSqlQuery - FK COLUMNS: ', getStormStorage()[tablename].fkcolumns);

        const values: any = [];
        getStormStorage()[tablename].columns.forEach( (column: any) => {
            // console.log(`${column}`, bean[column]);
            if ( bean[column] === undefined ){
                values.push( null );
            } else {
                values.push( bean[column] );
            }
        });

        getStormStorage()[tablename].fkcolumns.forEach( (element: any) => {
            console.log('valueSqlQuery - FKCOLUMNS ELEMENT: ', element);
            const fkcolumn = element.split('.');
            console.log('FvalueSqlQuery KCOLUMN: ', fkcolumn);

            if ( bean[fkcolumn[0]] !== undefined ){
                if ( bean[fkcolumn[0]][fkcolumn[1]] !== undefined ) {
                    values.push( bean[fkcolumn[0]][fkcolumn[1]] );
                }
            }

        });

        console.log('insertSqlQuery - values: ', values);
        return values;
    }

}