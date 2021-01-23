import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import * as MenuActions from '../actions/menu.actions';

export interface Menu {
    itemList : Array<String>,
    error : String,
    requestStatus : HttpRequestStatus
}

const defaultMenu : Menu = { itemList : null, error : null, requestStatus : HttpRequestStatus.NO_ACTION }

export function menuReducer(state : Menu = defaultMenu, action : MenuActions.MenuActions) {
    switch( action.type ) {

        case MenuActions.UPDATE_MENU_SUCCESS:
            return { ...state, itemList: action.payload, error : null, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED };

        case MenuActions.UPDATE_MENU_FAIL:
            return { ...state, itemList : null, error: action.payload, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED }; 
            
        case MenuActions.CLEAR_MENU:
            return defaultMenu;

        case MenuActions.UPDATE_REQUEST_STATUS:
            return { ...state, status : action.payload };

        default: return state;
    }
}