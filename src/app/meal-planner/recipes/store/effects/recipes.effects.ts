import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";

import { Recipe } from "../../../../shared/model/recipe.model";
import * as RecipesActions from '../actions/recipes.actions';
import { RecipeResponseHandler } from '../../../../shared/services/response-handler/recipe-response-handler';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class RecipesEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private recipeResponseHandler : RecipeResponseHandler) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType<RecipesActions.FetchRecipesStart>(RecipesActions.FETCH_RECIPES_START),
        switchMap((fetchRecipesAction : RecipesActions.FetchRecipesStart) => {
            const url = `${environment.hostUrl}/${environment.applicationName}/recipe/find`;
            const params = new HttpParams()
                        .set('names', fetchRecipesAction.payload.join());
            return this.http.get<Recipe[]>(url, {params}).pipe(
                map((recipes : Recipe[]) => {
                    return this.recipeResponseHandler.handleSuccess(recipes);
                }),
                catchError((errorRes : any) => {
                    return this.recipeResponseHandler.handleFailure(errorRes);
                })
            )
        })
    );
}