import { ActionReducerMap } from '@ngrx/store';
import * as fromUserPreferences from '../../meal-optimizer/store/reducers/user-preferences.reducer';
import * as fromMenu from '../../meal-optimizer/store/reducers/menu.reducer';

export interface AppState {
    userPreferences : fromUserPreferences.UserPreferences,
    menu : fromMenu.Menu
}

export const appReducer : ActionReducerMap<AppState> = {
    userPreferences : fromUserPreferences.userPreferencesReducer,
    menu : fromMenu.menuReducer
};