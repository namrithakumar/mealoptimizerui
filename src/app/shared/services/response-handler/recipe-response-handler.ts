import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as RecipeActions from '../../../meal-planner/recipes/store/actions/recipes.actions';
import { Recipe } from '../../model/recipe.model';

@Injectable({ providedIn : 'root' })
export class RecipeResponseHandler implements BaseResponseHandler{

    constructor() {}

    handleSuccess(recipes : Recipe[]) {      
        return new RecipeActions.FetchRecipesSuccess(recipes);
    }
    handleFailure(errorResponse: any) {
        return of(new RecipeActions.FetchRecipesFail(
            errorResponse));
    }
}