import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DisplayService } from 'src/app/shared/services/display.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { UserInputService } from 'src/app/shared/services/user-input.service';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit, OnDestroy {

  allowUserToPlaceOrderOrGetRecipe : boolean = false;

  onOptimizationTypeSelectedSubscription : Subscription;

  constructor(private router : Router, private userInputService : UserInputService, private displayService : DisplayService, private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.onOptimizationTypeSelectedSubscription = this.userInputService.onOptimizationTypeSelected.subscribe(
      (optimizationType: String) => {
        this.allowUserToPlaceOrderOrGetRecipe = this.displayService.allowUserToPlaceOrderOrGetRecipe();
      }
    );
  }

  placeOrderSelected() {
    this.router.navigate(['meal-optimizer','online-order']);
  }

  getRecipeSelected() {
    this.router.navigate(['meal-optimizer','recipes']);
  }

  ngOnDestroy() {
    this.onOptimizationTypeSelectedSubscription.unsubscribe();
  }
}