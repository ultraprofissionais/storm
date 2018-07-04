
import { setColumnTable } from '../service/storm-service';
export function Column(model: any, target: any){

	setColumnTable( model.constructor.name.toLowerCase() , target);
	return this;
}