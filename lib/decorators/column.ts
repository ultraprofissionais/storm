
import {StormutilService} from '../service';

export function Column(model: any, target: any){

    console.log('Column - table : ', model.constructor.name.toLowerCase());
    console.log('Column - target: ', target);

	StormutilService.setColumnTable( model.constructor.name.toLowerCase() , target);
	return this;
}