import { ActionReducerMap } from '@ngrx/store';

import * as fromUserPreferences from '../../meal-planner/meal-optimizer/store/reducers/user-preferences.reducer';
import * as fromMenu from '../../meal-planner/meal-optimizer/store/reducers/menu.reducer';
import * as fromUserMgmt from '../../user-mgmt/store/reducers/user-mgmt.reducer';
import * as fromUserDisplayPreferences from '../../user-mgmt/store/reducers/user-display-preferences.reducer';
import * as fromOptimizedPlans from '../../meal-planner/meal-optimizer/store/reducers/order.reducer';
import * as fromRecipes from '../../meal-planner/recipes/store/reducers/recipes.reducer';
import * as fromShoppingList from '../../meal-planner/shopping-list/store/shopping-list.reducer';

export interface AppState {
    userPreferences : fromUserPreferences.UserPreferences,
    menu : fromMenu.Menu,
    authenticatedUser : fromUserMgmt.AuthenticatedUser,
    userDisplayPreferences : fromUserDisplayPreferences.UserDisplayPreferences,
    optimizedPlans : fromOptimizedPlans.OptimizedMealPlans,
    recipes : fromRecipes.Recipes,
    shoppingList : fromShoppingList.ShoppingList
}

export const appReducer : ActionReducerMap<AppState> = {
    userPreferences : fromUserPreferences.userPreferencesReducer,
    menu : fromMenu.menuReducer,
    authenticatedUser : fromUserMgmt.userMgmtReducer,
    userDisplayPreferences : fromUserDisplayPreferences.userDisplayPreferencesReducer,
    optimizedPlans : fromOptimizedPlans.orderReducer,
    recipes : fromRecipes.recipesReducer,
    shoppingList : fromShoppingList.shoppingListReducer
};