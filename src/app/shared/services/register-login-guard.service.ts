import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { take } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Injectable({ providedIn:'root' })
export class RegisterLoginGuardService implements CanActivate {
    
    authenticatedUser : User;

    constructor(private store : Store<AppState>, private router : Router) {}

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        
        this.store.select('authenticatedUser')
            .pipe(take(1)).subscribe(
                (authenticatedUser : AuthenticatedUser) => this.authenticatedUser = authenticatedUser.user);

        if(!this.authenticatedUser) return true;        
        else this.router.navigateByUrl('/error');
        }
    }