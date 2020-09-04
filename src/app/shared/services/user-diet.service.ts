import { Injectable, EventEmitter } from '@angular/core';

@Injectable({providedIn:'root'})
export class UserDietService {
    getDietTypes() : Map<String, String>{
        //Structure of map: DietType, displayValue
        let map = new Map<String, String>();
        map.set('ALL','GENERAL');
        map.set('VEGAN','VEGAN');
        map.set('GLUTENFREE','GLUTEN FREE');
        map.set('FATFREE','FAT FREE');
        map.set('DAIRYFREE','DAIRY FREE');
        map.set('VEGETARIAN','VEGETARIAN');
        return map;
    }

    //userDietTypeSelected = new EventEmitter<String>();
}