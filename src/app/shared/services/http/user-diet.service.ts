import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { IUserDietType } from '../user-diet-type-resolver.service';

import { environment } from '../../../../environments/environment';

@Injectable({providedIn:'root'})
export class UserDietService {

    constructor(private http : HttpClient) {}

    getDietTypes() {
        
        return this.http.get<{ categoryName : String, displayValue : String }[]>(
            `${environment.hostUrl}:${environment.port}/${environment.applicationName}/categories/fetchAll`
        ).pipe(
            map(responseData => {
            const userDietTypes = new Array<IUserDietType>();
            responseData.forEach(category => {
                userDietTypes.push({dietType: category.categoryName, displayValue: category.displayValue});
            });
            return userDietTypes;
        }));
    }
}