import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';
import * as RecipesActions from '../recipes/store/actions/recipes.actions';
import { OptimizedMealPlans } from '../store/reducers/order.reducer';
import { OptimizationStatus } from 'src/app/shared/services/optimization-status.enum';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit, OnDestroy {

  userPreferences : UserPreferences;

  optimizationState : String;
  
  isValidOptimizationState : boolean;

  constructor(private router : Router, private store : Store<AppState>, private recipeService : RecipeService) { }

  ngOnInit(): void {

    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
      this.userPreferences = userPrefs;
    });

    this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {
      if(optimizedMealPlans.optimizedMealPlans)
      this.optimizationState = optimizedMealPlans.optimizedMealPlans.optimizationState;

      if(optimizedMealPlans.status !== OptimizationStatus.RESPONSE_RECEIVED) {
      this.isValidOptimizationState = true;
      } else {
          if(this.optimizationState === 'DISTINCT' || this.optimizationState === 'OPTIMAL' || this.optimizationState === 'FEASIBLE') this.isValidOptimizationState = true;
          else this.isValidOptimizationState = false;
      }
    });
  }

  get allowUserToPlaceOrderOrGetRecipe() : boolean {
    if(this.userPreferences.optimizationTypeSelected && this.userPreferences.optimizationTypeSelected !== 'orderInfo' && this.isValidOptimizationState) return true;
    else return false;
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