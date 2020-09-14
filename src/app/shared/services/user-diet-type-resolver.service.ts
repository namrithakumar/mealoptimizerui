import { Injectable } from '@angular/core';
import { UserDietService } from './user-diet.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

export interface IUserDietType {
    dietType : String;
    displayValue : String;
}

@Injectable({providedIn: 'root'})
export class UseDietTypeResolver implements Resolve<IUserDietType[]> {
    
    constructor(private userDietService : UserDietService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<IUserDietType[]> | Promise<IUserDietType[]> | IUserDietType[] {
        return this.userDietService.getDietTypes();
    }
}