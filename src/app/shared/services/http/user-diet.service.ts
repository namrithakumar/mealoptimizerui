import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUserDietType } from '../user-diet-type-resolver.service';

@Injectable({providedIn:'root'})
export class UserDietService {

    constructor(private http : HttpClient) {}

    getDietTypes() {
/*        //Structure of map: DietType, displayValue
        let userDietTypes = new Array<IUserDietType>();
        userDietTypes.push({dietType: 'ALL', displayValue: 'GENERAL'});
        userDietTypes.push({dietType: 'VEGAN',displayValue: 'VEGAN'});
        userDietTypes.push({dietType: 'GLUTENFREE', displayValue: 'GLUTEN FREE'});
        userDietTypes.push({dietType: 'FATFREE',displayValue: 'FAT FREE'});
        userDietTypes.push({dietType: 'DAIRYFREE',displayValue: 'DAIRY FREE'});
        userDietTypes.push({dietType: 'VEGETARIAN',displayValue: 'VEGETARIAN'});
        return userDietTypes;*/

        return this.http.get<{ categoryName : String, displayValue : String }[]>(
            'http://localhost:9090/mealoptimizer/categories/fetchAll'
        ).pipe(map(responseData => {
            const userDietTypes = new Array<IUserDietType>();
            responseData.forEach(category => {
                userDietTypes.push({dietType: category.categoryName, displayValue: category.displayValue});
            });
            return userDietTypes;
        }));
    }
}