import { Action } from '@ngrx/store';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { Recipe } from '../../../../shared/model/recipe.model';

export const FETCH_RECIPES_START = '[Recipes] FETCH_RECIPES_START';
export const FETCH_RECIPES_SUCCESS = '[Recipes] FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAIL = '[Recipes] FETCH_RECIPES_FAIL';
export const UPDATE_REQUEST_STATUS = '[Recipes] UPDATE_REQUEST_STATUS';

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

export class UpdateRequestStatus implements Action {
    readonly type = UPDATE_REQUEST_STATUS;
    constructor(public payload : HttpRequestStatus) {}
}

export type RecipesActions = FetchRecipesStart | FetchRecipesSuccess | FetchRecipesFail | UpdateRequestStatus;