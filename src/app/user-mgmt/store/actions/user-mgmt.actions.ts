import { Action } from '@ngrx/store';

import { User } from '../../../shared/model/user.model';

/* 
 * Names of actions are self explanatory.
 */

export const LOGIN_SUCCESS = '[User mgmt] LOGIN_SUCCESS';
export const LOGIN_ERROR = '[User mgmt] LOGIN_ERROR';
export const LOGOUT = '[User mgmt] LOGOUT';

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;
    constructor(public payload  : User) {}
}

export class LoginError implements Action {
    readonly type = LOGIN_ERROR;
    constructor(public payload  : String) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export type UserMgmtActions = LoginSuccess | LoginError | Logout;