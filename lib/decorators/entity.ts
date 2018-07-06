
import { TableOptions } from '../models/tableoptions';
import { StormutilService } from '../service';

export function Entity( entity: any, tableoptions?: TableOptions ): any  {
	console.log('TableInheritance - entity: ', entity);

	if (!tableoptions){
		tableoptions = new TableOptions();
	}

	if (!tableoptions.table){
		tableoptions.table = entity.name.toLowerCase();
	} else {
        tableoptions.table = tableoptions.table.toLowerCase();
    }


	StormutilService.setTable(tableoptions.table);

	if (tableoptions.inhColumn !== undefined){
        StormutilService.setPkColumnTable(tableoptions.table, tableoptions.inhColumn ); // CRIAR UM VINCULO COM O EXTENDED
        StormutilService.setInhTable(tableoptions.table, tableoptions.inhTable, tableoptions.inhColumn ); // CRIAR UM VINCULO COM O EXTENDED
		//if (!tableoptions.pkColumn){
		//	tableoptions.pkColumn = tableoptions.inhColumn;
		//}
        //StormutilService.setColumnTable(tableoptions.table, tableoptions.pkColumn);
	}

	function newConstructor( ...args ){
		new entity(args);
	}
	newConstructor.prototype = entity.prototype;

	newConstructor.prototype.getSql = () => {
		// 'inner join inhTable on inhTable.fkcolumn=table.fkcolumn'
		return ` inner join ${tableoptions.inhTable} on ${tableoptions.inhTable}.${tableoptions.inhColumn}=${tableoptions.table}.${tableoptions.inhColumn} `;
	}

	// OVERWRITE SAVE FUNCTION
	Object.defineProperty(newConstructor.prototype, 'save', {
		value: function(): boolean {
		    const id = StormutilService.getPkColumn(this);

		    if ( id === 0 ){
                StormutilService.insertSql(this);
            } else {
		        StormutilService.updateSql(this);
            }
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

	console.log('Entity - newConstructor: ', newConstructor.prototype);

	return newConstructor;
}