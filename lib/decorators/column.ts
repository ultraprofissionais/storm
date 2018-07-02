
import { setColumnTable } from '../service/torm-service';
export function Column(model: any, target: any){

	setColumnTable( model.constructor.name.toLowerCase() , target);
	return this;
}