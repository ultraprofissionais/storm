
import { setFkColumnTable } from '../service/torm-service';
export function belongsTo(fkcolumn: string){

	function actualDecorator(model: any, property: string | symbol): void {

		// console.log('TARGET: ', tablename);
		// console.log('PROPERTY: ', property);
		// console.log('FKCOLUMN: ', fkcolumn);
		setFkColumnTable( model.constructor.name.toLowerCase() , fkcolumn);
	}

	return actualDecorator;

}