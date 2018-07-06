
export class TableMetadata {

	name ?: string;
    inhTable ?: string;
    inhColumn ?: string;


    columns ?: string[] = [];
	pkColumn ?: string;
	fkColumns ?: string[] = [];


	constructor(name: string){
		this.name = name;
	}

}