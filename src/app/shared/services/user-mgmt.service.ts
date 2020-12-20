import { Injectable } from '@angular/core';

import { AppState } from '../../../app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as UserMgmtActions from '../../user-mgmt/store/actions/user-mgmt.actions';

@Injectable({ providedIn : 'root' })
export class UserMgmtService {
    
    tokenExpirationTimer : any;

    constructor(private store : Store<AppState>) {}

    setLogoutTimer(expirationDuration : number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.store.dispatch(new UserMgmtActions.Logout())
        }, expirationDuration);       
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
    }
}