import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipeService {
    
  constructor(private authService : AuthService, private http : HttpClient) {}

  recipes: Recipe[] = [];

    public getRecipes(itemNames : Array<String>) : Observable<Recipe[]> {
      let url = 'http://localhost:9090/mealoptimizer/recipe/find';
      let params = new HttpParams()
                  .set('names', itemNames.toString());

      return this.http.get<Recipe[]>(url, {params}).pipe(
        tap(recipes => {
          this.recipes = recipes;}));            
    }

    public getRecipeById(id : number) : Recipe {
      var recipeList = this.recipes.slice();
      return recipeList[id];
    }
}