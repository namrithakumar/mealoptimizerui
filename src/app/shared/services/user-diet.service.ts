import { Injectable } from '@angular/core';
import { IUserDietType } from './user-diet-type-resolver.service';

@Injectable({providedIn:'root'})
export class UserDietService {
    getDietTypes() : Array<IUserDietType> {
        //Structure of map: DietType, displayValue
        let userDietTypes = new Array<IUserDietType>();
        userDietTypes.push({dietType: 'ALL', displayValue: 'GENERAL'});
        userDietTypes.push({dietType: 'VEGAN',displayValue: 'VEGAN'});
        userDietTypes.push({dietType: 'GLUTENFREE', displayValue: 'GLUTEN FREE'});
        userDietTypes.push({dietType: 'FATFREE',displayValue: 'FAT FREE'});
        userDietTypes.push({dietType: 'DAIRYFREE',displayValue: 'DAIRY FREE'});
        userDietTypes.push({dietType: 'VEGETARIAN',displayValue: 'VEGETARIAN'});
        return userDietTypes;
    }

    //userDietTypeSelected = new EventEmitter<String>();
}