import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { take } from 'rxjs/operators';

@Injectable({ providedIn:'root' })
export class RegisterLoginGuardService implements CanActivate {
    
    authenticatedUser : User;

    constructor(private userService : UserService, private router : Router) {}

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        
        this.userService.user
            .pipe(take(1)).subscribe(
                (user : User) => this.authenticatedUser = user);

        if(!this.authenticatedUser) return true;        
        else this.router.navigateByUrl('/error');
        }
    }