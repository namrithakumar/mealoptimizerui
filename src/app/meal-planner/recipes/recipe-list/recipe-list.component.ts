import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Recipes } from '../../recipes/store/reducers/recipes.reducer';
import { Recipe } from 'src/app/shared/model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
/*
 * This component is loaded for the route meal-planner/recipes.
 * It is composed of 4 RecipeItems.
 * 
 * Tasks : Takes recipes from 'Recipes' store and passes them to RecipeItem.
 * Technique used : Attribute Binding 
 */
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      if(!recipes.error) this.recipes = recipes.recipes;
    });
  }
}