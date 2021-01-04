import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../model/user.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import { ConnectionStatusProviderService } from './connection-status-provider.service';

//This service allows the user to access User --dropdown--> Settings/Profile/Logout only if the user is logged in.
@Injectable({ providedIn:'root' })
export class AuthGuardService implements CanActivate {
    
    loggedInUser : User;

    constructor(private store : Store<AppState>, private router : Router, private connectionStatusProviderService:  ConnectionStatusProviderService) {}

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean>  | boolean {
        
        this.store.select('authenticatedUser')
            .pipe(take(1)).subscribe(
                (authenticatedUser : AuthenticatedUser) => this.loggedInUser = authenticatedUser.user);
        
        //Do not allow navigation if the user is offline
        if(!this.connectionStatusProviderService.getConnectionStatus()) return false;
        //If user is authenticated, allow access. Otherwise redirect to login page.
        else if(this.loggedInUser) return true;        
        else this.router.navigateByUrl('/user-mgmt/login');
        }
}