import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn:'root' })
export class AuthGuardService implements CanActivate{
    
    constructor(private authService : AuthService, private router : Router) {}

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        this.authService.isAuthenticated()
            .then(
                (authenticated : boolean) => {
                    if(authenticated) return true;
                    else {
                        this.router.navigateByUrl('/user-mgmt/register-login');     
                    }
                }
            );                                     
            return false;
    }
}