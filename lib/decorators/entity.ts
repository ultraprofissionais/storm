
import { TableOptions } from '../models/tableoptions';
import {StormutilService} from '../service';

export function Entity( entity: any, tableoptions?: TableOptions ): any  {
	console.log('TableInheritance - entity: ', entity);

	if (!tableoptions){
		tableoptions = new TableOptions();
	}

	if (!tableoptions.Table){
		tableoptions.Table = entity.name.toLowerCase();
	}
	StormutilService.setTable(tableoptions.Table);

	if (tableoptions.inhColumn !== undefined){
	    StormutilService.setFkColumnTable(tableoptions.Table, tableoptions.inhColumn ); // CRIAR UM VINCULO COM O EXTENDED
		if (!tableoptions.pkColumn){
			tableoptions.pkColumn = tableoptions.inhColumn;
		}
        StormutilService.setColumnTable(tableoptions.Table, tableoptions.pkColumn);
	}

	function newConstructor( ...args ){
		new entity(args);
	}
	newConstructor.prototype = entity.prototype;

	newConstructor.prototype.getSql = () => {
		// 'inner join inhTable on inhTable.fkcolumn=table.fkcolumn'
		return ` inner join ${tableoptions.inhTable} on ${tableoptions.inhTable}.${tableoptions.inhColumn}=${tableoptions.Table}.${tableoptions.inhColumn} `;
	}

	// OVERWRITE SAVE FUNCTION
	Object.defineProperty(newConstructor.prototype, 'save', {
		value: function(): boolean {
			console.log('ENTITY - SAVE FUNCTION - OBJ: ', this );
            StormutilService.insertSqlQuery(tableoptions.Table);
            StormutilService.valueSqlQuery(this);
			return true;
		},
	});

	/*
	newConstructor.prototype.save = (bean: any): boolean => {
		console.log('Entity OBJ 1: ', bean.get() );
		console.log('Entity OBJ 2: ', this );
		console.log('Entity OBJ 3: ', newConstructor);
		insertSqlQuery(tableoptions.Table);
		valueSqlQuery(bean);
		return true;
	};
	*/

	newConstructor.prototype.delete = (): boolean => {
		return true;
	};

	console.log('Entity - newConstructor: ', newConstructor.prototype);

	return newConstructor;
}