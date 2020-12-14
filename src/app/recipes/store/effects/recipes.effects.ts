import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { Recipe } from "../../../shared/model/recipe.model";
import { AppState } from "../../../store/reducers/app.reducer";
import * as RecipesActions from '../actions/recipes.actions';

@Injectable()
export class RecipesEffects {

    constructor(private http : HttpClient, private actions$ : Actions, private store : Store<AppState>) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType<RecipesActions.FetchRecipesStart>(RecipesActions.FETCH_RECIPES_START),
        switchMap((fetchRecipesAction : RecipesActions.FetchRecipesStart) => {
            const url = 'http://localhost:9090/mealoptimizer/recipe/find';
            const params = new HttpParams()
                        .set('names', fetchRecipesAction.payload.join());
            return this.http.get<Recipe[]>(url, {params}).pipe(
                map((recipes : Recipe[]) => {
                    return new RecipesActions.FetchRecipesSuccess(recipes);
                }),
                catchError((error : any) => {
                    return of(new RecipesActions.FetchRecipesFail(error.error.message));
                })
            )
        })
    );
}