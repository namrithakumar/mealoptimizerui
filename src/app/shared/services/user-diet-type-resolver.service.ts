import { Injectable } from '@angular/core';
import { UserDietService } from './http/user-diet.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectionStatusProviderService } from './connection-status-provider.service';

export interface IUserDietType {
    dietType : String;
    displayValue : String;
}

@Injectable({providedIn: 'root'})
export class UseDietTypeResolver implements Resolve<IUserDietType[]> {
    
    constructor(private userDietService : UserDietService, private connectionStatusProviderService:  ConnectionStatusProviderService) {}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<IUserDietType[]> | Promise<IUserDietType[]> | IUserDietType[] {
        //To be changed to fetch diet types from cache using service worker.
        return (this.connectionStatusProviderService.getConnectionStatus())?this.userDietService.getDietTypes():new Array<IUserDietType>();
    }
}