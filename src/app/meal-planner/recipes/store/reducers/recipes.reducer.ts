import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { Recipe } from '../../../../shared/model/recipe.model';
import * as RecipesActions from '../actions/recipes.actions';

export interface Recipes {
    recipes : Recipe[],
    error : String,
    requestStatus : HttpRequestStatus
}

const defaultRecipes : Recipes = {
    recipes : null,
    error : null,
    requestStatus : HttpRequestStatus.NO_ACTION
};

export function recipesReducer(state : Recipes = defaultRecipes, action : RecipesActions.RecipesActions) {
    switch(action.type) {
        
        case RecipesActions.FETCH_RECIPES_SUCCESS :
            return { ...state, recipes : action.payload, error : null, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED};

        case RecipesActions.FETCH_RECIPES_FAIL :
            return { ...state, recipes : null, error : action.payload, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED};

        case RecipesActions.UPDATE_REQUEST_STATUS:
            return { ...state, requestStatus : action.payload };
              
        case RecipesActions.CLEAR_RECIPES:
            return defaultRecipes;
                
        default : return state;
    }
}