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
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      if(!recipes.error) this.recipes = recipes.recipes;
    });
  }
}