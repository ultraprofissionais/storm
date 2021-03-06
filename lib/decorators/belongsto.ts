import {StormutilService} from '../service';

export function belongsTo(fkcolumn: string){

	function actualDecorator(model: any, property: string | symbol): void {

		// console.log('TARGET: ', tablename);
		// console.log('PROPERTY: ', property);
		// console.log('FKCOLUMN: ', fkcolumn);
		StormutilService.setFkColumnTable( model.constructor.name.toLowerCase() , fkcolumn);
	}

	return actualDecorator;

}