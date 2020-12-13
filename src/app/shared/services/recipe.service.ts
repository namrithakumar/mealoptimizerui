import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { HttpClient } from '@angular/common/http';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Recipes } from 'src/app/recipes/store/reducers/recipes.reducer';

@Injectable({providedIn:'root'})
export class RecipeService implements OnInit, OnDestroy {
    
  constructor(private store : Store<AppState>, private http : HttpClient) {}

  ngOnInit() {
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      this.recipes = recipes.recipes.slice();
    });
  }
  
  recipes: Recipe[] = [];

    public getRecipeById(id : number) : Recipe {
      var recipeList = this.recipes.slice();
      return recipeList[id];
    }

  ngOnDestroy() {}
}