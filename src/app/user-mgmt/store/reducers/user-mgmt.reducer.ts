import { HttpRequestStatus } from "src/app/shared/http-request-status.enum";
import { User } from "../../../shared/model/user.model";
import * as UserMgmtActions from '../actions/user-mgmt.actions';

export interface AuthenticatedUser {
    user : User,
    error : String,
    requestStatus : HttpRequestStatus
}

const defaultUser : AuthenticatedUser = {
    user : null,
    error : null,
    requestStatus : HttpRequestStatus.NO_ACTION
};

export function userMgmtReducer(state : AuthenticatedUser = defaultUser, action : UserMgmtActions.UserMgmtActions) : AuthenticatedUser {
    switch(action.type) {
        
        case UserMgmtActions.AUTH_SUCCESS :
            return { ...state, user : action.payload, error : null, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED };
        
        case UserMgmtActions.AUTH_ERROR:
            return { ...state, user : null, error : action.payload, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED };

        case UserMgmtActions.LOGOUT:
            return { ...state, user : null, error : null};

        case UserMgmtActions.UPDATE_REQUEST_STATUS:
            return { ...state, requestStatus : action.payload };

        default : return state;
    }
}