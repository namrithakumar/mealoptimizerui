import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

//This service allows the user to access User --dropdown--> Settings/Profile/Logout only if the user is logged in.
@Injectable({ providedIn:'root' })
export class AuthGuardService implements CanActivate{
    
    constructor(private authService : AuthService, private router : Router) {}

    //If user is authenticated, allow access. Otherwise redirect to register-login page.
    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        if(this.authService.isAuthenticated()) return true;
        else 
            this.router.navigateByUrl('/user-mgmt/register-login');
        }
}