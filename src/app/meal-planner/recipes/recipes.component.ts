import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DefaultMessages } from 'src/app/shared/default-messages';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Recipes } from './store/reducers/recipes.reducer';
import { UserDisplayPreferences } from 'src/app/user-mgmt/store/reducers/user-display-preferences.reducer';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
/*
 * This component has 2 sections :
 * RecipeList : List of recipes for the meals chosen. It is composed of 4 RecipeItems
 * RecipeStart : Displays a help text. This section is replaced with RecipeDetail as soon as a recipe is selected.
 * 
 * Transition from RecipeStart -> RecipeDetail: When a RecipeItem is clicked, the route /meal-planner/recipes/recipeID is loaded.
 * RecipeStart is replaced with RecipeDetail for recipeID.
 */
export class RecipesComponent implements OnInit {

  defaultText : String = DefaultMessages.recipe.get(HttpRequestStatus.NO_ACTION);
  
  recipes: Recipe[];

  recipeSelected : boolean = false;

  constructor(private store : Store<AppState>) {}

  ngOnInit(): void {
    
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      
      switch(recipes.requestStatus) {

        case HttpRequestStatus.NO_ACTION : this.defaultText = DefaultMessages.recipe.get(HttpRequestStatus.NO_ACTION);
                                           break;
  
        case HttpRequestStatus.REQUEST_SENT : this.defaultText = DefaultMessages.recipe.get(HttpRequestStatus.REQUEST_SENT);
                                              break;
                                           
        case HttpRequestStatus.RESPONSE_RECEIVED : this.defaultText = DefaultMessages.recipe.get(HttpRequestStatus.RESPONSE_RECEIVED);
                                                   if(!recipes.error) this.recipes = recipes.recipes; 
                                                   break;
      }
    });
    
    this.store.select('userDisplayPreferences').subscribe((userDisplayPreferences : UserDisplayPreferences) => {
      this.recipeSelected = (userDisplayPreferences.recipeSelected !== null)?true:false;
    });
  }
}