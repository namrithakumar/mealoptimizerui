import * as UserDisplayPreferencesActions from "../actions/user-display-preferences.actions";

import { OptimizationMode } from '../../../shared/optimization-mode.enum';
import { ShoppingListMode } from '../../../shared/shopping-list-mode.enum';

export interface UserDisplayPreferences {
    optimizationMode: String,
    showRecipes : boolean,
    recipeSelected : { id:number, name: String},
    showShoppingList : boolean,
    shoppingListMode : String
}

const defaultPrefs : UserDisplayPreferences = {
    optimizationMode: OptimizationMode.CREATE,
    showRecipes : false,
    recipeSelected : null,
    showShoppingList : false,
    shoppingListMode : ShoppingListMode.ADD
}

export function userDisplayPreferencesReducer(state : UserDisplayPreferences = defaultPrefs, action : UserDisplayPreferencesActions.UserDisplayPreferencesActions) : UserDisplayPreferences {
    
    switch(action.type) {
        
        case UserDisplayPreferencesActions.UPDATE_OPTIMIZATION_MODE :
            return { ...state, optimizationMode : action.payload, recipeSelected : null };
        
        case UserDisplayPreferencesActions.SHOW_RECIPES :
            return { ...state, showRecipes : true, recipeSelected : null };        

        case UserDisplayPreferencesActions.HIDE_RECIPES :
            return { ...state, showRecipes : false, recipeSelected : null };              
        
        case UserDisplayPreferencesActions.SHOW_RECIPE_DETAIL :
            return { ...state, showRecipes : true, recipeSelected : action.payload };

        case UserDisplayPreferencesActions.SHOW_SHOPPING_LIST :
            return { ...state, showShoppingList : true };        
    
        case UserDisplayPreferencesActions.HIDE_SHOPPING_LIST :
            return { ...state, showShoppingList : false }; 

        case UserDisplayPreferencesActions.UPDATE_SHOPPING_LIST_MODE :
            return { ...state, shoppingListMode : action.payload };

        case UserDisplayPreferencesActions.RESET_USER_DISPLAY_PREFERENCES :
            return defaultPrefs;

        default : 
            return state;
    }
}