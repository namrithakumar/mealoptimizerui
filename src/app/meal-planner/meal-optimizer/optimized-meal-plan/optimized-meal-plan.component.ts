import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';
import * as RecipesActions from '../../../meal-planner/recipes/store/actions/recipes.actions';
import { OptimizedMealPlans } from '../store/reducers/order.reducer';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { Meal } from 'src/app/shared/model/order-response.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { DefaultMessages } from 'src/app/shared/default-messages';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
/*
 * This component has 2 sections:
 * Sec. 1: Display optimization results
 * Sec. 2: Handle optimization results (Get Recipe / Place Order)
 * 
 * It handles 3 tasks:
 * (1) Allows the user to place online order/get recipe only if the below conditions are met:
 *     -> The optimized meal plans have state DISTINCT/OPTIMAL/FEASIBLE. All other states are negative i.e. a meal plan that satisfies all nutitional requirements could not be created for the selected meals.
 *     -> Either Optimized by Cost or Optimized by Quality was selected
 * (2) Reroute the user to either recipes section or online order section based on option selected. The correct secion is loaded based on the route.
 * (3) Display help text 'Select a different meal plan' if meal plan cannot be created from meals selected (optimization state !== DISTINCT | OPTIMAL | FEASIBLE)
 */
export class OptimizedMealPlanComponent implements OnInit, OnDestroy {

  // Allow user to place online order / get recipe based on 
  // value in userPreferences.optimizationTypeSelected (optimize by cost | optimize by quality)
  userPreferences : UserPreferences;

  optimizationError : String;

  //We do not know if optimization is possible, set to true preemptively
  isOptimizationFeasible : boolean = true;

  costOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String };
  
  qualityOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String };
  
  defaultText : String = DefaultMessages.mealPlan.get(HttpRequestStatus.NO_ACTION);

  constructor(private router : Router, 
              private store : Store<AppState>, 
              private route : ActivatedRoute,
              private optimizationService : OptimizationService) { }

  ngOnInit(): void {

    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
      this.userPreferences = userPrefs;
    });

    // Display optimized meal plan received from the backend.
    this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {
      switch(optimizedMealPlans.requestStatus) {
        
        case HttpRequestStatus.NO_ACTION : this.isOptimizationFeasible = true;
                                           this.defaultText = DefaultMessages.mealPlan.get(HttpRequestStatus.NO_ACTION); 
                                           break;
        
        case HttpRequestStatus.REQUEST_SENT : this.isOptimizationFeasible = true;
                                              this.defaultText = DefaultMessages.mealPlan.get(HttpRequestStatus.REQUEST_SENT);
                                              break;
                                              
        case HttpRequestStatus.RESPONSE_RECEIVED : {
                                        this.defaultText = DefaultMessages.mealPlan.get(HttpRequestStatus.RESPONSE_RECEIVED);
                                        //If there is an error, display error message.
                                        if(optimizedMealPlans.error) {
                                          this.optimizationError = optimizedMealPlans.error;
                                        }
                                        else {
                                          //If there is no error
                                          if(optimizedMealPlans.mealPlans) {  
                                            let optimizationState = optimizedMealPlans.mealPlans.optimizationState;
                                            //Check if optimization was successful - one of the below 3 states
                                            if(optimizationState === 'DISTINCT' || 
                                               optimizationState === 'OPTIMAL' || 
                                               optimizationState === 'FEASIBLE') {
                                              this.isOptimizationFeasible = true;
                                              this.costOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('COST', optimizedMealPlans.mealPlans);
                                              this.qualityOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('QUALITY', optimizedMealPlans.mealPlans);  
                                            }
                                            //If optimization was not successful. OptimizationState is not DISTINCT | OPTIMAL | FEASIBLE
                                            else {
                                              this.isOptimizationFeasible = false;
                                            }
                                        }
        }                                      
      }
    }});
  }

  /*
   * The user can perform one of the below actions - place online order / get recipe.
   */
  placeOrderSelected() {
    this.router.navigate([ 'meal-planner' , 
                         { outlets : { mealoptimizer : 'meal-optimizer', onlineorder : ['online-order'] } }] ,  
                         { queryParams : this.route.snapshot.queryParams });
  }

  getRecipeSelected() {
    this.store.dispatch(new RecipesActions.UpdateRequestStatus(HttpRequestStatus.REQUEST_SENT));
    this.store.dispatch(new RecipesActions.FetchRecipesStart(this.userPreferences.mealSelected));
    this.router.navigate([ 'meal-planner' , 
                         { outlets : { mealoptimizer : 'meal-optimizer', recipes : ['recipes'] } }] , 
                         { queryParams : this.route.snapshot.queryParams });
  }

  get allowUserToPlaceOrderOrGetRecipe() : boolean {
    if(this.userPreferences.optimizationTypeSelected && 
       this.userPreferences.optimizationTypeSelected !== 'orderInfo' && 
       this.isOptimizationFeasible) return true;
    else return false;
  }

  ngOnDestroy() { }
}