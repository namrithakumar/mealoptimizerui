import { Action } from '@ngrx/store';

import { UserSignUpRequest } from '../../../shared/model/user-signup-request.model';
import { User } from '../../../shared/model/user.model';

/* AUTH_SUCCESS and AUTH_ERROR are common for both SIGNUP and LOGIN.
 * Other actions are self explanatory.
 */

export const SIGNUP_START = '[User mgmt] SIGNUP_START';
export const AUTH_SUCCESS = '[User mgmt] AUTH_SUCCESS';
export const AUTH_ERROR = '[User mgmt] AUTH_ERROR';
export const LOGIN_START = '[User mgmt] LOGIN_START';
export const LOGOUT = '[User mgmt] LOGOUT';
export const AUTO_LOGIN = '[User mgmt] AUTO_LOGIN';

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload  : UserSignUpRequest) {}
}

export class AuthSuccess implements Action {
    readonly type = AUTH_SUCCESS;
    constructor(public payload  : User) {}
}

export class AuthError implements Action {
    readonly type = AUTH_ERROR;
    constructor(public payload  : String) {}
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload : { username:String, password: String}) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export type UserMgmtActions = SignupStart | AuthSuccess | AuthError | LoginStart | Logout | AutoLogin;