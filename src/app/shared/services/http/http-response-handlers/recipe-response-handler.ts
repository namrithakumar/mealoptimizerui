import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as RecipeActions from '../../../../meal-planner/recipes/store/actions/recipes.actions';
import { ConnectionStatusProviderService } from '../../connection-status-provider.service';
import { ErrorDisplayService } from '../../error-display.service';
import { Recipe } from '../../../model/recipe.model';

@Injectable({ providedIn : 'root' })
export class RecipeResponseHandler implements BaseResponseHandler{

    constructor( 
        private connectionStatusProviderService : ConnectionStatusProviderService,
        private errorDisplayService : ErrorDisplayService
        ) {}

    handleSuccess(recipes : Recipe[]) {      
        return new RecipeActions.FetchRecipesSuccess(recipes);
    }
    handleFailure(errorResponse: any) {
        if(this.connectionStatusProviderService.getConnectionStatus() && errorResponse.status !== 404 && errorResponse.status !== 0) this.errorDisplayService.showError();
        return of(new RecipeActions.FetchRecipesFail('There was an error in fetching the recipes.'));
    }
}