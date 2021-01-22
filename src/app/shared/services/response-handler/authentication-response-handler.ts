import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as UserMgmtActions from '../../../user-mgmt/store/actions/user-mgmt.actions';
import { User } from '../../../shared/model/user.model';

@Injectable({ providedIn : 'root' })
export class AuthenticationResponseHandler implements BaseResponseHandler{

    defaultErrorMessage = 'There was an error authenticating the user.';

    constructor() {}

    handleSuccess(authenticatedUser : User) {      
        return new UserMgmtActions.AuthSuccess(authenticatedUser);
    }
    handleFailure(errorResponse: any) {
        if(!errorResponse || !errorResponse.error) 
            return of(new UserMgmtActions.AuthError(this.defaultErrorMessage));
        else return of(new UserMgmtActions.AuthError(
            errorResponse.error.error + errorResponse.error.message));
    }
}