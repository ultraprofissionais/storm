
import { TableOptions } from '../models/tableoptions';
import {StormutilService} from '../service';

export function Entity( entity: any, tableoptions?: TableOptions ): any  {
	console.log('TableInheritance 1: ', entity);

	if (!tableoptions){
		tableoptions = new TableOptions();
	}

	if (!tableoptions.table){
		tableoptions.table = entity.name.toLowerCase();
	}
	StormutilService.setTable(tableoptions.table);

	if (tableoptions.fkcolumn !== undefined){
		if (!tableoptions.pkcolumn){
			tableoptions.pkcolumn = tableoptions.fkcolumn;
		}
        StormutilService.setColumnTable(tableoptions.table, tableoptions.pkcolumn);
	}

	function newConstructor( ...args ){
		new entity(args);
	}
	newConstructor.prototype = entity.prototype;

	newConstructor.prototype.getSql = () => {
		// 'inner join fktable on fktable.fkcolumn=table.fkcolumn'
		return ` inner join ${tableoptions.fktable} on ${tableoptions.fktable}.${tableoptions.fkcolumn}=${tableoptions.table}.${tableoptions.fkcolumn} `;
	}

	// OVERWRITE SAVE FUNCTION
	Object.defineProperty(newConstructor.prototype, 'save', {
		value: function(): boolean {
			console.log('ENTITY - SAVE FUNCTION - OBJ: ', this );
            StormutilService.insertSqlQuery(tableoptions.table);
            StormutilService.valueSqlQuery(this);
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