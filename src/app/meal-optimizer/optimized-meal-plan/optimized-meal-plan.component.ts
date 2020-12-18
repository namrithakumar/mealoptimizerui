import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';
import * as RecipesActions from '../recipes/store/actions/recipes.actions';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit, OnDestroy {

  allowUserToPlaceOrderOrGetRecipe : boolean = true;

  userPreferences : UserPreferences;

  constructor(private router : Router, private store : Store<AppState>, private recipeService : RecipeService) { }

  ngOnInit(): void {

    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
      this.userPreferences = userPrefs;
      this.allowUserToPlaceOrderOrGetRecipe = (this.userPreferences.optimizationTypeSelected && this.userPreferences.optimizationTypeSelected !== 'orderInfo')?true:false;
    });
  }

  placeOrderSelected() {
    this.router.navigate(['meal-optimizer','online-order']);
  }

  getRecipeSelected() {
    this.store.dispatch(new RecipesActions.FetchRecipesStart(this.userPreferences.mealSelected));
    this.router.navigate(['meal-optimizer','recipes']);
  }

  ngOnDestroy() {
  }
}