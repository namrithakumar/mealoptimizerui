import { Action } from '@ngrx/store';

import { OptimizationMode } from '../../../shared/optimization-mode.enum';
import { ShoppingListMode } from '../../../shared/shopping-list-mode.enum';
/* 
 * This file deals with which sections of the meal planner must be displayed/hidden. 
 * Switching between modes is also covered.
 */

export const UPDATE_OPTIMIZATION_MODE = '[User display prefs] UPDATE_OPTIMIZATION_MODE';
export const SHOW_RECIPES = '[User display prefs] SHOW_RECIPES';
export const HIDE_RECIPES = '[User display prefs] HIDE_RECIPES';
export const SHOW_RECIPE_DETAIL = '[User display prefs] SHOW_RECIPE_DETAIL';
export const SHOW_SHOPPING_LIST = '[User display prefs] SHOW_SHOPPING_LIST';
export const HIDE_SHOPPING_LIST = '[User display prefs] HIDE_SHOPPING_LIST';
export const UPDATE_SHOPPING_LIST_MODE = '[User display prefs] UPDATE_SHOPPING_LIST_MODE';
export const RESET_USER_DISPLAY_PREFERENCES = '[User display prefs] RESET_USER_DISPLAY_PREFERENCES';

export class UpdateOptimizationMode implements Action {
    readonly type = UPDATE_OPTIMIZATION_MODE;
    constructor(public payload  : OptimizationMode) {}
}

export class ShowRecipes implements Action {
    readonly type = SHOW_RECIPES;
}

export class HideRecipes implements Action {
    readonly type = HIDE_RECIPES;
}

export class ShowRecipeDetail implements Action {
    readonly type = SHOW_RECIPE_DETAIL;
    constructor(public payload  : { id:number, name: String}) {}
}

export class ShowShoppingList implements Action {
    readonly type = SHOW_SHOPPING_LIST;
}

export class HideShoppingList implements Action {
    readonly type = HIDE_SHOPPING_LIST;
}

export class UpdateShoppingListMode implements Action {
    readonly type = UPDATE_SHOPPING_LIST_MODE;
    constructor(public payload  : ShoppingListMode) {}
}

export class ResetUserDisplayPreferences implements Action {
    readonly type = RESET_USER_DISPLAY_PREFERENCES;
}

export type UserDisplayPreferencesActions = UpdateOptimizationMode 
                                | ShowRecipes 
                                | HideRecipes
                                | ShowRecipeDetail
                                | ShowShoppingList
                                | HideShoppingList
                                | UpdateShoppingListMode
                                | ResetUserDisplayPreferences;