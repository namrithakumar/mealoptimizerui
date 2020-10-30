import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './http/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from '../user.model';

//This service allows the user to access User --dropdown--> Settings/Profile/Logout only if the user is logged in.
@Injectable({ providedIn:'root' })
export class AuthGuardService implements CanActivate {
    
    loggedInUser : User;

    constructor(private userService : UserService, private router : Router) {}

    //If user is authenticated, allow access. Otherwise redirect to login page.
    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        
        this.userService.user
            .pipe(take(1)).subscribe(
                (user : User) => this.loggedInUser = user);
        
        if(this.loggedInUser) return true;        
        else this.router.navigateByUrl('/user-mgmt/login');
        }
}