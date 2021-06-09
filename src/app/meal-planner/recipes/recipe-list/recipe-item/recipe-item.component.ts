import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from 'src/app/shared/model/recipe.model';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserDisplayPreferencesActions from '../../../../user-mgmt/store/actions/user-display-preferences.actions';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  //Recipe and index are set from RecipeList.
  @Input() recipe : Recipe;

  @Input() indexOfRecipe: number;

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.store.dispatch(new UserDisplayPreferencesActions.ShowRecipeDetail({ id: this.indexOfRecipe, name : this.recipe.name}));
  }

  ngOnDestroy() : void { }
}