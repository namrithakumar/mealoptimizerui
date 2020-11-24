import { Recipe } from '../../../shared/model/recipe.model';
import * as RecipesActions from '../actions/recipes.actions';

export interface Recipes {
    recipes : Recipe[],
    error : String
}

const defaultRecipes : Recipes = {
    recipes : null,
    error : null
};

export function recipesReducer(state : Recipes = defaultRecipes, action : RecipesActions.RecipesActions) {
    switch(action.type) {
        
        case RecipesActions.FETCH_RECIPES_SUCCESS :
            return { ...state, recipes : action.payload, error : null};

        case RecipesActions.FETCH_RECIPES_FAIL :
            return { ...state, recipes : null, error : action.payload};

        default : return state;
    }
}