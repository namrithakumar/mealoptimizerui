import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit, OnDestroy {

  allowUserToPlaceOrderOrGetRecipe : boolean = true;

  constructor(private router : Router, private store : Store<AppState>, private recipeService : RecipeService) { }

  ngOnInit(): void {

    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
      this.allowUserToPlaceOrderOrGetRecipe = (userPrefs.optimizationTypeSelected && userPrefs.optimizationTypeSelected !== 'orderInfo')?true:false;
    });
  }

  placeOrderSelected() {
    this.router.navigate(['online-order']);
  }

  getRecipeSelected() {
    this.router.navigate(['recipes']);
  }

  ngOnDestroy() {
  }
}