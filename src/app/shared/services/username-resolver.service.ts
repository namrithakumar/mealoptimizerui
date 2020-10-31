import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({providedIn: 'root'})
export class UsernameResolver implements Resolve<String[]> {
    
    constructor(private userService : UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): String[] | Observable<String[]> | Promise<String[]> {
        return this.userService.fetchAllUsernames();
    }

}