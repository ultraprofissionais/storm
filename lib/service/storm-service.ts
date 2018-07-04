import { getStormStorage } from '../index';
import { TableMetadata } from '../metadatas/table-metadata';


export function AsetStormTable(table: string) {
	const tablename = table.toLowerCase();

	console.log('AsetStormTable - getStormTable 1: ', getStormStorage() );
	if (!getStormStorage()[tablename]){
		getStormStorage()[tablename] = new TableMetadata(tablename);
	}

	// console.log('getStormTable 2: ', getStormStorage()[tablename] );
}

export function AsetColumnTable(table: string, column: string){
	const tablename = table.toLowerCase();
	AsetStormTable(tablename);
	getStormStorage()[tablename].columns.push( column );
}

export function AsetFkColumnTable(table: string, column: string){
	const tablename = table.toLowerCase();
	AsetStormTable(tablename);
	getStormStorage()[tablename].fkcolumns.push( column );
}

export function AinsertSqlQuery(tablename: string){
	const table: any = getStormStorage()[tablename.toLowerCase()];

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

	const insertSql:string = `INSERT INTO ${tablename.toLowerCase()}(${columnSql}) VALUES (${valueSql.join(', ')}) RETURNING * `;
	console.log('insertSqlQuery - insertSql: ', insertSql);
	return insertSql;

}

export function AvalueSqlQuery(bean: Object){
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
		const fkcolumn = element.split('.');
		values.push( bean[fkcolumn[0]][fkcolumn[1]] );
	});

	console.log('insertSqlQuery - values: ', values);
	return values;
}
