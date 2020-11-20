import * as MenuActions from '../actions/menu.actions';

export interface Menu {
    itemList : Array<String>,
    error : String
}

const defaultMenu : Menu = { itemList : null, error : null }

export function menuReducer(state : Menu = defaultMenu, action : MenuActions.MenuActions) {
    switch( action.type ) {

        case MenuActions.UPDATE_MENU_SUCCESS:
            return { ...state, itemList: action.payload, error : null };

        case MenuActions.UPDATE_MENU_FAIL:
            return { ...state, itemList : null, error: action.payload }; 
            
        default: return state;
    }
}