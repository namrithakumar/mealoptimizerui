import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { Recipes } from '../../recipes/store/reducers/recipes.reducer';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { defaultMessages } from '../../../shared/default-messages';

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

  defaultText : String = defaultMessages.recipe.get(HttpRequestStatus.NO_ACTION);

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes').subscribe((recipes : Recipes) => {
      switch(recipes.requestStatus) {

        case HttpRequestStatus.NO_ACTION : this.defaultText = defaultMessages.recipe.get(HttpRequestStatus.NO_ACTION);
                                           break;

        case HttpRequestStatus.REQUEST_SENT : this.defaultText = defaultMessages.recipe.get(HttpRequestStatus.REQUEST_SENT);
                                              break;
                                           
        case HttpRequestStatus.RESPONSE_RECEIVED : this.defaultText = defaultMessages.recipe.get(HttpRequestStatus.RESPONSE_RECEIVED);
                                                   if(!recipes.error) this.recipes = recipes.recipes;                                            
                                                   break;
      }
    });
  }
}