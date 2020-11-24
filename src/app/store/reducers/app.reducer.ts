import { ActionReducerMap } from '@ngrx/store';
import * as fromUserPreferences from '../../meal-optimizer/store/reducers/user-preferences.reducer';
import * as fromMenu from '../../meal-optimizer/store/reducers/menu.reducer';
import * as fromUserMgmt from '../../user-mgmt/store/reducers/user-mgmt.reducer';
import * as fromOptimizedPlans from '../../meal-optimizer/store/reducers/order.reducer';
import * as fromRecipes from '../../recipes/store/reducers/recipes.reducer';

export interface AppState {
    userPreferences : fromUserPreferences.UserPreferences,
    menu : fromMenu.Menu,
    authenticatedUser : fromUserMgmt.AuthenticatedUser,
    optimizedPlans : fromOptimizedPlans.OptimizedMealPlans,
    recipes : fromRecipes.Recipes
}

export const appReducer : ActionReducerMap<AppState> = {
    userPreferences : fromUserPreferences.userPreferencesReducer,
    menu : fromMenu.menuReducer,
    authenticatedUser : fromUserMgmt.userMgmtReducer,
    optimizedPlans : fromOptimizedPlans.orderReducer,
    recipes : fromRecipes.recipesReducer
};