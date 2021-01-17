import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as UserMgmtActions from '../actions/user-mgmt.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { User } from '../../../shared/model/user.model';
import { of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserMgmtService } from '../../../shared/services/user-mgmt.service';
import { Router } from "@angular/router";

@Injectable()
export class UserMgmtEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions, 
                private jwtHelper : JwtHelperService, 
                private userMgmtService : UserMgmtService, 
                private router : Router) {}

/*
 * All of the below methods send a request to the backend and handle a response.
 * Names are self explanatory.
 */
@Effect()
signup = this.actions$.pipe(
    ofType<UserMgmtActions.SignupStart>(UserMgmtActions.SIGNUP_START),
    switchMap( (signup : UserMgmtActions.SignupStart) => {
        return this.http.post<User>('http://localhost:9090/mealoptimizer/user/register', signup.payload).pipe(
                            map((user : User) => { 
                                return this.handleSuccessfulAuthentication(user) }),
                            catchError((error : any) => { 
                                return this.handleAuthenticationError(error);
                            }));
    }
));

@Effect()
login = this.actions$.pipe(
    ofType<UserMgmtActions.LoginStart>(UserMgmtActions.LOGIN_START),
    switchMap( (login : UserMgmtActions.LoginStart) => {
        return this.http.post<User>('http://localhost:9090/mealoptimizer/user/login', login.payload).pipe(
                            map((user : User) => {
                                return this.handleSuccessfulAuthentication(user) }),
                            catchError((error : any) => { 
                                return this.handleAuthenticationError(error);
                            }));
    }
));

@Effect({ dispatch : false})
logout = this.actions$.pipe(
    ofType<UserMgmtActions.Logout>(UserMgmtActions.LOGOUT),
    tap(() => {
        this.userMgmtService.clearLogoutTimer();
        sessionStorage.clear();
        this.router.navigate(['/user-mgmt','login']);
    })
);

@Effect()
autoLogin = this.actions$.pipe(
    ofType<UserMgmtActions.AutoLogin>(UserMgmtActions.AUTO_LOGIN),
    map(() => {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        let loadedUser : User;
        if( !userData || (this.jwtHelper.isTokenExpired(userData.token))) {
            return { type : 'NO_ACTION' }
        }
        else {
            loadedUser = new User(userData.id, userData.username, userData.email, userData.preferredDietType, userData.firstName, userData.lastName, userData.address, userData.nutrientMinLimits, userData.nutrientMaxLimits, userData.token, userData._tokenValidTime, userData.tokenExpiryDate);
            this.userMgmtService.setLogoutTimer(new Date(loadedUser.tokenExpiryDate).getTime() - new Date().getTime());
            return new UserMgmtActions.AuthSuccess(loadedUser);   
        }
    })
);

//Common method to handle successful authentication for both signup and login.
/* On successful authentication - store token into browser storage.
 * Set timer for autologout.
 * Dispatch action AUTHENTICATION_SUCCESS with authenticatedUser info as payload.
 */
private handleSuccessfulAuthentication(authenticatedUser : User) {
    authenticatedUser.tokenExpiryDate = new Date(new Date().getTime() + authenticatedUser.tokenValidTime);
    sessionStorage.setItem('userData', JSON.stringify(authenticatedUser));
    this.userMgmtService.setLogoutTimer(new Date(authenticatedUser.tokenExpiryDate).getTime() - new Date().getTime());
    return new UserMgmtActions.AuthSuccess(authenticatedUser);
}

//Common method to handle authentication error for both signup and login.
/* On authentication failure,
 * Clear browser storage
 * Clear logout timer if it exists
 * Dispatch AUTHENTICATION_ERROR with error message as payload.
 */
private handleAuthenticationError(error : any) {
    var defaultErrorMessage = 'There was an error authenticating the user.';
    sessionStorage.clear();
    this.userMgmtService.clearLogoutTimer();
    if(!error || !error.error) return of(new UserMgmtActions.AuthError(defaultErrorMessage));
    else return of(new UserMgmtActions.AuthError(error.error.error + error.error.message));
    }
}