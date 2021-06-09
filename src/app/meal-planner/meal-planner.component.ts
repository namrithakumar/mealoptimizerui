import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../shared/services/can-exit-page.service';
import { IUserDietType } from '../shared/services/user-diet-type-resolver.service';
import { AppState } from '../store/reducers/app.reducer';
import { UserDisplayPreferences } from '../user-mgmt/store/reducers/user-display-preferences.reducer';

import * as UserPreferencesActions from './meal-optimizer/store/actions/user-preferences.actions';
import * as MenuActions from './meal-optimizer/store/actions/menu.actions'
import * as OrderActions from './meal-optimizer/store/actions/order.actions';
import * as RecipeActions from './recipes/store/actions/recipes.actions';
import * as ShoppingListActions from './shopping-list/store/shopping-list.actions';
import * as UserDisplayPreferencesActions from '../user-mgmt/store/actions/user-display-preferences.actions';

@Component({
  selector: 'app-meal-planner',
  templateUrl: './meal-planner.component.html',
  styleUrls: ['./meal-planner.component.css']
})
export class MealPlannerComponent implements OnInit, CanComponentDeactivate {

  showRecipes : boolean;
  showShoppingList : boolean;
  dietTypes : Array<IUserDietType>;

  constructor(private route: ActivatedRoute, 
              private store : Store<AppState>) { }

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.dietTypes = data['userDietTypes'];
    });

    this.store.select('userDisplayPreferences').subscribe((userDisplayPreferences : UserDisplayPreferences) => {
      
      this.showRecipes = userDisplayPreferences.showRecipes;
      this.showShoppingList = userDisplayPreferences.showShoppingList;
    });
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if(confirm('You are navigating away from the page. Your inputs will be reset.')) {
      [new UserPreferencesActions.ClearUserPreferences(), 
        new MenuActions.ClearMenu(),
        new OrderActions.ClearOrder(),
        new RecipeActions.ClearRecipes(),
        new ShoppingListActions.ClearShoppingList(),
        new UserDisplayPreferencesActions.ResetUserDisplayPreferences()
      ].forEach((action : Action) => {
          this.store.dispatch(action);
        });
        return true;
    }
    else return false;
  }
}