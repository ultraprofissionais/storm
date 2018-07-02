import { getTormStorage } from '../index';
import { TableMetadata } from '../metadatas/table-metadata';
export function setTormTable(table: string) {
	const tablename = table.toLowerCase();

	// console.log('getTormTable 1: ', getTormStorage() );
	if (!getTormStorage()[tablename]){
		getTormStorage()[tablename] = new TableMetadata(tablename);
	}

	// console.log('getTormTable 2: ', getTormStorage()[tablename] );
}

export function setColumnTable(table: string, column: string){
	const tablename = table.toLowerCase();
	setTormTable(tablename);
	getTormStorage()[tablename].columns.push( column );
}

export function setFkColumnTable(table: string, column: string){
	const tablename = table.toLowerCase();
	setTormTable(tablename);
	getTormStorage()[tablename].fkcolumns.push( column );
}

export function insertSqlQuery(tablename: string){
	const table: any = getTormStorage()[tablename.toLowerCase()];

	let columnSql: string = table.columns.join(', ');
	const valueSql: string[] = [];
	let indice: number = 1;

	// console.log('COLUMNS: ', table.columns );
	table.columns.forEach( () => {
		valueSql.push('$' + indice++ );
	});

	// console.log('FK COLUMNS: ', table.fkcolumns );
	table.fkcolumns.forEach( (element) => {
		const fkcolumn = element.split('.');
		columnSql = `${columnSql}, ${fkcolumn[1]}`;
		valueSql.push('$' + indice++ );
	});

	const insertSql:string = `INSERT INTO ${tablename.toLowerCase()}(${columnSql}) VALUES (${valueSql.join(', ')}) RETURNING * `;
	console.log('insertSql: ', insertSql);
	return insertSql;

}

export function valueSqlQuery(bean: Object){
	const tablename: string = bean.constructor.name.toLowerCase();

	// console.log('BEAN: ', bean);
	// console.log('COLUMNS: ', getTormStorage()[tablename].columns);
	// console.log('FK COLUMNS: ', getTormStorage()[tablename].fkcolumns);

	const values: any = [];
	getTormStorage()[tablename].columns.forEach( (column: any) => {
		// console.log(`${column}`, bean[column]);
		if ( bean[column] === undefined ){
			values.push( null );
		} else {
			values.push( bean[column] );
		}
	});

	getTormStorage()[tablename].fkcolumns.forEach( (element: any) => {
		const fkcolumn = element.split('.');
		values.push( bean[fkcolumn[0]][fkcolumn[1]] );
	});

	console.log('valueSqlQuery: ', values);
	return values;
}
