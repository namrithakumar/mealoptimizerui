import { User } from "../../../shared/model/user.model";
import { UserBuilder } from '../../../shared/model/user-builder.model';
import * as UserMgmtActions from '../actions/user-mgmt.actions';

export interface AuthenticatedUser {
    user : User,
    error : String
}

const defaultUser : AuthenticatedUser = {
    user : new UserBuilder('guest').build(),
    error : null
};

export function userMgmtReducer(state : AuthenticatedUser = defaultUser, action : UserMgmtActions.UserMgmtActions) : AuthenticatedUser {
    switch(action.type) {
        
        case UserMgmtActions.LOGIN_SUCCESS :
            console.log('Received inside user-mgmt-reducer ' + JSON.stringify(action.payload));
            return { ...state, user : action.payload, error : null };
        
        case UserMgmtActions.LOGIN_ERROR:
            return { ...state, user : null, error : action.payload };

        case UserMgmtActions.LOGOUT:
            return { ...state, user : new UserBuilder('guest').build(), error : null};

        default : return state;
    }
}