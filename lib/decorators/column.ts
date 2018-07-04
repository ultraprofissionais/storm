
import {StormutilService} from '../service';

export function Column(model: any, target: any){

	StormutilService.setColumnTable( model.constructor.name.toLowerCase() , target);
	return this;
}