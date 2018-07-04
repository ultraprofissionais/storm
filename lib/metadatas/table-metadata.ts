
export class TableMetadata{

	name ?: string;
    columns ?: string[] = [];
	pkColumns ?: string[] = [];
	fkColumns ?: string[] = [];
	inhColumns ?: string[] = [];

	constructor(name: string){
		this.name = name;
	}

}