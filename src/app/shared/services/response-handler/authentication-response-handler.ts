import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as UserMgmtActions from '../../../user-mgmt/store/actions/user-mgmt.actions';
import { User } from '../../../shared/model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Injectable({ providedIn : 'root' })
export class AuthenticationResponseHandler implements BaseResponseHandler{

    constructor(private store : Store<AppState>) {}

    handleSuccess(authenticatedUser : User) { 
        this.store.dispatch(new UserMgmtActions.LoginSuccess(authenticatedUser));
    }
    handleFailure(errorResponse: String) {
            this.store.dispatch(new UserMgmtActions.LoginError(errorResponse));
    }
}