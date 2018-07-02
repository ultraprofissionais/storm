import { ColumnMetadata } from './column-metadata';

export class TableMetadata{

	name ?: string;
	columns ?: string[] = [];
	fkcolumns ?: string[] = [];

	constructor(name: string){
		this.name = name;
	}

}