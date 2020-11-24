import { User } from "../../../shared/model/user.model";
import * as UserMgmtActions from '../actions/user-mgmt.actions';

export interface AuthenticatedUser {
    user : User,
    error : String
}

const defaultUser : AuthenticatedUser = {
    user : null,
    error : null
};

export function userMgmtReducer(state : AuthenticatedUser = defaultUser, action : UserMgmtActions.UserMgmtActions) : AuthenticatedUser {
    switch(action.type) {
        
        case UserMgmtActions.AUTH_SUCCESS :
            return { ...state, user : action.payload, error : null};
        
        case UserMgmtActions.AUTH_ERROR:
            return { ...state, user : null, error : action.payload};

        case UserMgmtActions.LOGOUT:
            return { ...state, user : null, error : null};

        default : return state;
    }
}