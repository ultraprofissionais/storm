
import { TableOptions } from '../models/tableoptions';
import { insertSqlQuery, setColumnTable, setTormTable, valueSqlQuery } from '../service/torm-service';
import {NormDBFunction} from '../interfaces/normdbfunction-interface';

export function Entity( entity: any, tableoptions?: TableOptions ): any & NormDBFunction {
	console.log('TableInheritance 1: ', entity);

	if (!tableoptions){
		tableoptions = new TableOptions();
	}

	if (!tableoptions.table){
		tableoptions.table = entity.name.toLowerCase();
	}
	setTormTable(tableoptions.table);

	if (tableoptions.fkcolumn !== undefined){
		if (!tableoptions.pkcolumn){
			tableoptions.pkcolumn = tableoptions.fkcolumn;
		}
		setColumnTable(tableoptions.table, tableoptions.pkcolumn);
	}

	function newConstructor( ...args ){
		new entity(args);
	}
	newConstructor.prototype = entity.prototype;

	newConstructor.prototype.getSql = () => {
		// 'inner join fktable on fktable.fkcolumn=table.fkcolumn'
		return ` inner join ${tableoptions.fktable} on ${tableoptions.fktable}.${tableoptions.fkcolumn}=${tableoptions.table}.${tableoptions.fkcolumn} `;
	}

	Object.defineProperty(newConstructor.prototype, 'save', {
		value: function(): boolean {
			console.log('Entity OBJ: ', this );
			insertSqlQuery(tableoptions.table);
			valueSqlQuery(this);
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

	newConstructor.prototype.delete = (): boolean => {
		return true;
	};

	console.log('TableInheritance 2: ', newConstructor.prototype);

	return newConstructor;
}