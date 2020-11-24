import { Action } from '@ngrx/store';
import { Recipe } from '../../../shared/model/recipe.model';

export const FETCH_RECIPES_START = '[Recipes] FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = '[Recipes] FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAIL = '[Recipes] FETCH_RECIPES_FAIL';

export class FetchRecipesStart implements Action {
    readonly type = FETCH_RECIPES_START;
    constructor(public payload : String[]) {}
}

export class FetchRecipesSuccess implements Action {
    readonly type = FETCH_RECIPES_SUCCESS;
    constructor(public payload : Recipe[]) {}
}

export class FetchRecipesFail implements Action {
    readonly type = FETCH_RECIPES_FAIL;
    constructor(public payload : String) {}
}

export type RecipesActions = FetchRecipesStart | FetchRecipesSuccess | FetchRecipesFail;