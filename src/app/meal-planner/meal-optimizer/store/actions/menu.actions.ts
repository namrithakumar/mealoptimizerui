import { Action } from '@ngrx/store';

export const UPDATE_MENU_START = '[Menu] Update menu start';
export const UPDATE_MENU_SUCCESS = '[Menu] Update menu success';
export const UPDATE_MENU_FAIL = '[Menu] Update menu fail';
export const CLEAR_MENU = '[Menu] Clear Menu';

export class UpdateMenuStart implements Action {
    readonly type = UPDATE_MENU_START;
    constructor(public payload : String) {} // Payload refers to dietType
}

export class UpdateMenuSuccess implements Action {
    readonly type = UPDATE_MENU_SUCCESS;
    constructor(public payload : Array<String>) {} // Payload refers to a list of itemNames in the menu
}

export class UpdateMenuFail implements Action {
    readonly type = UPDATE_MENU_FAIL;
    constructor(public payload : String) {} //Payload refers to error when meu is retrieved from backend here
}

export class ClearMenu implements Action {
    readonly type = CLEAR_MENU;
}

export type MenuActions = UpdateMenuStart | UpdateMenuSuccess | UpdateMenuFail | ClearMenu;