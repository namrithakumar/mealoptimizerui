import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/app.reducer';
import * as UserMgmtActions from '../actions/user-mgmt.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { User } from '../../../shared/model/user.model';
import { of } from "rxjs";

@Injectable()
export class UserMgmtEffects {

    constructor(private http : HttpClient, private actions$ : Actions, private store : Store<AppState>) {}

@Effect()
signup = this.actions$.pipe(
    ofType<UserMgmtActions.SignupStart>(UserMgmtActions.SIGNUP_START),
    switchMap( (signup : UserMgmtActions.SignupStart) => {
        return this.http.post<User>('http://localhost:9090/mealoptimizer/user/register', signup.payload).pipe(
                            map((user : User) => { return this.handleSuccessfulAuthentication(user) }),
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
                            map((user : User) => { return this.handleSuccessfulAuthentication(user) }),
                            catchError((error : any) => { 
                                return this.handleAuthenticationError(error);
                            }));
    }
));

private handleSuccessfulAuthentication(user : User) {
    user.tokenExpiryDate = new Date(new Date().getTime() + user.tokenValidTime);
    return new UserMgmtActions.AuthSuccess(user);
}

private handleAuthenticationError(error : any) {
    var defaultErrorMessage = 'There was an error authenticating the user.';
    if(!error || !error.error) return of(new UserMgmtActions.AuthError(defaultErrorMessage));
    else return of(new UserMgmtActions.AuthError(error.error.error + error.error.message));
    }
}