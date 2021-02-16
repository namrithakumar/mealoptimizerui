import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Recipes } from 'src/app/meal-planner/recipes/store/reducers/recipes.reducer';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class RecipeService implements OnInit, OnDestroy {
    
  recipeSelected : Subject<boolean> = new Subject();
  
  constructor(private store : Store<AppState>) {
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      this.recipes = recipes.recipes;
    });
  }

  ngOnInit() { }
  
  recipes: Recipe[] = [];

    public getRecipeById(id : number) : Recipe {
      var recipeList = this.recipes.slice();
      return recipeList[id];
    }

  ngOnDestroy() {}
}